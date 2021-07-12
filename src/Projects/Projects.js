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
            animateControls: true,
            projects: null
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
            let techArray = []
            // DataStore[0].projects = DataStore[0].projects.sort((a, b) => (a.order > b.order) ? 1 : -1)
            for (let i = 0; i < DataStore[0].projects[this.panDex].tech.length; i++) {
                techArray.push("<i class=\"" + DataStore[0].projects[this.panDex].tech[i] + "\"></i>")
            }

            this.setState({
                title: DataStore[0].projects[this.panDex].name,
                description: DataStore[0].projects[this.panDex].description,
                tech: techArray,
                photo: DataStore[0].projects[this.panDex].mobile[this.photoDex],
                desktopPhoto: DataStore[0].projects[this.panDex].desktop[this.photoDex],
                db: true,
                projects: DataStore[0].projects.sort((a, b) => (a.order > b.order) ? 1 : -1)
            })
            this.carousel()
            this.carouselInterval = setInterval(this.carousel, 3000)
        }
    }

    carousel = () => {
        this.photoDex += 1
        if (this.photoDex > this.state.projects[this.panDex].mobile.length - 1) {
            this.photoDex = 0
        }
        this.setState({
            photo: this.state.projects[this.panDex].mobile[this.photoDex],
            desktopPhoto: this.state.projects[this.panDex].desktop[this.photoDex]
        })
    }

    pan = (args) => {
        if (args && args === '+') {
            if (this.panDex > this.state.projects.length - 2) {
                this.panDex = 0
            } else {
                this.panDex += 1
            }
        } else {
            if (this.panDex === 0) {
                this.panDex = this.state.projects.length - 1
            } else {
                this.panDex -= 1
            }
        }
        let techArray = []

        for (let i = 0; i < this.state.projects[this.panDex].tech.length; i++) {
            techArray.push("<i class=\"" + this.state.projects[this.panDex].tech[i] + "\"></i>")
        }
        this.setState({
            title: this.state.projects[this.panDex].name,
            description: this.state.projects[this.panDex].description,
            tech: techArray,
            animateControls: false

        })
    }

    togglePreview = () => {
        if (this.state.preview) {
            this.setState({ preview: false })
        } else {
            this.setState({ preview: true })
        }
        this.photoDex = -1
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

        console.log(this.panDex)
        console.log(this.state.projects)

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
                    {DataStore[0].projects[this.panDex].url !== "f" && <div className="Multiple_Repos">
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
                                <img src="/res/visit.png" alt="" onClick={() => this.openLink(this.state.projects[this.panDex].url)}></img>
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
                                <img src="/res/visit.png" alt="" onClick={() => this.openLink(this.state.projects[this.panDex].url)}></img>
                                <img id="center-img" src="/res/repo.png" alt="" onClick={this.toggleRepo}></img>
                                <img src="/res/preview.png" alt="" onClick={this.togglePreview}></img>
                            </div>
                        </div>}
                    </div>}
                    {DataStore[0].projects[this.panDex].url === "f" && <div className="Single_Repo">
                        {!this.state.repoMenu && this.state.animateControls && <div className="Animated_Controls">
                            <div className="Nav_Controls">
                                <img id="previous-btn" src="/res/previous.png" alt="" onClick={() => this.pan('-')}></img>
                                <img id="next-btn" src='res/next.png' alt="" onClick={() => this.pan('+')}></img>
                            </div>
                            <div className="Single_Link_Controls_Header">
                                <p id="center-link-header">repo</p>
                                <p>img</p>
                            </div>
                            <div className="Single_Link_Control_Panel">
                                <img id="single-repo-img" src="/res/repo.png" alt="" onClick={() => this.openLink(this.state.projects[this.panDex].repo[0])}></img>
                                <img id="single-repo-preview-btn" src="/res/preview.png" alt="" onClick={this.togglePreview}></img>
                            </div>
                        </div>}
                        {!this.state.repoMenu && !this.state.animateControls && <div className="Controls">
                            <div className="Nav_Controls">
                                <img id="previous-btn" src="/res/previous.png" alt="" onClick={() => this.pan('-')}></img>
                                <img id="next-btn" src='res/next.png' alt="" onClick={() => this.pan('+')}></img>
                            </div>
                            <div className="Single_Link_Controls_Header">
                                <p id="center-link-header">repo</p>
                                <p>img</p>
                            </div>
                            <div className="Single_Link_Control_Panel">
                                <img id="single-repo-img" src="/res/repo.png" alt="" onClick={() => this.openLink(this.state.projects[this.panDex].repo[0])}></img>
                                <img id="single-repo-preview-btn" src="/res/preview.png" alt="" onClick={this.togglePreview}></img>
                            </div>
                        </div>}
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
                            <img src="/res/client.png" id="client-img" alt="" onClick={() => this.openLink(this.state.projects[this.panDex].repo[0])}></img>
                            <img src="/res/api.png" id="client-img" alt="" onClick={() => this.openLink(this.state.projects[this.panDex].repo[1])}></img>
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