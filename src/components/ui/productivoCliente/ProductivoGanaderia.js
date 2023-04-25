import React, { useEffect, useRef, useState } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const ProductivoGanaderia = () => {
  const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoianVsaXBlcmVsZGEiLCJhIjoiY2xnZ2lqZTR0MDVxMDNjbzY3ZmkyeTg4ZSJ9.tuTXT_-exIErerEPFT9o3g',
  });

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  return (
    <>
      <Map
        style="mapbox://styles/mapbox/streets-v12"
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
        center={[lng, lat]}
        zoom={[zoom]}
      >
        <Marker coordinates={[lng, lat]} anchor="bottom">
          <img src="https://placekitten.com/50/50" alt="Marker" />
        </Marker>
      </Map>
    </>
  );
};

export default ProductivoGanaderia;
