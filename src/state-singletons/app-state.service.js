import MetaMaskSDK from '@metamask/sdk';
import { ethers } from 'ethers';

export class AppStateService {
    
  constructor() {
    if (typeof AppStateService.instance === 'object') {
      console.log("instance returned");
      return AppStateService.instance;
  }
  AppStateService.instance = this;
  // Object.freeze(StateSingleton.instance);
  console.log("instance created");
    this.MMSDK = new MetaMaskSDK();
    this.ethereum = this.MMSDK.getProvider();
    // this.ethersProvider = new ethers.provider.Web3Provider(this.ethereum);
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.contractAddress = "";
    // this.guardRiskContract = new ethers.Contract(this.contractAddress, [], provider);
    this.walletConnected = false;
    this.walletAddress = "";
    this.insuranceContract = '0x5E24aBe3706f7d988713A4568e421223f4591BBc';
    this.stakingContract = '0x2281E49eb686663b9e033670AC103289c20FA033';
    this.insuranceABI = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_testTokenAddress",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "claimant",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "claimId",
            "type": "uint256"
          }
        ],
        "name": "ClaimFiled",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "claimId",
            "type": "uint256"
          }
        ],
        "name": "ClaimProcessed",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "policyHolder",
            "type": "address"
          }
        ],
        "name": "PolicyCancelled",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "policyHolder",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "enum GuardRiskInsurance.PolicyType",
            "name": "policyType",
            "type": "uint8"
          }
        ],
        "name": "PolicySelected",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "policyHolder",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "enum GuardRiskInsurance.PolicyType",
            "name": "policyType",
            "type": "uint8"
          }
        ],
        "name": "PolicyUpgraded",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "activePoliciesCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "cancelPolicy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "claims",
        "outputs": [
          {
            "internalType": "address",
            "name": "claimant",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "processed",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "claimsCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "fileClaim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getActivePoliciesCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getClaimCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_claimId",
            "type": "uint256"
          }
        ],
        "name": "getClaimDetails",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getCurrentPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getCurrentVolatility",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_policyHolder",
            "type": "address"
          }
        ],
        "name": "getMaxLossAmount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_policyHolder",
            "type": "address"
          }
        ],
        "name": "getPolicyDetails",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getTotalPremiums",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "policies",
        "outputs": [
          {
            "internalType": "enum GuardRiskInsurance.PolicyType",
            "name": "policyType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "coveragePercentage",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "expiryTimestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxLossPercentage",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "active",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "enum GuardRiskInsurance.PolicyType",
            "name": "",
            "type": "uint8"
          }
        ],
        "name": "premiumPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_claimId",
            "type": "uint256"
          }
        ],
        "name": "processClaim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "enum GuardRiskInsurance.PolicyType",
            "name": "_policyType",
            "type": "uint8"
          }
        ],
        "name": "selectPolicy",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "testTokenPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "tokenPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalPremiums",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "enum GuardRiskInsurance.PolicyType",
            "name": "_policyType",
            "type": "uint8"
          }
        ],
        "name": "upgradePolicy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "volatility",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];
    this.stakingABI = [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "EmptyArgs",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "EmptySecrets",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "EmptySource",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "NoInlineSecrets",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "RequestIsAlreadyPending",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "RequestIsNotPending",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "SenderIsNotRegistry",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "requestId",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "bytes",
            "name": "result",
            "type": "bytes"
          },
          {
            "indexed": false,
            "internalType": "bytes",
            "name": "err",
            "type": "bytes"
          }
        ],
        "name": "OCRResponse",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferRequested",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
          }
        ],
        "name": "RequestFulfilled",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
          }
        ],
        "name": "RequestSent",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "staker",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "RewardPaid",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "staker",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "duration",
            "type": "uint256"
          }
        ],
        "name": "StakeDeposited",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "staker",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "duration",
            "type": "uint256"
          }
        ],
        "name": "StakeReleased",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "oracleAddress",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "requestId",
            "type": "bytes32"
          }
        ],
        "name": "addSimulatedRequestId",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "chainlinkFunctionsOracle",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "claimReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_duration",
            "type": "uint256"
          }
        ],
        "name": "depositStake",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "enum Functions.Location",
                "name": "codeLocation",
                "type": "uint8"
              },
              {
                "internalType": "enum Functions.Location",
                "name": "secretsLocation",
                "type": "uint8"
              },
              {
                "internalType": "enum Functions.CodeLanguage",
                "name": "language",
                "type": "uint8"
              },
              {
                "internalType": "string",
                "name": "source",
                "type": "string"
              },
              {
                "internalType": "bytes",
                "name": "secrets",
                "type": "bytes"
              },
              {
                "internalType": "string[]",
                "name": "args",
                "type": "string[]"
              }
            ],
            "internalType": "struct Functions.Request",
            "name": "req",
            "type": "tuple"
          },
          {
            "internalType": "uint64",
            "name": "subscriptionId",
            "type": "uint64"
          },
          {
            "internalType": "uint32",
            "name": "gasLimit",
            "type": "uint32"
          },
          {
            "internalType": "uint256",
            "name": "gasPrice",
            "type": "uint256"
          }
        ],
        "name": "estimateCost",
        "outputs": [
          {
            "internalType": "uint96",
            "name": "",
            "type": "uint96"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "source",
            "type": "string"
          },
          {
            "internalType": "bytes",
            "name": "secrets",
            "type": "bytes"
          },
          {
            "internalType": "string[]",
            "name": "args",
            "type": "string[]"
          },
          {
            "internalType": "uint64",
            "name": "subscriptionId",
            "type": "uint64"
          },
          {
            "internalType": "uint32",
            "name": "gasLimit",
            "type": "uint32"
          }
        ],
        "name": "executeRequest",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getDONPublicKey",
        "outputs": [
          {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_staker",
            "type": "address"
          }
        ],
        "name": "getStakeDetails",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getTotalStakes",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "requestId",
            "type": "bytes32"
          },
          {
            "internalType": "bytes",
            "name": "response",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "err",
            "type": "bytes"
          }
        ],
        "name": "handleOracleFulfillment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "latestError",
        "outputs": [
          {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "latestRequestId",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "latestResponse",
        "outputs": [
          {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "releaseStake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "stakedAmount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "stakes",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "duration",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endTime",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalStakes",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "oracle",
            "type": "address"
          }
        ],
        "name": "updateOracleAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    // this.insurance = new ethers.Contract(this.insuranceContract, this.insuranceABI, provider);
    // this.staking = new ethers.Contract(this.stakingContract, this.stakingABI, provider);
  }
  
  async connectToMetaMask() {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log(chainId);
    if(parseInt(chainId) !== 80001 || chainId !== '0x13881'){
      alert("Please change your chain to Mumbai in Metamask");
      return false
    }
    try {
      const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
      alert(`Connected to: ${accounts[0]}`);
      this.walletAddress = accounts[0];
      this.walletConnected = true;
      return true;
    } catch (error) {
      alert("Could not connect to wallet.");
      console.log(error);
      return false;
    }
  }

  isWalletConnected() {
    return this.walletConnected;
  }

  async stakeAmount() {
    let signer = this.provider.getSigner();
    let staking = new ethers.Contract(this.stakingContract, this.stakingABI, signer);
    try {
      const amount = ethers.utils.parseEther('0.001')
      const result = await staking.depositStake(6, {value: amount});
      console.log('Function result:', result);
    } catch (error) {
      console.error('Error calling contract function:', error);
    }
  }

  async getPolicy() {
    let signer = this.provider.getSigner();
    let staking = new ethers.Contract(this.insuranceContract, this.insuranceABI, signer);
    try {
      const result = await staking.getPolicyDetails(this.walletAddress);
      console.log('Function result:', result);
    } catch (error) {
      console.error('Error calling contract function:', error);
    }
  }

  async policySelect() {
    let signer = this.provider.getSigner();
    let staking = new ethers.Contract(this.insuranceContract, this.insuranceABI, signer);
    try {
      const amount = ethers.utils.parseEther('0.001');
      const result = await staking.selectPolicy(6, {value:amount});
      console.log('Function result:', result);
    } catch (error) {
      console.error('Error calling contract function:', error);
    }
  }
}
