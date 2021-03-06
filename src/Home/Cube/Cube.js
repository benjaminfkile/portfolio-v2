import React, { Component } from 'react'
import './Cube.css'

class Cube extends Component {
    render() {
        return (
            <div className="cube-container">
                <div id="cube">
                    <figure className="face front">
                        <i className="devicon-java-plain-wordmark colored"></i>
                    </figure>
                    <figure className="face back">
                        <i className="devicon-heroku-original-wordmark colored"></i>
                    </figure>
                    <figure className="face left">
                    <i className="devicon-git-plain-wordmark colored"></i>
                    </figure>
                    <figure className="face right">
                        <i className="devicon-react-original-wordmark colored"></i>
                    </figure>
                    <figure className="face top">
                    <i className="devicon-nodejs-plain colored"></i>
                    </figure>
                    <figure className="face bottom">
                        <i className="devicon-postgresql-plain-wordmark colored"></i>
                    </figure>
                </div>
            </div>
        )
    }
}

export default Cube