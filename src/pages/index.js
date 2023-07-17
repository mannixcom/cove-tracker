import React from "react";
import { fetchTides, fetchWeather, fetchCombinedWeatherTide } from "@/api/api-utils"
import TideChart from "@/components/TideChart";
import CurrentWeatherContainer from "@/components/currentWeather/CurrentWeatherContainer";
import { Typography, Box } from "@mui/material";
import BarChart from "@/components/VegaExample";
import Image from "next/image";
import dynamic from "next/dynamic";
import HeatmapChart from "@/components/HeatMap";
// const HeatmapComponent = dynamic(() => import('../components/HeatMap'),
// { ssr: false }
// )


const Home = ({todaysWeather, allWeather, todaysTides, data }) => {

  return (
    <div>
     <div style={{ 
      position: 'relative',
      height: '100vh', 
      width: '100%',
      '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0, 1)', // Adjust opacity as needed
        zIndex: 2
      }
      }}>
      {/* <Image 
      objectFit="cover"
      layout="fill"
      src="/images/portally2.jpg"
      alt="background image"
      style={{ position: 'absolute', zIndex: 1 }}
      /> */}
       <div style={{ position: 'relative', zIndex: 3 }}>
          <CurrentWeatherContainer todaysTide={todaysTides} todaysWeather={todaysWeather} />
          <Box sx={{justifyContent: 'center', display: 'flex', marginTop: 5}}>
            <Typography variant="h4">Todays Tide</Typography>
          </Box>
          <Box sx={{justifyContent: 'center', display: 'flex'}}>
            <TideChart todaysTides={todaysWeather}/>
          </Box>
          <Box className="mannix" style={{height: "500px"}}>
            <HeatmapChart allWeather={todaysWeather}/>
          </Box>
        </div>
       
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