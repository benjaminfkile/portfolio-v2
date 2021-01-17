import React, { Component } from 'react'
import './Cube.css'

class Cube extends Component {
    render() {
        return (
            <div className="cube-container">
                <div id="cube">
                    <figure className="face front">
                        <i className="devicon-java-plain-wordmark"></i>
                    </figure>
                    <figure className="face back">
                        <i className="devicon-heroku-original-wordmark"></i>
                    </figure>
                    <figure className="face left">
                    <i className="devicon-webpack-plain-wordmark"></i>
                    </figure>
                    <figure className="face right">
                        <i className="devicon-react-original-wordmark"></i>
                    </figure>
                    <figure className="face top">
                    <i className="devicon-nodejs-plain-wordmark"></i>
                    </figure>
                    <figure className="face bottom">
                        <i className="devicon-postgresql-plain-wordmark"></i>
                    </figure>
                </div>
            </div>
        )
    }
}

export default Cube