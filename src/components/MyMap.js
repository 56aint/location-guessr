import React, { Component } from "react";
import "../styles/MyMap.css";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import MarkerCoordsContext from "./context/MarkerCoordsContext";

class MyMap extends Component {
  static contextType = MarkerCoordsContext;
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          position: { lat: 0, lng: 0 },
        },
      ],
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(t, map, coord) {
    const { markerCoords, setMarkerCoords } = this.context;
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(() => {
      return {
        markers: [
          {
            position: { lat, lng },
          },
        ],
      };
    });
    setMarkerCoords(this.state.markers);
  }

  render() {
    return (
      <div className="mapStyles">
        <Map google={this.props.google} zoom={1} onClick={this.onClick}>
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              name={marker.name}
              position={marker.position}
            />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCilez1b7dhQMTpuFmMz6hF5zYq2-ftkZI",
})(MyMap);
