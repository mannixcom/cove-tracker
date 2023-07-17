import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material';
import format from 'date-fns/format';
import { Box } from "@mui/material";

const DynamicReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const TideChart = ({ todaysTides }) => {
  const theme = useTheme();

  const series = [{
    name: 'tide',
    data: todaysTides.map(({ date, tide }) => ({
      x: new Date(date).getTime(),
      y: tide,
    })),
  }];

  const minTide = Math.min(...todaysTides.map(tide => tide.tide)) - 0.2;
  const maxTide = Math.max(...todaysTides.map(tide => tide.tide)) + 0.2;

  const options = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: [theme.palette.secondary.main],
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function(val) {
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
    yaxis: {
      min: minTide,
      max: maxTide,
      labels: {
        formatter: function (val) {
          return val.toFixed(1);
        }
      }
    },
    stroke: {
      curve: 'smooth'
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: "40px 0",
        height: { xs: '50vh', sm: '60vh', md: '70vh' },
        width:{xs: '95vw'}
      }}
    >
      <DynamicReactApexChart 
        options={options} 
        series={series} 
        type="area" 
        height={350} 
      />
    </Box>
  );
}

export default TideChart;
