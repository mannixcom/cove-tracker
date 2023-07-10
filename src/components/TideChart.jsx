import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import format from 'date-fns/format';

const customTickFormatter = (tick) => {
  const currentDate = new Date();
  const tickDate = new Date(tick);

  // Check if the tick date is the same as the current date
  if (tickDate.getDate() === currentDate.getDate()) {
    // Format the tick value as time (HH:mm) if it's the current date
    return format(tickDate, 'HH:mm');
  } else {
    // Return an empty string for other dates
    return '';
  }
};

const TideChart = ({ todaysTides }) => {
  return (
    <AreaChart width={600} height={400} data={todaysTides}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tickFormatter={customTickFormatter} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="tide" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

export default TideChart;