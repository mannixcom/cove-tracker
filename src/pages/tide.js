import React from "react";
import { format } from "date-fns";

export default function Home({ todaysTides, currentTide, currentWeather }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2>Tide Information</h2>
        {todaysTides.map((tide, index) => (
          <p key={index}>
            Height: {tide.height}, Time:{" "}
            {format(new Date(tide.time), "h:mm:ss a")}, Type: {tide.type}
          </p>
        ))}
        {currentTide && (
          <div>
            <h3>Current Tide</h3>
            <p>
              Height: {currentTide.height}, Time:{" "}
              {format(new Date(currentTide.time), "h:mm:ss a")}, Type:{" "}
              {currentTide.type}
            </p>
          </div>
        )}
        {currentWeather && (
          <div>
            <h3>Current Weather at {format(new Date(currentWeather.time), "h:mm:ss a")}</h3>
            <ul>
              <li>Air Temperature: {currentWeather.airTemperature.dwd}</li>
              <li>Cloud Cover: {currentWeather.cloudCover.dwd}</li>
              <li>Precipitation:{currentWeather.precipitation.dwd}</li>
              <li>Swell Height: {currentWeather.swellHeight.dwd}</li>
              <li>Water Temperature: {currentWeather.waterTemperature.meto}</li>
              <li>Wave Height: {currentWeather.waveHeight.dwd}</li>
              <li>Wind Direction: {currentWeather.windDirection.icon}</li>
              <li>Wind Speed: {currentWeather.windSpeed.icon}</li>
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const lat = 52.13909351325254;
  const lng = -7.015760733094569;
  const start = new Date().toISOString();
  let end = new Date();
  end.setDate(end.getDate() + 1);
  end = end.toISOString();

  const response = await fetch(
    `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=${start}&end=${end}`,
    {
      headers: {
        Authorization: process.env.TIDEAPI,
      },
    }
  );
  const params = 'waveHeight,airTemperature,cloudCover,windSpeed,precipitation,swellHeight,waterTemperature,windDirection';
  const weatherResponse = await fetch(
   
    `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${start}&end=${end}`,
    {
      headers: {
        Authorization: process.env.TIDEAPI,
      },
    }
  );
  const weatherData = await weatherResponse.json();

  const data = await response.json();
  const todaysTides = data.data.filter((tide) => {
    // Modify this to match your timezone and formatting requirements
    const today = new Date().toISOString().split("T")[0];
    return tide.time.startsWith(today);
  });
  const currentTide = todaysTides.find((tide) => {
    const tideTime = new Date(tide.time).getTime();
    return tideTime > Date.now();
  });

  const currentWeather = weatherData.hours.find((weather) => {
    const weatherTime = new Date(weather.time).getTime();
    return weatherTime > Date.now()
  })

  return {
    props: {
      todaysTides,
      currentTide,
      currentWeather
    },
    revalidate: 4 * 60 * 60, // Revalidate every 4 hours
  };
}
