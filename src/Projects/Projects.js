import React, { Component } from 'react'
import ProjectStore from '../ProjectStore'
import '../Projects/Projects.css'

class Projects extends Component {

    photoDex = -1
    mounted = false
    constructor(props) {
        super(props)
        this.state = {
            db: false,
            project: 1,
            mobile: true,
            title: null,
            description: null,
            photo: null,
            preview: true
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
        if (ProjectStore.length > 0 && this.mounted) {
            clearInterval(this.dbInterval)
            this.setState({ db: true })
            this.carousel()
            this.carouselInterval = setInterval(this.carousel, 5000)
        }
    }

    carousel = () => {
        this.photoDex += 1
        if (this.photoDex < ProjectStore[this.state.project].mobile.length) {
            this.setState(
                {
                    title: ProjectStore[this.state.project].name,
                    description: ProjectStore[this.state.project].description,
                    photo: ProjectStore[this.state.project].mobile[this.photoDex]
                })

        } else {
            this.photoDex = -1
        }
    }

    togglePreview = () => {
        if(this.state.preview){
            this.setState({preview: false})
        }else{
            this.setState({preview: true})
        }
    }

    render() {
        console.log(ProjectStore)
        return (
            <div className="Projects">
                {!this.state.preview && this.state.db && <div className="Projects_Panel_One">
                    <h1 id="title">{this.state.title}</h1>
                    <p id="description">{this.state.description}</p>
                    <p id="tech">tech</p>
                    
                </div>}
                {this.state.preview && this.state.db && <div className="Projects_Panel_Two">

                </div>}
                {this.state.preview && this.state.db && <div className="Preview">
                    <img id="screenshot" src={this.state.photo} alt=""></img>
                    <img id="collapse-preview" src='./res/collapse.png' alt="" onClick={this.togglePreview}></img>
                </div>}


            </div>
        )
    }
}

export default Projects