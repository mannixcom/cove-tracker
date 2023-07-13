import React from "react";
import { fetchTides, fetchWeather, fetchCombinedWeatherTide } from "@/api/api-utils"
import TideChart from "@/components/TideChart";
import CurrentWeatherContainer from "@/components/currentWeather/CurrentWeatherContainer";
import { Typography, Box } from "@mui/material";


const Home = ({todaysWeather, allWeather, todaysTides }) => {

  return (
    <div>
     <div>
        <>
        <CurrentWeatherContainer todaysTide={todaysTides} todaysWeather={todaysWeather}/>
        </>
        <Box sx={{justifyContent: 'center', display: 'flex', marginTop: 5}}>
        <Typography variant="h4">Todays Tide Information</Typography>
        </Box>
        
        <Box sx={{justifyContent: 'center', display: 'flex'}}>
        <TideChart todaysTides={todaysWeather}/>
        </Box>
       
      </div>
    </div>
    
  );
};

export default Home;

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

  // console.log(todaysWeather)

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