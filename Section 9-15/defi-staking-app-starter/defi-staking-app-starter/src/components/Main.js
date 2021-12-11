import React, { Component } from 'react'
import tether from '../tether.png'

import PropTypes from 'prop-types'

class Main extends Component {
    onFormSubmit = (e) => {
        e.preventDefault()
        let amount = this.stakeInput.value.toString()
        amount = window.web3.utils.toWei(amount, 'Ether')
        console.log('amount', amount)
        this.props.stakeTokens(amount)
    }

    render() {
        return (
            <div id='content' className='mt-3'>
                <table className='table text-muted text-center'>
                    <thead>
                        <tr style={{ color: 'black' }}>
                            <th scope='col'>Staking Balance</th>
                            <th scope='col'>Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ color: 'black' }}>
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} USDT</td>
                            <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')} RWD</td>
                        </tr>
                    </tbody>
                </table>
                <div className='card p-3' style={{ opacity: '0.9' }}>
                    <form className='mb-2' onSubmit={this.onFormSubmit}>
                        <div style={{ borderSpacing: '0 1em' }}>
                            <label className='float-left'>
                                <b>Stake Tokens</b>
                            </label>
                            <span className='float-right'>
                                Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')}
                            </span>
                            <div className='input-group mb-4'>
                                <input ref={(ref) => { this.stakeInput = ref }} type='number' placeholder='0' required />
                                <div className='input-group-open'>
                                    <div className='input-group-text'>
                                        <img alt='tether' src={tether} height='32' />
                                        &nbsp;&nbsp;&nbsp;USDT
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary btn-lg btn-block'>DEPOSIT</button>
                        </div>
                    </form>
                    <button onClick={this.props.unstakeTokens} className='btn btn-primary btn-lg btn-block'>WITHDRAWAL</button>
                    <div className='card-body text-center' style={{ color: 'blue' }}>
                        AIRDROP
                    </div>
                </div>
            </div>
        )
    }
}

Main.propTypes = {
    tetherBalance: PropTypes.string.isRequired,
    rwdBalance: PropTypes.string.isRequired,
    stakingBalance: PropTypes.string.isRequired,
    stakeTokens: PropTypes.func.isRequired,
    unstakeTokens: PropTypes.func.isRequired
}

export default Main