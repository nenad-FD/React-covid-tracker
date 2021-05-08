import React, { useState, useEffect } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
//Components
import BoxInfo from "./Components/BoxInfo/BoxInfo";
import Table from "./Components/Table/Table";
import Graph from "./Components/Graph/Graph";
import Map from "./Components/Map/Map";
//Material UI
import { Typography, FormControl, Select, MenuItem } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]); //List of counrties
  const [countryCode, setCountryCode] = useState("worldwide");
  const [selectedCountry, setSelectedCountry] = useState({});
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, long: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);

  //Functions
  const onChangeCountry = async (event) => {
    const countryCode = event.target.value; //ovo moras ovako, ne mozes direktno dole
    setCountryCode(countryCode); //Set Country Code: AF, UK ...
    let url;
    if (countryCode === "worldwide") {
      url = "https://disease.sh/v3/covid-19/all";
    } else {
      url = ` https://disease.sh/v3/covid-19/countries/${countryCode}`;
    }
    //Fetch selected country
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCountry(data);
        if (countryCode === "worldwide") {
          setMapCenter({ lat: 34.80746, long: -40.4796 });
        } else {
          setMapCenter({
            lat: data.countryInfo.lat,
            long: data.countryInfo.long,
          });
        }

        setMapZoom(5);
      });
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setSelectedCountry(data);
      });
  }, []);

  useEffect(() => {
    //Get data from API--> list of all countries
    const getDataCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => setCountries(data));
    };
    getDataCountries();
  }, []);

  return (
    <div className="app">
      <div className="left__side container">
        <div className="leftSide__header">
          <Typography
            variant="h3"
            color="secondary"
            className="header__heading"
          >
            Covid 19 Tracker
          </Typography>
          <FormControl variant="outlined" className="header__formControl">
            <Select onChange={onChangeCountry} value={countryCode}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem
                    key={country.country}
                    value={country.countryInfo.iso2}
                  >
                    {country.country}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <section className="leftSide__boxInfo">
          <BoxInfo
            casesType={casesType}
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title={"Coronavirus cases"}
            todayCases={selectedCountry.todayCases}
            total={selectedCountry.cases}
            value="cases"
          />
          <BoxInfo
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title={"Recovered"}
            todayCases={selectedCountry.todayRecovered}
            total={selectedCountry.recovered}
            value="recovered"
          />
          <BoxInfo
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title={"Deaths"}
            todayCases={selectedCountry.todayDeaths}
            total={selectedCountry.deaths}
            value="deaths"
          />
        </section>
        <Map
          countries={countries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className="right__side container">
        <Table countries={countries} />
        <Graph casesType={casesType} />
      </div>
    </div>
  );
}

export default App;
