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
  accessToken: TOKEN,
});

class Mapbox extends Component {
  constructor(props) {
    super(props);
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
        bathroomLocation: '',
        review: '',
        bathroomPic: '',
        coordinate: null,
      },
      bathrooms: [],
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.bathroomPopup = this.bathroomPopup.bind(this);
  }

  componentDidMount() {
    axios.get('/loadBathrooms')
      .then(bathrooms => this.setState({ bathrooms: bathrooms.data }));
  }

  bathroomPopup(map, evt) {
    const { popup } = this.state;
    const newBathroom = Object.assign(popup);
    const coordinate = [evt.lngLat.lng, evt.lngLat.lat];
    newBathroom.coordinate = coordinate;
    this.setState({ popup: newBathroom });
  }

  // submitting bathroom info
  submitHandler(event) {
    event.preventDefault();
    const { popup, bathrooms } = this.state;
    axios.post('/addBathroom', { popup })
      .then((response) => {
        bathrooms.push(response.data);
        this.setState({ bathrooms });
      });
  }

  // if text is entered into a popup
  handleChange(event) {
    const { tempPopup } = this.state.popup;
    if (event.target.placeholder === 'Bathroom Location') {
      tempPopup.bathroomLocation = event.target.value;
    } else if (event.target.placeholder === 'Bathroom URL Pic') {
      tempPopup.bathroomPic = event.target.value;
    } else if (event.target.placeholder === 'Poop Review') {
      tempPopup.review = event.target.value;
    }
    this.setState({ popup: tempPopup });
  }


  render() {
    const { bathrooms } = this.state;
    const { coordinate, bathroomLocation, review, bathroomPic } = this.state.popup;
    const renderedBathrooms = bathrooms.map(bathroom => (
      <Bathroom key={bathroom._id} coordinate={bathroom.coordinate} />
    ));
    let newPopup;
    if (coordinate) {
      newPopup = (
        <BathroomPopup
          coordinate={coordinate}
          submitHandler={this.submitHandler}
          handleChange={this.handleChange}
          bathroomLocation={bathroomLocation}
          review={review}
          bathroomPic={bathroomPic}
        />
      );
    }
    return (
      <div className="map-container">
        <Map
          className="map-container"
          onClick={this.bathroomPopup}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '60vh',
            width: '92vw',
            margin: '2.8%',
          }}
        >
          {newPopup}
          {renderedBathrooms}
        </Map>
      </div>
    );
  }
}

export default Mapbox;
