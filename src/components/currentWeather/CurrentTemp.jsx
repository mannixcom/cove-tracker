import React from "react";

const CurrentTemp = ({ todaysWeather, currentDate }) => {
  const closest = (todaysWeather, currentDate) => {
    const now = new Date(currentDate);
    return todaysWeather.reduce((closest, current) => {
      const currentDiff = Math.abs(new Date(current.date) - now);
      const closestDiff = Math.abs(new Date(closest.date) - now);
      return currentDiff < closestDiff ? current : closest;
    }, todaysWeather[0]);
  };

  const closestWeather = closest(todaysWeather, currentDate);

  return (
    <div
      style={{
        maxWidth: "400px",
        border: "1px  solid #e0e0e0",
        padding: "1rem",
        overflowX: "auto",
      }}
    >
      <table
        aria-label="simple table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr>
            <th>Air Temperature</th>
            <td>{closestWeather?.weather.airTemperature.sg} C</td>
          </tr>
          <tr>
            <th>Water Temperature</th>
            <td>{closestWeather?.weather.waterTemperature.sg} C</td>
          </tr>
          <tr>
            <th>Cloud Cover</th>
            <td>{closestWeather?.weather.cloudCover.sg} %</td>
          </tr>
          <tr>
            <th>Wave Height</th>
            <td>{closestWeather?.weather.waveHeight.sg} M</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CurrentTemp;
