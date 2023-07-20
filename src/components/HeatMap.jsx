import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material";
import { generateActivityRatings } from "@/api/cove-rating";
import { format } from "date-fns";
import {Box} from "@mui/material";

const DynamicReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const HeatmapChart = ({ allWeather }) => {
  const theme = useTheme();
  const activityRatings = generateActivityRatings(allWeather);

  const options = {
    chart: {
      height: 350,
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [theme.palette.secondary.main],
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val) {
          const currentDate = new Date();
          const tickDate = new Date(val);
          // Check if the tick date is the same as the current date
          if (tickDate.getDate() === currentDate.getDate()) {
            // Format the tick value as time (h a) if it's the current date
            return format(tickDate, "h a");
          } else {
            // Return an empty string for other dates
            return "";
          }
        },
      },
    },
  };

  return (
    <Box className="chart-container" sx={{backgroundColor: 'white', borderRadius: '20px'}}>
      <DynamicReactApexChart
        options={options}
        series={activityRatings}
        type="heatmap"
        height={350}
      />
    </Box>
  );
};

export default HeatmapChart;
