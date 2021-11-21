import React from "react";
import Form from "./Form";
import useWeather from "./hooks/useWeather";
import styles from "./Page.module.css";
import WeatherApp from "./Weather";

function Page() {
  const { weather, submitRequest } = useWeather();

  const onSubmit = (value) => {
    submitRequest(value);
  };

  return (
    <div>
      <h1 className={styles.heading}>
        <span className={styles.light}>Weather</span> Forecast
      </h1>
      <Form submitSearch={onSubmit} />
      {weather && <WeatherApp weather={weather} />}
    </div>
  );
}

export default Page;
