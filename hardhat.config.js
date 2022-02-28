require("dotenv").config();

// require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
// require("solidity-coverage");


module.exports = {
  solidity: "0.8.8",
  networks: {
    hardhat: {
      chainId: 80001
    },
    mumbai: {
      chainId: 80001,
      url: process.env.MUMBAI_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    // mainnet: {
    //   url: process.env.MAINNET_URL || "",
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
  },

  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },
};
