import MetaMaskSDK from '@metamask/sdk';
import { ethers } from 'ethers';

export class AppStateService {
    
  constructor() {
    this.MMSDK = new MetaMaskSDK();
    this.ethereum = this.MMSDK.getProvider();
    // this.ethersProvider = new ethers.provider.Web3Provider(this.ethereum);
    let provider = new ethers.BrowserProvider()
    this.contractAddress = "";
    // this.guardRiskContract = new ethers.Contract(this.contractAddress, [], provider);
    this.walletConnected = false;
    this.walletAddress = "";
  }
  
  async connectToMetaMask() {
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

  // hasValidInsurance(){
  //     ethers.
  // }
}
