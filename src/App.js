import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import targetUrl from './apiStore'
import Nav from './Nav/Nav'
import Home from './Home/Home'
import About from './About/About'
import Skills from './Skills/Skills'
import Projects from './Projects/Projects'
import Contact from './Contact/Contact'
import DataStore from './DataStore'
import Loading from './Loading/Loading'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hasData: false,
      error: false
    }
  }

  componentDidMount() {
    this.dataInterval = setInterval(this.fetchData, 1000)
    this.fetchData()
  }

  fetchData = () => {
    fetch(targetUrl + 'get')
      .then(response => response.json())
      .then(data => {
        DataStore.unshift(data)
        if (!this.state.hasData) {
          this.setState({ hasData: true })
        }
      }).catch(error => this.setState({ error: true }));
    if (DataStore.length > 1) {
      DataStore.length = 2
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.hasData && !this.state.error && <div className="Desktop_Nav_Wrapper">
          <Nav />
        </div>}
        {this.state.hasData && !this.state.error && <div className="Content_Wrapper">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/skills' component={Skills} />
            <Route path='/projects' component={Projects} />
            <Route path='/contact' component={Contact} />
            <Route component={Home} />
          </Switch>
        </div>}
        {this.state.hasData && !this.state.error && <div className="Nav_Wrapper">
          <Nav />
        </div>}
        {!this.state.hasData && !this.state.error && <div className="Gears">
          <Loading />
        </div>}
        {this.state.error && <div className="Error">
          <p>
            Error fetching data
          </p>
        </div>}
      </div>
    );
  }
}
export default App;
