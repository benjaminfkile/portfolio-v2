import React, {Component} from 'react'
import './Loading.css'

class Loading extends Component{

    render() {
        return (
            <div className="gearbox">
                <div className="overlay"></div>
                <div className="gear one">
                    <div className="gear-inner">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
                <div className="gear two">
                    <div className="gear-inner">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
                <div className="gear three">
                    <div className="gear-inner">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
                <div className="gear four large">
                    <div className="gear-inner">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Loading