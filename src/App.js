import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from './Nav/Nav'
import Home from './Home/Home'
import About from './About/About'
import Skills from './Skills/Skills'
import Projects from './Projects/Projects'
import Contact from './Contact/Contact'
import './App.css';

class App extends Component {

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
