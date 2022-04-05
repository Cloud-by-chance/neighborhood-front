// MapContainer.js

import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
    useEffect(() => {
      const container = document.getElementById("myMap");
      const options = {
        center: new kakao.maps.LatLng(37.708817, 126.752118),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
  
      const ps = new kakao.maps.services.Places();
  
      ps.keywordSearch(searchPlace, placesSearchCB);
  
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();
  
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
  
          map.setBounds(bounds);
        }
      }
  
      function displayMarker(place) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });
      }
    }, [searchPlace]);

    return (
        <div id='myMap' style={{
            width: "100%",
        height: "350px",
        }}></div>
    );
}

export default MapContainer;