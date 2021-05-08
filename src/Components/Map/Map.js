import React from "react";
import "./Map.css";
import ChangeView from "../ChangeView/ChangeView";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";

function Map({ countries, casesType, center, zoom }) {
  const casesTypeColors = {
    cases: {
      hex: "#e65c00",
      multiplier: 600,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 600,
    },
    deaths: {
      hex: "#cc1034",
      multiplier: 1100,
    },
  };

  return (
    <div className="map">
      <MapContainer center={[center.lat, center.long]} zoom={zoom}>
        <ChangeView center={[center.lat, center.long]} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Loop throught countries and draw circles on the screen*/}
        {countries.map((country) => {
          return (
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              radius={
                Math.sqrt(country[casesType]) *
                casesTypeColors[casesType].multiplier
              }
              pathOptions={{
                color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex,
              }}
            >
              <Popup>
                <div className="popup__container">
                  <div
                    className="popup__flag"
                    style={{
                      backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                  ></div>
                  <div className="popup__name">{country.country}</div>
                  <div className="popup__cases">Cases: {country.cases}</div>
                  <div className="popup__recovered">
                    Recovered:{country.recovered}
                  </div>
                  <div className="popup__deaths">Deaths: {country.deaths}</div>
                </div>
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
