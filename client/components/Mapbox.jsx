import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import axios from 'axios';
import Bathroom from './Bathroom.jsx';
import BathroomPopup from './BathroomPopup.jsx';
// AWESOME map examples below
// http://alex3165.github.io/react-mapbox-gl/demos
// https://www.mapbox.com/mapbox-gl-js/api/

const TOKEN = 'pk.eyJ1Ijoic2xhZ2xlYmFnZWwxNyIsImEiOiJjamw1ZHgxc3MwcmlsM3FxbHIzeml1bDFlIn0.MgcX0bSt1txgmOR-HOGlqA';

const Map = ReactMapboxGl({
  accessToken: TOKEN
});

class Mapbox extends Component{
  constructor(props){
    super(props)
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 2.8,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      },
      popup: {
        bathroomLocation: "",
        review: "",
        bathroomPic: "",
        coordinate: null
      },
      bathrooms: []
    }
    this.submitHandler = this.submitHandler.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.bathroomPopup = this.bathroomPopup.bind(this)
  }

  componentDidMount(){
    axios.get('/loadBathrooms').then(bathrooms => {
        console.log('loaded bathrooms ', bathrooms.data);
        this.setState({bathrooms: bathrooms.data})
      })
  }
  
  bathroomPopup(map, evt){
    const coordinate = [evt.lngLat.lng, evt.lngLat.lat]
    const newBathroom = this.state.popup
    this.state.popup.coordinate = coordinate
    this.setState({popup: newBathroom})    
    console.log(this.state.popup)
  }

  //submitting bathroom info
  submitHandler(event){
    event.preventDefault();
    const newBathroom = this.state.popup
    const bathrooms = this.state.bathrooms
    axios.post('/addBathroom', {newBathroom}).then(response => {
      console.log('in the axios post, this is response.data', response.data)
      // this.setState({bathrooms: bathrooms.data})
      bathrooms.push(response.data);
      this.setState({bathrooms: bathrooms})
    })
  }

  //if text is entered into a popup
  handleChange(event){
    if (event.target.placeholder === "Bathroom Location"){
      const tempPopup = this.state.popup
      tempPopup.bathroomLocation = event.target.value; 
      this.setState({popup: tempPopup})
      console.log(event.target.value)
    }
    else if (event.target.placeholder === "Bathroom URL Pic"){
      const tempPopup = this.state.popup
      tempPopup.bathroomPic = event.target.value; 
      this.setState({popup: tempPopup})
      console.log(event.target.value)

    }
    else if (event.target.placeholder === "Poop Review"){
      const tempPopup = this.state.popup
      tempPopup.review = event.target.value; 
      this.setState({popup: tempPopup})
      console.log(event.target.value)
    }
  }


  render(){
    const {viewport} = this.state;
    const bathrooms = this.state.bathrooms.map(bathroom => {
        return <Bathroom key={bathroom._id} coordinate={bathroom.coordinate}/>
    })
    let newPopup; 
    if (this.state.popup.coordinate) {
      newPopup = <BathroomPopup 
                    coordinate={this.state.popup.coordinate}
                    submitHandler={this.submitHandler}
                    handleChange={this.handleChange}
                    bathroomLocation={this.state.popup.bathroomLocation}
                    review={this.state.popup.review}
                    bathroomPic={this.state.popup.bathroomPic}
                    />
    }
    return(
      <div className="map-container">
        <Map className="map-container"
          onClick={this.bathroomPopup}
    
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "60vh",
            width: "92vw",
            margin: "2.8%",
          }}
          >
          {newPopup}
          {bathrooms}
        </Map>
      </div>
    )
  }
}

export default Mapbox