import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';
import './map.css';

const locationMap = ({ location, zoomLevel }) => {
  return (
    <div>
      <h2 className='map-h2'>Come Vist Our Campus!</h2>
      <p>{location.address}</p>

      <div className='google-map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY }}
          defaultCenter={location}
          defaultZoom={zoomLevel}>
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default locationMap;
