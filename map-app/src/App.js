import React, { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import "./app.css";

export default function App() {
  const [pins, setPins] = useState([]);
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3,
  });

  const [showPopup, setShowPopup] = React.useState(true);

  useEffect(() => {
    const getpins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getpins();
  }, []);

  return (
    <Map
      {...viewState}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
      }}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
    >
      {pins.map((p) => (
        <>
          <Marker
            longitude={p.long}
            latitude={p.lat}
            draggable={true}
            //anchor="center"
            //scale={"40px"}
          >
            <Room
              style={{
                width: viewState.zoom * 7,
                height: viewState.zoom * 7,
                color: "slateblue",

                //rotationAlignment: visualViewport
                //offset: [-(viewState.zoom * 7) / 2, -(viewState.zoom * 7) / 2],
              }}
            />
          </Marker>
          {showPopup && (
            <Popup
              longitude={p.long}
              latitude={p.lat}
              anchor="left"
              onClose={() => setShowPopup(false)}
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p className="desc">{p.desc}</p>
                <label>Ratings</label>
                <div className="stars">
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                </div>
                <label>Information</label>
                <span className="username">
                  Created by<b> {p.username}</b>
                </span>
                <span className="date">1 hour ago</span>
              </div>
            </Popup>
          )}
        </>
      ))}
    </Map>
  );
}
