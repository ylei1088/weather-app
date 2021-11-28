import React, { useState } from "react";
import LoadingSpinner from "./loading-spinner";
import ErrorMessage from "./error-message";
import WeatherInfo from "./weather-info";
import "./page.css";
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

          <label htmlFor="city-name">Enter City Name:</label>

          <input
            id="city-name"
            type="text"
            className="input"
            placeholder="Enter City"
            value={cityName}
            onChange={onCityNameChange}
          />
          <input
            className="search-box"
            type="submit"
            value={isLoading ? "Searching" : "Search"}
            disabled={isLoading}
          />

          <input
            className="clear"
            type="button"
            value="Clear"
            onClick={onClearClick}
          />
        </form>

        {isLoading && <LoadingSpinner size="50px" />}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {weatherData && <WeatherInfo data={weatherData} />}
      </div>
    </main>
  );
}

export default Page;
