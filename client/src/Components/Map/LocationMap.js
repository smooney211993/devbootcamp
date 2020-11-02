import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';
import './map.css';

const locationMap = ({ location, zoomLevel }) => {
  return (
    <div>
      <h2 className='map-h2'>Come Visit Us At Our Campus</h2>

      <div className='google-map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA82CizYahUkhKpE4s3ouGM47uM6CRLCQI' }}
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
