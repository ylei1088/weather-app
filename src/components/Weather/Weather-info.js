import React from "react";
import "./weather-info.css";

function WeatherInfo(props) {
  const data = props.data;
  const { name, main } = data;

  const iconurl =
    "http://openweathermap.org/img/wn/" +
    `${data.cod !== 404 ? data.weather[0].icon : null}` +
    ".png";

  //change fahrenheit to celsius
  const mainfahrenheit = Math.floor(data.main.temp - 273) + 32;
  const fellLike_fahrenheit = Math.floor(main.feels_like - 273) + 32;
  const minfahrenheit = Math.round(main.temp_min - 273) + 32;
  const maxfahrenheit = Math.round(main.temp_max - 273) + 32;

  return (
    <div className="container">
      <div className="weather-box">
        {" "}
        <h3>Current Weather: {name}</h3>
        <div className="WeatherContainer">
          <h1>{mainfahrenheit + "°F"}</h1>
          {`  |  ${data?.weather[0].description}`}

          <img className="weather-icon" src={iconurl} alt="" />
        </div>
        <p>{"Feels Like: " + fellLike_fahrenheit + "°F"}</p>
        <p>
          {minfahrenheit + "°F"} / {maxfahrenheit + "°F"}
        </p>
        <p>Humidity: {main.humidity}%</p>
      </div>
    </div>
  );
}

export default WeatherInfo;
