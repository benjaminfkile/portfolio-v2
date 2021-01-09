import React, { Component } from 'react'
import Cube from './Cube/Cube'
import './Home.css'

class Home extends Component {

    render() {
        return (
            <div className="Home">
                <div className="Home_Panel_One">
                    <p id="hp1p1">Hi,</p>
                    <p id="hp1p2">I'm Ben,</p>
                    <p id="hp1p3">Web Developer.</p>
                </div>
                <div className="Home_Panel_Two">
                    <Cube />
                </div>
            </div>
        )
    }
}

export default Home