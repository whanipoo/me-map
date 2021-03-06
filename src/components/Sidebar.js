import React, { Component } from "react";
//Sidebar component
export default class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      venues: []
    };
  }
  handleFilterVenues = () => {
    if (this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return venues;
    }
    return this.props.venues;
  };
  //Filter Input: Set markers' visibility based on user input filter
  handleChange = evt => {
    this.setState({ query: evt.target.value });
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
        .toLowerCase()
        .includes(evt.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers });
  };

  render() {
    return (
      <div aria-label="sidebar" className="sidebar">
        <input
          type="search"
          id="serach"
          placeholder="Filter Venues"
          value={this.state.query}
          onChange={this.handleChange}
          tabIndex="0"
          aria-label="txtboxLabel"
          autoFocus={true}
        />
        <ol className="venuelist">
          {this.handleFilterVenues() &&
            this.handleFilterVenues().map((venue, index) => (
              <li
                className="listitem"
                onClick={() => this.props.handleListItemClick(venue)}
                tabIndex="0"
                role="button"
                key={index}
              >
                {venue.name}
              </li>
            ))}
        </ol>
      </div>
    );
  }
}
