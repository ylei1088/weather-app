import { useState } from "react";
import axios from "axios";

const api = {
  key: "9d4bc884118c415fc015ad23d6dec881",
  base: "http://api.openweathermap.org/data/2.5/",
};

const useWeather = () => {
  const [isError, setError] = useState(false);
  const [weather, setWeather] = useState();

  const getWeather = async (city) => {
    const { data } = await axios({
      method: "GET",
      url: `${api.base}weather?q=${city},&APPID=${api.key}`,
    });
    console.log({ data });

    if (!data || data.length === 0) {
      setError("There is no such location");
      return;
    }

    return data[0];
  };

  const submitRequest = async (city) => {
    setError(false);

    const response = await getWeather(city);
    if (!response?.getWeather) return;
  };

  return {
    weather,
    submitRequest,
  };
};

export default useWeather;
