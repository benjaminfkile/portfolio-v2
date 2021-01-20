import React, { Component } from 'react'
import DataStore from '../DataStore'
import './Skills.css'

class Skills extends Component {

    dbInterval
    changeInerval
    mounted = false

    constructor(props) {
        super(props)
        this.state = {
            db: false,
            p1: null,
            p1Id: null,
            leftSkills: null,
            rightSkills: null,
            devicons: null
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
        let leftTemp = []
        let rightTemp = []
        if (this.mounted && DataStore[0] && DataStore[0].skillsP1.length > 0) {
            clearInterval(this.dbInterval)
            for (let i = 0; i < DataStore[0].devicons.length; i++) {
                if (DataStore[0].devicons[i].side === 'l') {
                    leftTemp.push(DataStore[0].devicons[i])
                }
                if (DataStore[0].devicons[i].side === 'r') {
                    rightTemp.push(DataStore[0].devicons[i])
                }
            }
            this.setState({ db: true, p1: DataStore[0].skillsP1[0].p1, p1Id: DataStore[0].skillsP1[0].id, leftSkills: leftTemp, rightSkills: rightTemp, devicons: DataStore[0].devicons })
        }
    }

    listen4Update = () => {
        let leftTemp = []
        let rightTemp = []
        if (this.mounted && (DataStore[0].skillsP1[0].id !== this.state.p1Id)) {
            this.setState({ db: true, p1: DataStore[0].skillsP1[0].p1, p1Id: DataStore[0].skillsP1[0].id })
        }
        if (this.state.devicons.length !== DataStore[0].devicons.length) {
            for (let i = 0; i < DataStore[0].devicons.length; i++) {
                if (DataStore[0].devicons[i].side === 'l') {
                    leftTemp.push(DataStore[0].devicons[i])
                }
                if (DataStore[0].devicons[i].side === 'r') {
                    rightTemp.push(DataStore[0].devicons[i])
                }
            }
            this.setState({ devicons: DataStore[0].devicons, leftSkills: leftTemp, rightSkills: rightTemp })
        }
        if (this.state.devicons && this.state.devicons.length === DataStore[0].devicons.length) {
            for (let i = 0; i < this.state.devicons.length; ++i) {
                if (this.state.devicons[i].id !== DataStore[0].devicons[i].id) {
                    for (let i = 0; i < DataStore[0].devicons.length; i++) {
                        if (DataStore[0].devicons[i].side === 'l') {
                            leftTemp.push(DataStore[0].devicons[i])
                        }
                        if (DataStore[0].devicons[i].side === 'r') {
                            rightTemp.push(DataStore[0].devicons[i])
                        }
                    }
                    this.setState({ devicons: DataStore[0].devicons, leftSkills: leftTemp, rightSkills: rightTemp })

                }
            }
        }
    }

    render() {
        return (
            <div className="Skills">
                <div className="Skills_Panel_One">
                    <p id="sp1p1">Skills</p>
                    <p id="sp1p2">{this.state.p1}</p>
                </div>
                <div className="Skills_Panel_Two">
                    <div className="Front_Skills">
                        <p>
                            Frontend
                        </p>
                        <ul>
                            {this.state.leftSkills && this.state.leftSkills.map((devicon, index) => (
                                <li key={devicon.id}>
                                    <i className={devicon.link}></i>
                                    {" " + devicon.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="Back_Skills">
                        <p>
                            Backend
                        </p>
                        <ul>
                            {this.state.rightSkills && this.state.rightSkills.map((devicon, index) => (
                                <li key={devicon.id}>
                                <i className={devicon.link}></i>
                                {" " + devicon.title}
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Skills