import React, { Component } from 'react'
import axios from 'axios'
import Mapbox from './Mapbox.jsx'
import Header from './Header.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        test: 'test',
    }
  }

  render(){
    return(
      <div className="app-container">
        <Header/>
        <Mapbox/>
      </div>
    )
  }
}

export default App; 