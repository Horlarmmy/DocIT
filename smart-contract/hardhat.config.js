require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

const PRIVATE_KEY = '1de9671a89d1666bfed5d032696130a6bc61238385f7f698786c2f081bba96ce';

module.exports = {
    solidity: "0.8.9",
    networks: {
      goerli: {
        url: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
        accounts: [`0x${PRIVATE_KEY}`],
      },
      metis: {
        url: `https://goerli.gateway.metisdevops.link`,
        accounts: [`0x${PRIVATE_KEY}`],
      },
      polygon: {
        url: ``
      }

    }
   };