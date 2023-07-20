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
          if (tickDate.getDate() === currentDate.getDate()) {
            return format(tickDate, "HH");
          } else {
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
    className="chart-container"
      sx={{
        backgroundColor: theme.palette.background.paper,
        // padding: "40px 0",
        height: '100%',
        width:{xs: '90vw'},
        borderRadius: '20px'
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
