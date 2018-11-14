/* eslint-disable jsx-a11y/img-redundant-alt */
/*global google*/
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
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultZoom={8}
        zoom={props.zoom}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        center={{
          lat: parseFloat(props.center.lat),
          lng: parseFloat(props.center.lng)
        }}
        defaultOptions={{ styles: mapStyles }}
      >
        {props.markers &&
          props.markers
            .filter(marker => marker.isVisible)
            .map((marker, index, arr) => {
              const venueInfo = props.venues.find(
                venue => venue.id === marker.id
              );
              //Marker window shows the location's information
              return (
                <Marker
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  onClick={() => props.handleMarkerClick(marker)}
                  animation={
                    arr.length === 1 ||
                    (marker.isOpen && google.maps.Animation.BOUNCE)
                  }
                >
                  {marker.isOpen && (
                    <InfoWindow>
                      <React.Fragment>
                        {venueInfo.bestPhoto ? (
                          <img
                            src={`${venueInfo.bestPhoto.prefix}200x200${
                              venueInfo.bestPhoto.suffix
                            }`}
                            alt={`Picture of ${venueInfo.name}`}
                          />
                        ) : (
                          <p>
                            Failed to load image
                            <br />
                            API request exceeded daily limit
                          </p>
                        )}
                        <p>{venueInfo.name}</p>
                        <p>{venueInfo.location.address}</p>
                      </React.Fragment>
                    </InfoWindow>
                  )}
                </Marker>
              );
            })}
      </GoogleMap>
    );
  })
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
