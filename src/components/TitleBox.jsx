import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { roboto, prompt } from "@/app/fonts";

const TileBox =() => {

  return(
    <Grid container>
      <Grid 
      item
 
      sx={{
        background:"#0074B7",
        height: '75px',
        width: '10px',
        borderRadius: '20px',
        marginRight: '10px'
      }} 
      ></Grid>
      <Grid 
      item
      >
        <Box>
          <Typography variant="h1">Portally Cove</Typography></Box>
        <Box>
          <Typography variant="subtitle1">Today's Tide Tracking</Typography></Box>
      </Grid>
    </Grid>
  )
}

export default TileBox;