import React from "react";
import CurrentTide from "./CurrentTide";
import CurrentTemp from "./CurrentTemp";

const CurrentWeatherContainer = ({ todaysTide, todaysWeather, currentDate }) => {
  return (
    <>
      <div>
        <h4>CURRENT WEATHER</h4>
        <CurrentTemp todaysWeather={todaysWeather} currentDate={currentDate}/>
      </div>
    </>
  );
};

export default CurrentWeatherContainer;
