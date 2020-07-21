import React, { useEffect, useState } from "react";
import axios from "axios";
const key = process.env.REACT_APP_SECRET_KEY;
const Weather = ({ capital }) => {
  const [capitalWeather, setCapitalWeather] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${key}&query=${capital}`
      )
      .then((response) => setCapitalWeather(response.data.current));
  }, [capital]);
  console.log(capitalWeather);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <strong>Temperature:</strong> {capitalWeather.temperature}°C{" "}
        <strong>Wind: </strong> {capitalWeather.wind_speed} mph{" "}
        {capitalWeather.wind_dir}
      </p>
      <img width="100" src={capitalWeather.weather_icons} alt="weather" />
    </div>
  );
};

export default Weather;
