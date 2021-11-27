import React from "react";

function WeatherInfo(props) {
  const data = props.data;
  const { name, main } = data;

  return (
    <div>
      <h1>{name}</h1>

      <h3>{Math.floor(data?.main?.temp - 273)}°C</h3>
      <h3>{main.feels_like}</h3>
      <h3>{main.temp_min}</h3>
      <h3>{main.temp_max}</h3>
      <h3>{main.pressure}</h3>
      <h3>{main.humidity}</h3>
    </div>
  );
}

export default WeatherInfo;
