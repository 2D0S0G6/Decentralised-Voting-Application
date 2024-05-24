

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const API_URL=process.env.API_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;

  module.exports = {
    solidity: "0.8.24",
    defaultNetwork:"volta",
    networks: {
      hardhat: {},
      volta: {
        url:"https://volta-rpc.energyweb.org",
        accounts:["0x1e903ae5652e31d09fcefd566706243d8afde83eddaaca7cfda8bdb2e4c0785b"],//[`0x${PRIVATE_KEY}`],
        gas: 210000000,
        gasPrice: 800000000000,
      },
    }
  }