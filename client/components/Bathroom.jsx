import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Bathroom = ({ coordinate }) => {
  const Mark = styled.div`
  background-color: #e74c3c;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 4px solid #eaa29b;
`;
  return (
    <div>
      <Marker
        coordinates={coordinate}
        anchor="bottom"
      >
        <Mark />
      </Marker>
    </div>
  );
};

export default Bathroom;

Bathroom.propTypes = {
  coordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
};
