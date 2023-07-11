import React from "react";
import { fetchTides, fetchWeather, fetchCombinedWeatherTide } from "@/api/api-utils"
import TideChart from "@/components/TideChart";
import WeatherTable from "@/components/WeatherTable";
import Link from "next/link";
import { Typography } from "@mui/material";

const Home = ({todaysWeather, allWeather }) => {

  return (
    <div>
      <Typography variant="h2" textAlign="center">
        Hello, World
      </Typography>
     <div>
        <h2>Todays Tide Information</h2>
        <>
        <TideChart todaysTides={todaysWeather}/>
        </>
        <h2>The Weather Activity for Today</h2>
        <>
          <WeatherTable weatherData={todaysWeather} />
        </>
        <h2>The Weather Activity for the Coming Week</h2>
        <>
          <WeatherTable weatherData={allWeather} />
        </>
      </div>
    </div>
    
  );
};

export default Home;

export async function getStaticProps() {
  const lat = 52.13909351325254;
  const lng = -7.015760733094569;

  const response = await fetchCombinedWeatherTide();
  // console.log(await fetchWeather(lat, lng));
  const todaysWeather = response.filter((weather) => {

    const today = new Date().toISOString().split("T")[0];
    return weather.date.startsWith(today);
  });

  const allWeather = response;


  return {
    props: {
      todaysWeather,
      allWeather,
    },
    revalidate: 4 * 60 * 60, // Revalidate every 4 hours
  };
}