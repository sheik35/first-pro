require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths:{
    artifacts: './src/artifacts',
  },
  networks:{
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [`ff9fc8c36ca5d7f0381500549d67b6c96bd9fa721a99e99ec029aa6172ca3e71`]
    }
  }
};
