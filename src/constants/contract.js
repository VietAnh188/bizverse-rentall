const { NFT_CONTRACT_ADDRESS, CHAIN_ID } = require("./nft");

export const USDT_DECIMAL = 18;

export const contract = {
  msg: {
    INVALID_INPUT: "INVALID_INPUT",
  },
  ABI: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_contractOwner",
          type: "address"
        },
        {
          components: [
            {
              internalType: "address",
              name: "facetAddress",
              type: "address"
            },
            {
              internalType: "enum IDiamondCut.FacetCutAction",
              name: "action",
              type: "uint8"
            },
            {
              internalType: "bytes4[]",
              name: "functionSelectors",
              type: "bytes4[]"
            }
          ],
          internalType: "struct IDiamondCut.FacetCut[]",
          name: "_diamondCut",
          type: "tuple[]"
        },
        {
          components: [
            {
              internalType: "address",
              name: "initContract",
              type: "address"
            },
            {
              internalType: "bytes",
              name: "initData",
              type: "bytes"
            }
          ],
          internalType: "struct Diamond.Initialization[]",
          name: "_initializations",
          type: "tuple[]"
        }
      ],
      stateMutability: "payable",
      type: "constructor"
    },
    {
      stateMutability: "payable",
      type: "fallback"
    },
    {
      stateMutability: "payable",
      type: "receive"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "Approval",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool"
        }
      ],
      name: "ApprovalForAll",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "offerId",
          type: "uint256"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          indexed: true,
          internalType: "address",
          name: "actioner",
          type: "address"
        }
      ],
      name: "LogOfferCancelled",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "offerId",
          type: "uint256"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          indexed: true,
          internalType: "address",
          name: "seller",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "currency",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256"
        }
      ],
      name: "LogOfferCreated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "offerId",
          type: "uint256"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          indexed: true,
          internalType: "address",
          name: "seller",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address"
        }
      ],
      name: "LogOfferMatched",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "offerId",
          type: "uint256"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "newId",
          type: "uint256"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256"
        }
      ],
      name: "LogOfferPriceChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "burnFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_offerId",
          type: "uint256"
        }
      ],
      name: "cancelOffer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_offerId",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256"
        }
      ],
      name: "changeOfferPrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "currency",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256"
        }
      ],
      name: "createOffer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_offerId",
          type: "uint256"
        }
      ],
      name: "forceCancel",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "address",
          name: "operator",
          type: "address"
        }
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_offerId",
          type: "uint256"
        }
      ],
      name: "matchOffer",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256"
        },
        {
          internalType: "string",
          name: "_uri",
          type: "string"
        },
        {
          internalType: "bool",
          name: "_mutable",
          type: "bool"
        }
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "mintingNonce",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "delegatee",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "bool",
              name: "mut",
              type: "bool"
            },
            {
              internalType: "string",
              name: "uri",
              type: "string"
            }
          ],
          internalType: "struct MintingPermission",
          name: "_permission",
          type: "tuple"
        },
        {
          internalType: "bytes",
          name: "_signature",
          type: "bytes"
        }
      ],
      name: "mintWithPermit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "mintingNonce",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes"
        }
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address"
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool"
        }
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32"
        }
      ],
      name: "RoleAdminChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "RoleGranted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "RoleRevoked",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        }
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "tokenAddress",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "flag",
          type: "bool"
        }
      ],
      name: "LogCurrencySet",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenAddress",
          type: "address"
        },
        {
          internalType: "bool",
          name: "flag",
          type: "bool"
        }
      ],
      name: "setCurrency",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenAddress",
          type: "address"
        }
      ],
      name: "supportsCurrency",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "LogWithdraw",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          internalType: "address",
          name: "token",
          type: "address"
        }
      ],
      name: "pendingFund",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address"
        }
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "domainAndVersion",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        },
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "mintingNonce",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "delegatee",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "bool",
              name: "mut",
              type: "bool"
            },
            {
              internalType: "string",
              name: "uri",
              type: "string"
            }
          ],
          internalType: "struct MintingPermission",
          name: "_permission",
          type: "tuple"
        }
      ],
      name: "hashMintingPermission",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "mintingNonce",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "delegatee",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "bool",
              name: "mut",
              type: "bool"
            },
            {
              internalType: "string",
              name: "uri",
              type: "string"
            }
          ],
          internalType: "struct MintingPermission",
          name: "_permission",
          type: "tuple"
        },
        {
          internalType: "bytes",
          name: "_signature",
          type: "bytes"
        }
      ],
      name: "verifyMintingPermission",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes[]",
          name: "calls",
          type: "bytes[]"
        },
        {
          internalType: "bool",
          name: "revertOnFail",
          type: "bool"
        }
      ],
      name: "multicall",
      outputs: [
        {
          internalType: "bool[]",
          name: "successes",
          type: "bool[]"
        },
        {
          internalType: "bytes[]",
          name: "results",
          type: "bytes[]"
        }
      ],
      stateMutability: "payable",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "newFee",
          type: "uint16"
        }
      ],
      name: "ChangeListingFee",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newFeeCollector",
          type: "address"
        }
      ],
      name: "changeFeeCollector",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "fee",
          type: "uint16"
        }
      ],
      name: "changeListingFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "feeCollector",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "listingFee",
      outputs: [
        {
          internalType: "uint16",
          name: "",
          type: "uint16"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "facetAddress",
              type: "address"
            },
            {
              internalType: "enum IDiamondCut.FacetCutAction",
              name: "action",
              type: "uint8"
            },
            {
              internalType: "bytes4[]",
              name: "functionSelectors",
              type: "bytes4[]"
            }
          ],
          indexed: false,
          internalType: "struct IDiamondCut.FacetCut[]",
          name: "_diamondCut",
          type: "tuple[]"
        },
        {
          indexed: false,
          internalType: "address",
          name: "_init",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "_calldata",
          type: "bytes"
        }
      ],
      name: "DiamondCut",
      type: "event"
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "facetAddress",
              type: "address"
            },
            {
              internalType: "enum IDiamondCut.FacetCutAction",
              name: "action",
              type: "uint8"
            },
            {
              internalType: "bytes4[]",
              name: "functionSelectors",
              type: "bytes4[]"
            }
          ],
          internalType: "struct IDiamondCut.FacetCut[]",
          name: "_diamondCut",
          type: "tuple[]"
        },
        {
          internalType: "address",
          name: "_init",
          type: "address"
        },
        {
          internalType: "bytes",
          name: "_calldata",
          type: "bytes"
        }
      ],
      name: "diamondCut",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "owner_",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "_functionSelector",
          type: "bytes4"
        }
      ],
      name: "facetAddress",
      outputs: [
        {
          internalType: "address",
          name: "facetAddress_",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "facetAddresses",
      outputs: [
        {
          internalType: "address[]",
          name: "facetAddresses_",
          type: "address[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_facet",
          type: "address"
        }
      ],
      name: "facetFunctionSelectors",
      outputs: [
        {
          internalType: "bytes4[]",
          name: "facetFunctionSelectors_",
          type: "bytes4[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "facets",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "facetAddress",
              type: "address"
            },
            {
              internalType: "bytes4[]",
              name: "functionSelectors",
              type: "bytes4[]"
            }
          ],
          internalType: "struct IDiamondLoupe.Facet[]",
          name: "facets_",
          type: "tuple[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
  ],
  DOMAIN: {
    name: "bizverse-vrStay",
    version: "1",
    verifyingContract: NFT_CONTRACT_ADDRESS, //0x23a104DF9E158c88B5f70Ac03FC0ceB2b9E88BC0
    chainId: CHAIN_ID, //1313161554
  },
  TYPES: {
    MintingPermission: [
      { name: "mintingNonce", type: "uint256" },
      { name: "delegatee", type: "address" }, //submiter
      { name: "recipient", type: "address" },
      { name: "mut", type: "bool" },
      { name: "uri", type: "string" },
    ],
  },
};
