import React, { Component } from 'react'
import './About.css'

class About extends Component {

    render() {
        return (
            <div className="About">
                <div className="About_Panel_One">
                    <p id="ap1p1">About me</p>
                </div>
                <div className="About_Panel_Two">
                    <p id="ap2p1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Duis aute irure dolor in reprehenderit i</p>
                    <p id="ap2p2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </p>
                </div>
            </div>
        )
    }
}

export default About