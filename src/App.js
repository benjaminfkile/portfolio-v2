import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import url from './urlStore'
import aboutMe from './AboutStore'
import Nav from './Nav/Nav'
import Home from './Home/Home'
import About from './About/About'
import Skills from './Skills/Skills'
import Projects from './Projects/Projects'
import Contact from './Contact/Contact'
import ProjectStore from './ProjectStore'
import './App.css';

class App extends Component {

  componentDidMount() {
    this.getAboutP1()
    this.getAboutP2()
    this.getProjects()
  }

  getAboutP1 = () => {
    fetch(url + 'about-p1')
      .then(response => response.json())
      .then(data => {
        aboutMe.p1.push(data[0])
      }).catch(error => console.log('failed to fetch about'));
  }

  getAboutP2 = () => {
    fetch(url + 'about-p2')
      .then(response => response.json())
      .then(data => {
        aboutMe.p2.push(data[0])
      }).catch(error => console.log('failed to fetch about'));
  }

  getProjects = () => {
    fetch(url + 'projects')
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          ProjectStore.push(data[i])
        }
      }).catch(error => console.log('failed to fetch projects'));
  }

  render() {
    return (
      <div className="App">
        <div className="Nav_Wrapper">
          <Nav />
        </div>
        <div className="Content_Wrapper">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/skills' component={Skills} />
            <Route path='/projects' component={Projects} />
            <Route path='/contact' component={Contact} />
            <Route component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
