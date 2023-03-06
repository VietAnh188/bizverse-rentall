import crypto from 'crypto-js';
import { ethers } from "ethers";
import { HMAC_KEY } from '../config'

import { contract } from '../constants/contract';
import { NFT_CONTRACT_ADDRESS } from '../constants/nft';

export const hashParams = (obj) => {
  // Sort keys
  let sortObj = {};
  Object.keys(obj)
    .sort()
    .forEach((value) => {
      sortObj[value] = obj[value];
    });
  const digest = crypto
    .HmacSHA512(JSON.stringify(sortObj), HMAC_KEY)
    .toString();
    
  return digest
}

export const checkMetamaskConnection = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

export const createContract = async () => {
  await checkMetamaskConnection();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const executeContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, contract.ABI, signer);
  const callContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, contract.ABI, provider);

  return {
    executeContract,
    callContract,
  };
};