import React from "react";
import CurrentTide from "./CurrentTide";
import CurrentTemp from "./CurrentTemp";
import { Box } from "@mui/material";
const CurrentWeatherContainer = ({ todaysTide, todaysWeather }) => {
  return (
    <>
      <Box sx={{ marginTop: 5}}>
        <CurrentTide todaysTide={todaysTide} />
      </Box>

      <Box sx={{ marginTop: 5}}>
        <CurrentTemp todaysWeather={todaysWeather} />
      </Box>
    </>
  );
};

export default CurrentWeatherContainer;
