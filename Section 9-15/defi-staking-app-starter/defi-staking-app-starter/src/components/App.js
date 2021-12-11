import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";

import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: "0",
      rwdBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected! You can check out MetaMask!");
    }
  }

  async loadBlockchainData() {
    let { account, tether, tetherBalance, rwd, rwdBalance, decentralBank, stakingBalance } = this.state
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    account = accounts[0]
    const networkId = await web3.eth.net.getId();

    // Load Tether contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      tetherBalance = await tether.methods.balanceOf(account).call();
    } else {
      window.alert("Error! Tether contract not deployed - no network detected");
    }

    // Load RWD contract
    const rwdData = RWD.networks[networkId];
    if (rwdData) {
      rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
      rwdBalance = await rwd.methods.balanceOf(account).call();
    } else {
      window.alert("Error! RWD contract not deployed - no network detected");
    }

    // Load DecentralBank contract
    const decentralBankData = DecentralBank.networks[networkId];
    if (decentralBankData) {
      decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
      stakingBalance = await decentralBank.methods.stakingBalance(account).call();
    } else {
      window.alert("Error! DecentralBank contract not deployed - no network detected");
    }
    this.setState({
        loading: false,
        account,
        tether,
        rwd,
        decentralBank,
        tetherBalance: tetherBalance.toString(),
        rwdBalance: rwdBalance.toString(),
        stakingBalance: stakingBalance.toString(),
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="text-center"></div>

      </div>
    );
  }
}

export default App;