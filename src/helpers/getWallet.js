import { ethers } from "ethers";
import { networks, metamaskErrors } from '../constants/nft';

export const getWallet = async () => {
  if (window.ethereum) {
    try {
      let account = "";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      let chain = process.env.NODE_ENV === 'production' ? networks[0] : networks[1]

      if (network.chainId.toString() !== chain.chainId) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            chain
          ],
        });
      }
      
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async () => {
          const signer = provider.getSigner();

          account = await signer.getAddress().then((result) => {
            return result;
          });
        });
      if (account) {
        return {
          wallet: account
        };
      } else {
        return {
          error: "Error when connect to metamask account"
        }
      }
    } catch (err) {
      if (err.code === metamaskErrors.CONNECT_ERROR) {
        return {
          error: "Please connect to MetaMask."
        }
      } else {
        return {
          error: err.message
        }
      }
    }
  } else {
    return {
      error: "Please install wallet to connect"
    }
  }
};

