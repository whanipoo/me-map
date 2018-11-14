/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import mapStyles from "./mapStyles.js";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
//Set map's default and style
const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      zoom={props.zoom}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={props.center}
      defaultOptions={{ styles: mapStyles }}
    >
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, index) => {
            const venueInfo = props.venues.find(
              venue => venue.id === marker.id
            );
            return (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => props.handleMarkerClick(marker)}
              > //Marker window shows the location's information
                {marker.isOpen && (
                  <InfoWindow>
                    <React.Fragment>
                      <p>{venueInfo.name}</p>
                      <p>{venueInfo.location.address}</p>
                    </React.Fragment>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
    </GoogleMap>
  ))
);
//Render the map
export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAccl4vNy_EHD28t6n3kQJ-JhcQg985ZYI&v=3"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: "75%" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
