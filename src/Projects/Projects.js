import React, { Component } from 'react'
import DataStore from '../DataStore'
import Loading from '../Loading/Loading'
import '../Projects/Projects.css'

class Projects extends Component {

    photoDex = -1
    mounted = false
    panDex = 0
    constructor(props) {
        super(props)
        this.state = {
            db: false,
            mobile: true,
            title: null,
            description: null,
            tech: [],
            photo: null,
            desktopPhoto: null,
            preview: false,
            previewLoaded: false,
            repoMenu: false,
            animateControls: true
        }
    }

    componentDidMount() {
        this.mounted = true
        this.dbInterval = setInterval(this.listen4DB, 500)
    }

    componentWillUnmount() {
        this.mounted = false
    }

    listen4DB = () => {
        if (DataStore[0].projects.length > 0 && this.mounted) {
            clearInterval(this.dbInterval)
            this.setState({ db: true })
            this.pan('-')
            this.carouselInterval = setInterval(this.carousel, 4000)
        }
    }

    carousel = () => {
        this.photoDex += 1
        if (this.photoDex < DataStore[0].projects[this.panDex].mobile.length && this.mounted) {
            this.setState({ photo: DataStore[0].projects[this.panDex].mobile[this.photoDex] })
        } else {
            this.photoDex = 0
        }
        if (this.photoDex < DataStore[0].projects[this.panDex].desktop.length && this.mounted) {
            this.setState({ desktopPhoto: DataStore[0].projects[this.panDex].desktop[this.photoDex] })
        } else {
            this.photoDex = 0
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
            photo: DataStore[0].projects[this.panDex].mobile[this.photoDex],
            desktopPhoto: DataStore[0].projects[this.panDex].desktop[this.photoDex]

        })
        this.carousel()
    }

    togglePreview = () => {
        if (this.state.preview) {
            this.setState({ preview: false })
        } else {
            this.setState({ preview: true })
        }
        this.photoDex = 0
    }

    toggleRepo = () => {
        if (this.state.repoMenu) {
            this.setState({ repoMenu: false, animateControls: false })
        } else {
            this.setState({ repoMenu: true, animateControls: false })
        }
    }

    toggleLoaded = () => {
        this.setState({ previewLoaded: true })
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
                    {!this.state.repoMenu && this.state.animateControls && <div className="Animated_Controls">
                        <div className="Nav_Controls">
                            <img id="previous-btn" src="/res/previous.png" alt="" onClick={() => this.pan('-')}></img>
                            <img id="next-btn" src='res/next.png' alt="" onClick={() => this.pan('+')}></img>
                        </div>
                        <div className="Link_Controls_Header">
                            <p id="first-link-header">visit</p>
                            <p id="center-link-header">repo</p>
                            <p>img</p>
                        </div>
                        <div className="Link_Control_Panel">
                            <img src="/res/visit.png" alt="" onClick={() => this.openLink(DataStore[0].projects[this.panDex].url)}></img>
                            <img id="center-img" src="/res/repo.png" alt="" onClick={this.toggleRepo}></img>
                            <img src="/res/preview.png" alt="" onClick={this.togglePreview}></img>
                        </div>
                    </div>}
                    {!this.state.repoMenu && !this.state.animateControls && <div className="Controls">
                        <div className="Nav_Controls">
                            <img id="previous-btn" src="/res/previous.png" alt="" onClick={() => this.pan('-')}></img>
                            <img id="next-btn" src='res/next.png' alt="" onClick={() => this.pan('+')}></img>
                        </div>
                        <div className="Link_Controls_Header">
                            <p id="first-link-header">visit</p>
                            <p id="center-link-header">repo</p>
                            <p>img</p>
                        </div>
                        <div className="Link_Control_Panel">
                            <img src="/res/visit.png" alt="" onClick={() => this.openLink(DataStore[0].projects[this.panDex].url)}></img>
                            <img id="center-img" src="/res/repo.png" alt="" onClick={this.toggleRepo}></img>
                            <img src="/res/preview.png" alt="" onClick={this.togglePreview}></img>
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
                {this.state.preview && this.state.db && <div className="Preview">
                    <img id="screenshot-loader" src={this.state.photo} alt="" onLoad={this.toggleLoaded}></img>
                    {this.state.previewLoaded && <img id="screenshot" src={this.state.photo} alt=""></img>}
                    {this.state.previewLoaded && <img id="collapse-preview" src='./res/collapse.png' alt="" onClick={this.togglePreview}></img>}
                </div>}
                {this.state.preview && this.state.db && <div className="Preview_Desktop">
                    <img id="screenshot-loader" src={this.state.desktopPhoto} alt="" onLoad={this.toggleLoaded}></img>
                    {this.state.previewLoaded && <img id="screenshot" src={this.state.desktopPhoto} alt=""></img>}
                    {this.state.previewLoaded && <img id="collapse-preview" src='./res/collapse.png' alt="" onClick={this.togglePreview}></img>}
                </div>}
                {!this.state.previewLoaded && this.state.preview && <div className="Preview_Loading">
                    <Loading />
                </div>}
            </div>
        )
    }
}

export default Projects