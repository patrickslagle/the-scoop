import React, { Component } from 'react'
import axios from 'axios'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        test: 'test',
        lat: 51.505,
        lng: -0.09,
        zoom: 13
    }
  }

  componentDidMount(){
    axios.get('/test').then(response => {
        this.setState(response.data)
      })
  }  

  addLike(name){
    axios.post('/test', {test: name.test}).then(response => {
      console.log('in the axios post, this is response.data', response.data)
      this.setState(response.data)
    })
  }

  render(){
    const position = [this.state.lat, this.state.lng];

    return(
      <div className="div-container">
        <button onClick={() => this.addLike({test: 'testing'})}>HI</button>
        <p>{this.state.test}</p>
        <Map center={position} zoom={this.state.zoom} className="map-container">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' className="tilelayer-container"
        />
        <Marker position={position} className="marker-container">
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </Map>
      </div>
    )
  }
}

export default App; 