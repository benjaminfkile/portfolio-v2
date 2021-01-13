import React, { Component } from 'react'
import aboutMe from '../AboutStore'
import url from '../urlStore'
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
        this.dbInterval = setInterval(this.listen4DB, 500)
        this.changeInerval = setInterval(this.listen4Change, 3000)
        this.mounted = true
    }

    componentWillUnmount() {
        this.mounted = false
        clearInterval(this.changeInerval)
    }

    listen4DB = () => {
        if (this.mounted && aboutMe.p1.length > 0 && aboutMe.p2.length > 0) {
            clearInterval(this.dbInterval)
            this.setState({ db: true, p1: aboutMe.p1[0].p1, p1Id: aboutMe.p1[0].id, p2: aboutMe.p2[0].p2, p2Id: aboutMe.p2[0].id })
        }
    }

    listen4Change = () => {
        this.getAboutP1()
        this.getAboutP2()
        // eslint-disable-next-line
        if (this.mounted && (aboutMe.p1[0].id !== this.state.p1Id) || (aboutMe.p2[0].id !== this.state.p2Id)) {
            this.setState({ db: true, p1: aboutMe.p1[0].p1, p1Id: aboutMe.p1[0].id, p2: aboutMe.p2[0].p2, p2Id: aboutMe.p2[0].id })
        }
        if (aboutMe.p1.length > 1) {
            aboutMe.p1.pop()
            aboutMe.p2.pop()
        }
    }

    getAboutP1 = () => {
        fetch(url + 'about-p1')
            .then(response => response.json())
            .then(data => {
                aboutMe.p1.unshift(data[0])
            }).catch(error => console.log('failed to fetch about'));
    }

    getAboutP2 = () => {
        fetch(url + 'about-p2')
            .then(response => response.json())
            .then(data => {
                aboutMe.p2.unshift(data[0])
            }).catch(error => console.log('failed to fetch about'));
    }

    render() {
        return (
            <div className="About">
                <div className="About_Panel_One">
                    <p id="ap1p1">About me</p>
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