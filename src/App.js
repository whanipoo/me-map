import React, { Component } from "react";
import "./App.css";
import Map from "./components/Map";
import SquareAPI from "./api/";
import Sidebar from "./components/Sidebar";

class App extends Component {
  constructor() {
    super();
    //Set array variables
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      },
      error: false
    };
  }

  closeAllMarkers() {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  }
  //Close all markers' windows except the one that is clicked
  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });

    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
      //console.log(newVenue);
    });
  };

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  };

  componentDidMount() {
    SquareAPI.search({
      near: "Bangkok, Thailand",
      query: "Mall",
      limit: 10
    })
      .then(results => {
        const { venues } = results.response;
        const { center } = results.response.geocode.feature.geometry;
        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true,
            id: venue.id
          };
        });

        this.setState({ venues, center, markers });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  render() {
    return (
      <div>
        {this.state.error ? (
          <p>App cannot reach FourSquare API servers</p>
        ) : (
          <div className="App">
            <Sidebar
              {...this.state}
              handleListItemClick={this.handleListItemClick}
            />
            <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
