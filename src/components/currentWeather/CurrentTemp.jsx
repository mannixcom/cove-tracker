import { Typography, Box } from "@mui/material";
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const CurrentTemp = ({todaysWeather}) => {

  const closest = (todaysWeather) => { 
    const now = new Date();
    return todaysWeather.reduce((closest, current) => {
      const currentDiff = Math.abs(new Date(current.date) - now);
      const closestDiff = Math.abs(new Date(closest.date) - now);
      return currentDiff < closestDiff ? current : closest;
    }, todaysWeather[0])}

    const closestWeather = closest(todaysWeather)
  return(
    <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
    <Table  aria-label="simple table">
      <TableBody>
          <TableRow >
          <TableCell component="th" scope="row">
            <Typography variant="h3"  sx={{ fontWeight: 'bold' }}>
              Air Temperature
              </Typography>
            </TableCell>
            <TableCell align="right"><Typography  variant="h3"> {closestWeather.weather.airTemperature.sg} C</Typography></TableCell>
            </TableRow>
            <TableRow> 
            <TableCell component="th" scope="row">
            <Typography variant="h3"  sx={{ fontWeight: 'bold' }}>
              Water Temperature
              </Typography>
            </TableCell>
            <TableCell align="right"><Typography  variant="h3">{closestWeather.weather.waterTemperature.sg} C</Typography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row">
            <Typography variant="h3"  sx={{ fontWeight: 'bold' }}>
              Cloud Cover
              </Typography>
            </TableCell>
            <TableCell align="right"><Typography  variant="h3">{closestWeather.weather.cloudCover.sg} %</Typography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row">
            <Typography variant="h3"  sx={{ fontWeight: 'bold' }}>
              Wave Height
              </Typography>
            </TableCell>
            <TableCell align="right"><Typography variant="h3"> {closestWeather.weather.waveHeight.sg} M</Typography></TableCell>
            </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  
  )
};

export default CurrentTemp


