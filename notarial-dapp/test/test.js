const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NotarialContract", function () {
    let notarialContract;
    let admin, notary, other;

    beforeEach(async function () {
        const NotarialContract = await ethers.getContractFactory("NotarialContract");
        [admin, notary, other] = await ethers.getSigners();
        notarialContract = await NotarialContract.deploy();
        await notarialContract.deployed();

        // Set up roles
        await notarialContract.grantRole(ethers.utils.id("NOTARY_ROLE"), notary.address);
    });

    describe("Role Management", function () {
        it("Should allow admin to add a notary", async function () {
            await expect(notarialContract.addNotary(other.address))
                .to.emit(notarialContract, 'RoleGranted')
                .withArgs(ethers.utils.id("NOTARY_ROLE"), other.address, admin.address);
        });

        it("Should prevent non-admins from adding a notary", async function () {
            await expect(notarialContract.connect(other).addNotary(other.address))
                .to.be.revertedWith("AccessControlUnauthorizedAccount");
        });

        it("Should allow admin to remove a notary", async function () {
            await notarialContract.addNotary(other.address);
            await expect(notarialContract.removeNotary(other.address))
                .to.emit(notarialContract, 'RoleRevoked')
                .withArgs(ethers.utils.id("NOTARY_ROLE"), other.address, admin.address);
        });

        it("Should prevent non-admins from removing a notary", async function () {
            await expect(notarialContract.connect(other).removeNotary(notary.address))
                .to.be.revertedWith("AccessControlUnauthorizedAccount");
        });
    });

    describe("Store and Modify Contracts", function () {
        it("Should store a contract by a notary", async function () {
            const ipfsHash = "QmTestHash";
            const transaction = await notarialContract.connect(notary).storeContract(ipfsHash, notary.address);
            const receipt = await transaction.wait();  // Wait for transaction to be mined
            expect(receipt.events[0].args[0].toNumber()).to.equal(1);
            expect(receipt.events[0].args[1]).to.equal(ipfsHash);
        });

        it("Should revert if a non-notary tries to store a contract", async function () {
            const ipfsHash = "QmTestHash";
            await expect(notarialContract.connect(other).storeContract(ipfsHash, other.address))
                .to.be.revertedWith("AccessControlUnauthorizedAccount");
        });

        it("Should modify a contract by a notary", async function () {
            const ipfsHash = "QmTestHash";
            const newIpfsHash = "QmNewTestHash";
            await notarialContract.connect(notary).storeContract(ipfsHash, notary.address);
            const modifyTransaction = await notarialContract.connect(notary).modifyContract(1, newIpfsHash);
            const modifyReceipt = await modifyTransaction.wait();
            expect(modifyReceipt.events[0].args[0].toNumber()).to.equal(1);
            expect(modifyReceipt.events[0].args[1]).to.equal(newIpfsHash);
        });

        it("Should revert if a non-notary tries to modify a contract", async function () {
            const ipfsHash = "QmTestHash";
            await notarialContract.connect(notary).storeContract(ipfsHash, notary.address);
            await expect(notarialContract.connect(other).modifyContract(1, "QmNewTestHash"))
                .to.be.revertedWith("AccessControlUnauthorizedAccount");
        });
    });

    describe("Contract Retrieval", function () {
        it("Should get contracts by owner", async function () {
            const ipfsHash1 = "QmTestHash1";
            const ipfsHash2 = "QmTestHash2";
            await notarialContract.connect(notary).storeContract(ipfsHash1, notary.address);
            await notarialContract.connect(notary).storeContract(ipfsHash2, other.address);
            const contractsForNotary = await notarialContract.getContractsByOwner(notary.address);
            const contractsForOther = await notarialContract.getContractsByOwner(other.address);

            expect(contractsForNotary.length).to.equal(1);
            expect(contractsForOther.length).to.equal(1);
            expect(contractsForNotary[0].toNumber()).to.equal(1);
            expect(contractsForOther[0].toNumber()).to.equal(2);
        });
    });
});
