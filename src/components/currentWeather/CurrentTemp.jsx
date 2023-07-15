import { Typography, Box } from "@mui/material";
import React from "react";

const CurrentTemp = ({todaysWeather}) => {

  const closest = (todaysWeather) => { 
    const now = new Date();
    return todaysWeather.reduce((closest, current) => {
      const currentDiff = Math.abs(new Date(current.date) - now);
      const closestDiff = Math.abs(new Date(closest.date) - now);
      return currentDiff < closestDiff ? current : closest;
    }, todaysWeather[0])}

    const closestWeather = closest(todaysWeather)
    console.log(closestWeather)
  return(
    <Box sx={{textAlign: "center"}}>
      <Typography variant="h3" color='primary'>Weather Right Now</Typography>
      <Typography color='secondary'>Air Temp {closestWeather.weather.airTemperature.sg} C</Typography>
      <Typography color='secondary'>Water Temp {closestWeather.weather.waterTemperature.sg} C</Typography>
      <Typography color='secondary'>Cloud Cover {closestWeather.weather.cloudCover.sg} %</Typography>
      <Typography color='secondary'>Wave Height {closestWeather.weather.waveHeight.sg} M</Typography>


    </Box>
  )
};

export default CurrentTemp
