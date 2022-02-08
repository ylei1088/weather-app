import React, { useState } from "react";
import LoadingSpinner from "../Common/Loading-spinner";
import ErrorMessage from "../Common/Error-message";
import WeatherInfo from "../Weather/Weather-info";
import "./page.css";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

require("dotenv").config();

function Page() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const api = {
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const onCityNameChange = (e) => {
    setCityName(e.target.value);
  };

  const onClearClick = (e) => {
    setWeatherData(null);
    setCityName("");
  };

  const onSearchFormSubmit = async (e) => {
    e.preventDefault();

    if (cityName === "") {
      setErrorMessage(
        "No city name provided, please try entering a city name."
      );
      return;
    }

    const lowercaseName = cityName.toLocaleLowerCase();
    const url = `${api.base}weather?q=${lowercaseName}&units=imperial,&APPID=9d4bc884118c415fc015ad23d6dec881`;
    setErrorMessage(null);
    setWeatherData(null);
    setIsLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Bad API request");
      }
      const json = await response.json();
      setWeatherData(json);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Could not get that city, please try another city or try again later."
      );
    }

    setIsLoading(false);
  };

  return (
    <main>
      <div className="container">
        <form className="box" onSubmit={onSearchFormSubmit}>
          <h1 className="title">Weather App</h1>
          <p>Search your local weather</p>
          <div>
            <TextField
              id="city-name"
              type="text"
              value={cityName}
              onChange={onCityNameChange}
              label="Enter City"
              variant="filled"
            />
          </div>
          <div>
            <Button
              type="submit"
              value={isLoading ? "Searching" : "Search"}
              disabled={isLoading}
              variant="contained"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </div>
          <div>
            <Button
              className="clear"
              type="button"
              value="Clear"
              onClick={onClearClick}
            >
              Clear
            </Button>
          </div>
        </form>
        {isLoading && <LoadingSpinner size="50px" />}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {weatherData && <WeatherInfo data={weatherData} />}
      </div>
    </main>
  );
}

export default Page;
