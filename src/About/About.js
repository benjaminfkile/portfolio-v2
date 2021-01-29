import React, { Component } from 'react'
import DataStore from '../DataStore'
import './About.css'

class About extends Component {

    dbInterval
    changeInerval
    mounted = false

    constructor(props) {
        super(props)
        this.state = {
            db: false,
            p1: null,
            p1Id: null,
            p2: null,
            p2Id: null
        }
    }

    componentDidMount() {
        this.dbInterval = setInterval(this.listen4DB, 100)
        this.changeInerval = setInterval(this.listen4Update, 1000)
        this.mounted = true
    }

    componentWillUnmount() {
        this.mounted = false
        clearInterval(this.changeInerval)
    }

    listen4DB = () => {
        if (this.mounted && DataStore[0] && DataStore[0].aboutP1.length > 0 && DataStore[0].aboutP2.length > 0) {
            clearInterval(this.dbInterval)
            this.setState({ db: true, p1: DataStore[0].aboutP1[0].p1, p1Id: DataStore[0].aboutP1[0].id, p2: DataStore[0].aboutP2[0].p2, p2Id: DataStore[0].aboutP2[0].id })
        }
    }

    listen4Update = () => {
        // eslint-disable-next-line
        if (this.mounted && (DataStore[0].aboutP1[0].id !== this.state.p1Id) || (DataStore[0].aboutP2[0].id !== this.state.p2Id)) {
            this.setState({ db: true, p1: DataStore[0].aboutP1[0].p1, p1Id: DataStore[0].aboutP1[0].id, p2: DataStore[0].aboutP2[0].p2, p2Id: DataStore[0].aboutP2[0].id })
        }
    }

    render() {
        return (
            <div className="About">
                <div className="About_Panel_One">
                    <p id="ap1p1">About me</p>
                    <p id="ap1p2">From Columbia Falls Mt</p>
                    <p id="ap1p3">Studied at Thinkful</p>
                </div>
                <div className="About_Panel_Two">
                    <p id="ap2p1">{this.state.p1}</p>
                    <p id="ap2p2">{this.state.p2}</p>
                </div>
            </div>
        )
    }
}

export default About