import React from "react";
import "./weather-info.css";

function WeatherInfo(props) {
  const data = props.data;
  const { name, main } = data;

  return (
    <div className="container">
      <div className="weather-box">
        {" "}
        <h3>Current Weather: {name}</h3>
        <h1>{Math.floor(data.main.temp - 273) + 32}°F</h1>
        <p>Feels Like: {Math.floor(main.feels_like - 273) + 32}°F</p>
        <p>
          Min: {Math.round(main.temp_min - 273) + 32}˚F / Max:{" "}
          {Math.round(main.temp_max - 273) + 32}
          ˚F
        </p>
        <p>Humidity: {main.humidity}%</p>
      </div>
    </div>
  );
}

export default WeatherInfo;
