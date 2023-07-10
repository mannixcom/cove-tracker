import React from "react";
import { fetchTides, fetchWeather, fetchCombinedWeatherTide } from "@/api/api-utils"
import TideChart from "@/components/TideChart";
import WeatherTable from "@/components/WeatherTable";


export default function Home({ todaysWeather, allWeather }) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
    </main>
  );
}

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
