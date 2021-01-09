import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            routes:
                [["/", 0], ["/about", 0], ["/skills", 0], ["/projects", 0], ["/contact", 0]]
        }
    }

    componentDidMount() {
        let path = window.location.pathname
        for (let i = 0; i < this.state.routes.length; i++) {
            if (path === this.state.routes[i][0]) {
                this.toggle(i)
            }
        }
    }

    toggle = (args) => {
        let temp = []
        for (let i = 0; i < this.state.routes.length; i++) {
            temp.push([this.state.routes[i][0], 0])
        }
        temp[args] = [this.state.routes[args][0], 1]
        this.setState({ routes: temp })
    }

    render() {
        return (
            <div className="Nav">
                <div className="Route_Wrapper">
                    <div className="Home_Route" tabIndex="1" onClick={() => this.toggle(0)}>
                        <Link to='/'>
                            {this.state.routes[0][1] === 1 && <img src='./res/home_hover.png' alt=''></img>}
                            {this.state.routes[0][1] === 0 && <img src='./res/home.png' alt=''></img>}
                        </Link>
                    </div>
                    <div className="About_Route" tabIndex="2" onClick={() => this.toggle(1)}>
                        <Link to='/about'>
                            {this.state.routes[1][1] === 1 && <img src='./res/about_hover.png' alt=''></img>}
                            {this.state.routes[1][1] === 0 && <img src='./res/about.png' alt=''></img>}
                        </Link>
                    </div>
                    <div className="Skills_Route" tabIndex="3" onClick={() => this.toggle(2)}>
                        <Link to='/skills'>
                            {this.state.routes[2][1] === 1 && <img src='./res/skills_hover.png' alt=''></img>}
                            {this.state.routes[2][1] === 0 && <img src='./res/skills.png' alt=''></img>}
                        </Link>
                    </div>
                    <div className="Projects_Route" tabIndex="4" onClick={() => this.toggle(3)}>
                        <Link to='/projects'>
                            {this.state.routes[3][1] === 1 && <img src='./res/projects_hover.png' alt=''></img>}
                            {this.state.routes[3][1] === 0 && <img src='./res/projects.png' alt=''></img>}
                        </Link>
                    </div>
                    <div className="Contact_Route" tabIndex="5" onClick={() => this.toggle(4)}>
                        <Link to='/contact'>
                            {this.state.routes[4][1] === 1 && <img src='./res/contact_hover.png' alt=''></img>}
                            {this.state.routes[4][1] === 0 && <img src='./res/contact.png' alt=''></img>}
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Nav