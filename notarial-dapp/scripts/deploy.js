async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());
  
    const NotarialContract = await ethers.getContractFactory("NotarialContract");
    const notarialContract = await NotarialContract.deploy();
  
    console.log("Notarial Contract deployed to:", notarialContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
    //0x5FbDB2315678afecb367f032d93F642f64180aa3 -address of the deployed contract