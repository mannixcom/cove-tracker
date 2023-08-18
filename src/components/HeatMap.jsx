import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material";
import { generateActivityRatings } from "@/api/cove-rating";
import { format } from "date-fns";
import {Box, Typography} from "@mui/material";

const DynamicReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const HeatmapChart = ({ allWeather, currentDate }) => {
  const theme = useTheme();
  const activityRatings = generateActivityRatings(allWeather);
  function formatSeries(series) {
    return series.map(item => {
      if (item.name.length > 8) {
        return { ...item, name: item.name.split(' ') };
      }
      return item;
    });
  }

  const finalData = formatSeries(activityRatings);

  const options = {
    chart: {
      id: 'myHeatmapChart',
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
          const tickDate = new Date(val);
          if (tickDate.toDateString() === new Date(currentDate).toDateString()) {
            return format(tickDate, "HH");
          } else {
            return "";
          }
        },
      },
    },
  };

  return (
 
    <Box className="chart-container" 
    sx={{
        backgroundColor: 'white', 
        borderRadius: '20px',
        '& .apexcharts-yaxis': {
            maxWidth: '60px',
            whiteSpace: 'normal',
            overflowWrap: 'break-word'
          }
        }}>
      <DynamicReactApexChart
        options={options}
        series={finalData}
        type="heatmap"
        height={350}
      />
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
        <Box sx={{ width: '20px', height: '20px', borderRadius: '20px', backgroundColor: '#FCEEBD', marginRight: '10px' }} />
        <Typography>Not Great</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
        <Box sx={{ width: '20px', height: '20px', borderRadius: '20px', backgroundColor: '#F9DD80', marginRight: '10px' }} />
        <Typography>Good</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
        <Box sx={{ width: '20px', height: '20px', borderRadius: '20px', backgroundColor: '#F7CC4F', marginRight: '10px' }} />
        <Typography>Ideal</Typography>
      </Box>
    </Box>
    </Box>


  );
};

export default HeatmapChart;
