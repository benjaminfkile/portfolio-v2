import React, { Component } from 'react'
import DataStore from '../DataStore'
import Loading from '../Loading/Loading'
import '../Projects/Projects.css'

class Projects extends Component {

    mounted = false
    panDex = 0
    constructor(props) {
        super(props)
        this.state = {
            db: false,
            title: null,
            description: null,
            tech: [],
            repoMenu: false
        }
    }

    componentDidMount() {
        this.mounted = true
        this.interval = setInterval(this.listen4DB, 500)
    }

    componentWillUnmount() {
        this.mounted = false
    }

    listen4DB = () => {
        if (DataStore[0].projects.length > 0 && this.mounted) {
            clearInterval(this.interval)
            this.setState({ db: true })
            this.pan('-')
        }
    }

    pan = (args) => {
        if (args && args === '+') {
            if (this.panDex > DataStore[0].projects.length - 2) {
                this.panDex = 0
            } else {
                this.panDex += 1
            }
        } else {
            if (this.panDex === 0) {
                this.panDex = DataStore[0].projects.length - 1
            } else {
                this.panDex -= 1
            }
        }
        let techArray = []

        for (let i = 0; i < DataStore[0].projects[this.panDex].tech.length; i++) {
            techArray.push("<i class=\"" + DataStore[0].projects[this.panDex].tech[i] + "\"></i>")
        }
        this.setState({
            title: DataStore[0].projects[this.panDex].name,
            description: DataStore[0].projects[this.panDex].description,
            tech: techArray,
        })
    }

    toggleRepo = () => {
        if (this.state.repoMenu) {
            this.setState({ repoMenu: false })
        } else {
            this.setState({ repoMenu: true })
        }
    }

    openLink = (args) => {
        window.open(args);
    }

    render() {
        return (
            <div className="Projects">
                {!this.state.preview && this.state.db && <div className="Projects_Panel_One">
                    <p id="title">{this.state.title}</p>
                    <p id="description">{this.state.description}</p>
                    <ul id="tech">
                        {this.state.tech.map(tech => (
                            <li dangerouslySetInnerHTML={{ __html: tech }} key={Math.random()}></li>
                        ))}
                    </ul>
                    {!this.state.repoMenu && <div className="Controls">
                        <div className="Nav_Controls">
                            <img id="previous-btn" src="/res/previous.png" alt="" onClick={() => this.pan('-')}></img>
                            <img id="next-btn" src='res/next.png' alt="" onClick={() => this.pan('+')}></img>
                        </div>
                        <div className="Link_Controls_Header">
                            <p id="first-link-header">visit</p>
                            <p id="center-link-header">repo</p>
                        </div>
                        <div className="Link_Control_Panel">
                            <img src="/res/visit.png" alt="" onClick={() => this.openLink(DataStore[0].projects[this.panDex].url)}></img>
                            <img id="center-img" src="/res/repo.png" alt="" onClick={this.toggleRepo}></img>
                        </div>
                    </div>}
                    {this.state.repoMenu && <div className="Repo_Controls">
                        <div className="Repo_Nag">
                            <p id="repo-nag">Choose Repo</p>
                        </div>
                        <div className="Repo_Controls_Header">
                            <p>client</p>
                            <p>api</p>
                        </div>
                        <div className="Repo_Link_Controls">
                            <img src="/res/previous.png" id="back-img" alt="" onClick={this.toggleRepo}></img>
                            <img src="/res/client.png" id="client-img" alt="" onClick={() => this.openLink(DataStore[0].projects[this.panDex].repo[0])}></img>
                            <img src="/res/api.png" id="client-img" alt="" onClick={() => this.openLink(DataStore[0].projects[this.panDex].repo[1])}></img>
                        </div>
                    </div>}
                </div>}
                {!this.state.previewLoaded && this.state.preview && <div className="Preview_Loading">
                    <Loading />
                </div>}
            </div>
        )
    }
}

export default Projects


