export const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS // old 0xD373B2124B6e3820141042126e1D47A40E422459;

export const networks = [
  {
    chainId: "0x38",
    rpcUrls: ["https://bsc-dataseed1.binance.org/"],
    chainName: "BSC Mainnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://bscscan.com"],
  },
  {
    chainId: "0x61",
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    chainName: "BSC Testnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  }
];
  
export const metamaskErrors = {
  CONNECT_ERROR: 4001,
};