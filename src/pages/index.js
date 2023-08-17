import React from "react";
import { fetchTides, fetchWeather, fetchCombinedWeatherTide } from "@/api/api-utils"
import TideChart from "@/components/TideChart";
import CurrentWeatherContainer from "@/components/currentWeather/CurrentWeatherContainer";
import { Typography, Box, Container } from "@mui/material";
import HeatmapChart from "@/components/HeatMap";
import TileBox from "@/components/TitleBox";
import { generateActivityRatings } from "@/api/cove-rating";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';


const Home = ({todaysWeather, allWeather, todaysTides, data }) => {

  return (
    <Box sx={{backgroundColor: '#F7F9F9'}} >
       <Container >
          <ArrowDropDownCircleIcon fontSize="large" sx={{marginTop: 1}}/>
          <TileBox />
          <CurrentWeatherContainer todaysTide={todaysTides} todaysWeather={todaysWeather} />
          <Box sx={{justifyContent: 'left', display: 'flex', marginTop: 5, marginBottom: 1}}>
            <Typography variant="h4">{"TODAY'S TIDE"}</Typography>
          </Box>
          <Box className="charts-page" >
            <TideChart todaysTides={todaysWeather}/>
          </Box>
          <Box sx={{justifyContent: 'left',  marginTop: 5, marginBottom: 1}}>
            <Typography variant="h4">TIDE BASED ACTIVITY</Typography>
          </Box>
          {/* <Box className="charts-page" style={{height: "500px"}}>
            <HeatmapChart allWeather={todaysWeather}/>
          </Box> */}
        </Container>
        </Box>
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