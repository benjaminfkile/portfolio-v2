import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
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
    this.getProjects()
  }

  getProjects = () => {
    // fetch('http://localhost:8000/api/projects')
    fetch('https://lit-tor-99413.herokuapp.com/api/projects')
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          ProjectStore.push(data[i])
        }
      }).catch(error => console.log('failed to fetch'));
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
