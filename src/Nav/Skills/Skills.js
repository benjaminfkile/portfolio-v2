import React, { Component } from 'react'
import './Skills.css'

class Skills extends Component {

    render() {
        return (
            <div className="Skills">
                <div className="Skills_Panel_One">
                    <p id="sp1p1">Skills</p>
                    <p id="sp1p2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                </div>
                <div className="Skills_Panel_Two">
                    <div className="Front_Skills">
                        <p>
                            Frontend
                        </p>
                        <ul>
                            <li>
                                HTML
                                <i className="devicon-html5-plain-wordmark colored"></i>
                            </li>
                            <li>
                                CSS
                                <i className="devicon-css3-plain-wordmark colored"></i>
                            </li>
                            <li>
                                Javascript
                                <i className="devicon-javascript-plain"></i>
                            </li>
                            <li>
                                jQuery
                                <i className="devicon-jquery-plain-wordmark colored"></i>
                            </li>
                            <li>
                                React.js
                                 <i className="devicon-react-original-wordmark colored"></i>
                            </li>
                        </ul>
                    </div>
                    <div className="Back_Skills">
                        <p>
                            Backend
                        </p>
                        <li>
                            Java
                            <i className="devicon-java-plain-wordmark colored"></i>
                        </li>
                        <li>
                            Node.js
                            <i className="devicon-nodejs-plain colored"></i>
                        </li>
                        <li>
                            Express
                            <i className="devicon-express-original"></i>
                        </li>
                        <li>
                            PostgreSQL
                            <i className="devicon-postgresql-plain-wordmark colored"></i>
                        </li>
                        <li>
                            Heroku
                            <i className="devicon-heroku-original-wordmark colored"></i>
                        </li>
                    </div>
                </div>
            </div>
        )
    }
}

export default Skills