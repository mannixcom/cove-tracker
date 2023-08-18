import React from "react";
import { fetchCombinedWeatherTide } from "@/api/api-utils"
import TideChart from "@/components/TideChart";
import CurrentWeatherContainer from "@/components/currentWeather/CurrentWeatherContainer";
import { Typography, Box, Container } from "@mui/material";
import HeatmapChart from "@/components/HeatMap";
import TileBox from "@/components/TitleBox";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';



const Home = ({todaysWeather, currentDate }) => {

  return (
    <Box sx={{backgroundColor: '#F7F9F9'}} >
       <Container >
          <ArrowDropDownCircleIcon fontSize="large" sx={{marginTop: 1}}/>
          <TileBox />
          <CurrentWeatherContainer todaysWeather={todaysWeather} currentDate={currentDate}/>
          <Box sx={{justifyContent: 'left', display: 'flex', marginTop: 5, marginBottom: 1}}>
            <Typography variant="h4">{"TODAY'S TIDE"}</Typography>
          </Box>
          <Box className="charts-page" >
            <TideChart todaysTides={todaysWeather} currentDate={currentDate}/>
          </Box>
          <Box sx={{justifyContent: 'left',  marginTop: 5, marginBottom: 1}}>
            <Typography variant="h4">TIDE BASED ACTIVITY</Typography>
          </Box>
          <Box className="charts-page" style={{height: "500px"}}>
            <HeatmapChart allWeather={todaysWeather} currentDate={currentDate}/>
          </Box>
        </Container>
        </Box>
  );
};

export default Home;

export async function getStaticProps() {

  const mockOrNOt = process.env.USE_MOCK_API ? 'http://localhost:3000/api/weather' :  fetchCombinedWeatherTide();

  const response = await fetch(mockOrNOt).then(response => response.json())

  const todaysWeather = response.filter((weather) => {

    const today = new Date().toISOString().split("T")[0];
    return weather.date.startsWith(today);
  });

  const currentDate = new Date().toLocaleDateString();
  const allWeather = response;

  return {
    props: {
      todaysWeather,
      allWeather,
      currentDate,
    },
    revalidate: 4 * 60 * 60, // Revalidate every 4 hours
  };
}