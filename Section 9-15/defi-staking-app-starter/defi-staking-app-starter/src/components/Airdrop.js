import React, { Component } from 'react'

import PropTypes from 'prop-types'

class Airdrop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: {},
            seconds: 20
        }
        this.timer = 0
        this.startTimer = this.startTimer.bind(this)
        this.countDown = this.countDown.bind(this)
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            setInterval(this.countDown, 1000)
        }
    }

    airdropReleaseTokens() {
        const { stakingBalance } = this.props
        if (stakingBalance >= '50000000000000000000') {
            this.startTimer()
        }
    }

    countDown() {
        let { seconds } = this.state
        seconds -= 1
        if (seconds === 0) {
            clearInterval(this.timer)
        }
        this.setState({
            seconds,
            time: this.secondsToTime(seconds)
        })
    }

    secondsToTime = (secs) => {
        let hours, minutes, seconds

        hours = Math.floor(secs / (60 * 60))

        const devisorForMinutes = secs % (60 * 60)
        minutes = Math.floor(devisorForMinutes / 60)

        const devisorForSeconds = secs % 60
        seconds = Math.floor(devisorForSeconds)

        const time = {
            h: hours,
            m: minutes,
            s: seconds
        }
        return time
    }

    componentDidMount() {
        const timeLeft = this.secondsToTime(this.state.seconds)
        this.setState({ time: timeLeft })
    }

    render() {
        this.airdropReleaseTokens()
        const { time } = this.state
        return(
            <div>{time.h} hour{time.h !== 1 ? 's' : null} {time.m} minute{time.m !== 1 ? 's' : null} {time.s} second{time.s !== 1 ? 's' : null}</div>
        )
    }

}

Airdrop.propTypes = {
    stakingBalance: PropTypes.string.isRequired
}

export default Airdrop