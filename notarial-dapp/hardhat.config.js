require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};


//Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
//Account balance: 10000000000000000000000
//Notarial Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
