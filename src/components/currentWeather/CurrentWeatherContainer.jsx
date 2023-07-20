import React from "react";
import CurrentTide from "./CurrentTide";
import CurrentTemp from "./CurrentTemp";
import { Box, Typography } from "@mui/material";
const CurrentWeatherContainer = ({ todaysTide, todaysWeather }) => {
  return (
    <>
      <Box sx={{ marginTop: 2}}>
        <Typography variant="h4" sx={{marginBottom: 1}}>CURRENT WEATHER</Typography>
        <CurrentTemp todaysWeather={todaysWeather} />
      </Box>
    </>
  );
};

export default CurrentWeatherContainer;
