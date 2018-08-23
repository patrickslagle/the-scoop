import React from 'react';
import ReactMapboxGl, { Popup } from "react-mapbox-gl";


const BathroomPopup = props => {
  return (
  <div>
    <Popup className="popup"
      coordinates={props.coordinate}
      // onClick={() => this.addLike({test: 'testing'})}
      anchor="bottom"
      offset={{
        'bottom-left': [0, 0],  'bottom': [0, 0], 'bottom-right': [0, 0]
      }}>
    <h1>Add Bathroom</h1>
    <form onSubmit={props.submitHandler}> 
      <input type="text"
        placeholder="Bathroom Location"
        value={props.bathroomLocation} 
        onChange={props.handleChange} 
      /><br/>
      <input type="text"
        placeholder="Bathroom URL Pic"
        value={props.bathroomPic} 
        onChange={props.handleChange}  
      /><br/>
      <input type="text"
        placeholder="Poop Review"
        value={props.review} 
        onChange={props.handleChange}  
      /><br/>
      <input type="submit" 
        value="Submit"
      />
    </form>
  </Popup>
  </div>
)};

export default BathroomPopup; 

