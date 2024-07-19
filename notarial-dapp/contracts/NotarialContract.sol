// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract NotarialContract is AccessControl {
    bytes32 public constant NOTARY_ROLE = keccak256("NOTARY_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct ContractDetail {
        string ipfsHash;
        uint256 timestamp;
        bool isModified;
        bool isActive; 
        address owner;
    }

    mapping(uint256 => ContractDetail) public contracts;
    mapping(address => uint256[]) public ownerToContracts;
    uint256 public contractCount;

    event ContractStored(uint256 indexed id, string ipfsHash, uint256 timestamp, address owner);
    event ContractModified(uint256 indexed id, string newIpfsHash, uint256 timestamp);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // Assign the deployer as the default admin
        _setRoleAdmin(NOTARY_ROLE, ADMIN_ROLE);    // Assign ADMIN_ROLE as the admin of NOTARY_ROLE
        _grantRole(ADMIN_ROLE, msg.sender);        // Optionally make the deployer an admin too
    }

    function storeContract(string memory _ipfsHash, address _owner) public onlyRole(NOTARY_ROLE) {
        contractCount++;
        contracts[contractCount] = ContractDetail(_ipfsHash, block.timestamp, false, _owner);
        ownerToContracts[_owner].push(contractCount);
        emit ContractStored(contractCount, _ipfsHash, block.timestamp, _owner);
    }

    function modifyContract(uint256 _id, string memory _newIpfsHash) public onlyRole(NOTARY_ROLE) {
        require(_id <= contractCount && _id > 0, "Invalid contract ID.");
        ContractDetail storage contractToModify = contracts[_id];
        contractToModify.ipfsHash = _newIpfsHash;
        contractToModify.timestamp = block.timestamp;
        contractToModify.isModified = true;
        emit ContractModified(_id, _newIpfsHash, block.timestamp);
    }

    function getContractsByOwner(address _owner) public view returns (uint256[] memory) {
        return ownerToContracts[_owner];
    }

    function addNotary(address notary) public onlyRole(ADMIN_ROLE) {
        grantRole(NOTARY_ROLE, notary);
    }

    function removeNotary(address notary) public onlyRole(ADMIN_ROLE) {
        revokeRole(NOTARY_ROLE, notary);
    }

    function modifyContract(uint256 _id, string memory _newIpfsHash) public onlyRole(NOTARY_ROLE) {
    require(_id <= contractCount && _id > 0, "Invalid contract ID.");
    require(contracts[_id].isActive, "Contract is not active.");
    ContractDetail storage contractToModify = contracts[_id];
    contractToModify.ipfsHash = _newIpfsHash;
    contractToModify.timestamp = block.timestamp;
    contractToModify.isModified = true;
    emit ContractModified(_id, _newIpfsHash, block.timestamp);
}

function deactivateContract(uint256 _id) public onlyRole(NOTARY_ROLE) {
    require(_id <= contractCount && _id > 0, "Invalid contract ID.");
    ContractDetail storage contract = contracts[_id];
    contract.isActive = false;  // Set the contract to inactive
    emit ContractDeactivated(_id, block.timestamp);  // Consider adding an event for this
}


}
