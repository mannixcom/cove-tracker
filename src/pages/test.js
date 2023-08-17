import React from 'react';
import HeatmapChart from "@/components/HeatMap";
import { fetchTides, fetchCombinedWeatherTide } from '@/api/api-utils';
const test = ({todaysWeather}) => {
    return(
        <HeatmapChart allWeather={todaysWeather}/>

    )
}

export default test

export async function getStaticProps() {
  const lat = 52.13909351325254;
  const lng = -7.015760733094569;
  const tideData = await fetchTides(lat, lng);

  const response = await fetchCombinedWeatherTide();

  const todaysWeather = response.filter((weather) => {

    const today = new Date().toISOString().split("T")[0];
    return weather.date.startsWith(today);
  });

  const todaysTides = tideData.extremes.filter((tide) => {
    const today = new Date().toISOString().split("T")[0];
    return tide.date.startsWith(today)
  })


  const allWeather = response;

  return {
    props: {
      todaysWeather,
      allWeather,
      todaysTides,
    },
    revalidate: 4 * 60 * 60, // Revalidate every 4 hours
  };
}