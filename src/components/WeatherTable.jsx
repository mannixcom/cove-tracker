import React from 'react';
import { format } from 'date-fns';

const WeatherTable = ({ weatherData }) => {
  return (
    <table className='weather-table' cellPadding={4}>
      <thead>
        <tr>
          <th>Date & Time</th>
          <th>Tide</th>
          <th>Air Temperature (SG)</th>
          <th>Cloud Cover (SG)</th>
          <th>Precipitation (SG)</th>
          <th>Pressure (SG)</th>
          <th>Pressure (SG)</th>
          <th>Swell Period (SG)</th>
          <th>Swell Period (SG)</th>
          <th>Water Temperature (SG)</th>
          <th>Wave Direction (SG)</th>
          <th>Wave Height (sg)</th>
          <th>Wave Height (SG)</th>
          <th>Wind Direction (SG)</th>
          <th>Wind Speed (SG)</th>
        </tr>
      </thead>
      <tbody>
        {weatherData.map((data, i) => (
          <tr key={i}>
            <td>{format(new Date(data.date), "MMM dd, yyyy HH:mm")}</td>
            <td>{data.tide}</td>
            <td>{data.weather.airTemperature.sg}</td>
            <td>{data.weather.cloudCover.sg}</td>
            <td>{data.weather.precipitation.sg}</td>
            <td>{data.weather.precipitation.sg}</td>
            <td>{data.weather.pressure.sg}</td>
            <td>{data.weather.swellPeriod.sg}</td>
            <td>{data.weather.swellPeriod.sg}</td>
            <td>{data.weather.waterTemperature.sg}</td>
            <td>{data.weather.waveDirection.sg}</td>
            <td>{data.weather.waveHeight.sg}</td>
            <td>{data.weather.waveHeight.sg}</td>
            <td>{data.weather.windDirection.sg}</td>
            <td>{data.weather.windSpeed.sg}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default WeatherTable;
