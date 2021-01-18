import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import LineChart from "./Components/LineChart";
import PieChart from "./Components/PieChart";
import Cards from "./Components/Cards";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./styles.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Global");
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    const GetData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((data) => data.json())
        .then((result) => {
          const countries = result.map((item) => ({
            name: item.country,
            value: item.countryInfo.iso2
          }));
          setCountries(countries);
        });
    };
    GetData();
  }, []);

  useEffect(() => {
    const GetData = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((data) => data.json())
        .then((data) => setCountryData(data));
    };
    GetData();
  }, []);

  async function Update_country(event) {
    const url =
      event.target.value === "Global"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${event.target.value}`;

    await fetch(url)
      .then((item) => item.json())
      .then((data) => {
        setCountry(event.target.value);
        setCountryData(data);
      });
  }

  return (
    <div className="App">
      <div className="Stats">
        <div className="Row">
          <FormControl className="AppDropDown">
            <Select
              id="Selector"
              onChange={Update_country}
              variant="filled"
              value={country}
            >
              <MenuItem value="Global">Global</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <h1 className="App_Title">VirA!ert</h1>
          <a id="icon" href="https://github.com/Mattli8312">
            <GitHubIcon />
          </a>
        </div>
        <div className="Row">
          <Cards
            name="Cases"
            id="Bad"
            value={countryData.cases}
            value2={countryData.todayCases}
          />
          <Cards
            name="Deaths"
            id="VeryBad"
            value={countryData.deaths}
            value2={countryData.todayDeaths}
          />
          <Cards
            name="Recovered"
            id="Good"
            value={countryData.recovered}
            value2={countryData.todayRecovered}
          />
          <Cards name="Tests" value={countryData.tests} />
          <Cards name="Critical Cases" value={countryData.critical} />
        </div>
      </div>
      <div className="Graph">
        <PieChart name={country} data={countryData} />
        <LineChart />
      </div>
    </div>
  );
}
