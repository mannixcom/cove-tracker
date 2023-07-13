import React from "react";
import { Box, Typography } from "@mui/material";

const CurrentTide = ({todaysTide}) => {
  const getTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return(
  <Box sx={{textAlign: "center"}}>
     <Typography variant="h3">Tides Today</Typography>
    {todaysTide.map((tide, i) => (
      <Box key={i} >
      <Typography variant="h4">{getTime(tide.date)} {tide.type} Tide</Typography>
      </Box>
    ))}
  </Box>
  )};

  export default CurrentTide; 