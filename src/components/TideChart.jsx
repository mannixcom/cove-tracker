import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import format from "date-fns/format";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

const customTickFormatter = (tick) => {
  const currentDate = new Date();
  const tickDate = new Date(tick);

  // Check if the tick date is the same as the current date
  if (tickDate.getDate() === currentDate.getDate()) {
    // Format the tick value as time (h a) if it's the current date
    return format(tickDate, "h a");
  } else {
    // Return an empty string for other dates
    return "";
  }
};
const CustomizedAxisTick = ({ x, y, payload, vertical }) => {
  const tickDate = new Date(payload.value);
  const formattedTick = format(tickDate, "h a");
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform={vertical ? "rotate(-90)" : ""}
      >
        {formattedTick}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const tickDate = new Date(payload[0].payload.date);
    const formattedTick = format(tickDate, "h a");

    return (
      <Box className="custom-tooltip">
        <Typography className="label">{`Time: ${formattedTick}`}{`  Tide: ${payload[0].value}`}</Typography>
      </Box>
    );
  }

  return null;
};


const TideChart = ({ todaysTides }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: "40px 0",
        height: { xs: '50vh', sm: '60vh', md: '70vh' },
        width:{xs: '95vw'}
      }}
    >
 
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={todaysTides}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={customTickFormatter} tick={<CustomizedAxisTick vertical={!matches} />}  />
            {matches && <YAxis />}
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="tide"
              stroke={theme.palette.secondary.main}
              fill={theme.palette.secondary.main}
            />
          </AreaChart>
        </ResponsiveContainer>

    </Box>
  );
};

export default TideChart;
