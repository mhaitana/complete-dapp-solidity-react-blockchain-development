import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";

import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import Main from "./Main";
import ParticleSettings from "./ParticleSettings";

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

  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      console.log('approve hash', hash)
      this.state.decentralBank.methods.depositTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        console.log('depositTokens hash', hash)
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = () => {
    this.setState({ loading: true })
    this.state.decentralBank.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      console.log('unstakeTokens hash', hash)
      this.setState({ loading: false })
    })
  }

  airdropTokens = () => {
    
  }

  render() {
    let content = this.state.loading
      ? <p id='loader' className="text-center" style={{ margin: '30px', color: 'white' }}>Loading...</p>
      : <Main tetherBalance={this.state.tetherBalance} rwdBalance={this.state.rwdBalance}
        stakingBalance={this.state.stakingBalance} stakeTokens={this.stakeTokens} unstakeTokens={this.unstakeTokens} />
    return (
      <div className="App" style={{ position: 'relative'}}>
        <div style={{ position: 'absolute' }}>
          <ParticleSettings />
        </div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px', minHeight: '100vm'}}>
              <div>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
