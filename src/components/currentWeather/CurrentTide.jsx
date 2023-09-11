import React from "react";

const CurrentTide = ({ todaysTide }) => {
  const getTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div>
      <h3>Tides Today</h3>
      {todaysTide.map((tide, i) => (
        <div key={i}>
          <h4>
            {getTime(tide.date)} {tide.type} Tide
          </h4>
        </div>
      ))}
    </div>
  );
};

export default CurrentTide;
