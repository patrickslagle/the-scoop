import React, { Component } from 'react'
import Mapbox from './Mapbox.jsx'
import Header from './Header.jsx'

class App extends Component {
  constructor(props) {
    super(props);
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