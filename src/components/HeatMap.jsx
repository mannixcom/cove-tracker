import React from "react";
import dynamic from "next/dynamic";
import { generateActivityRatings } from "@/api/cove-rating";
import { format } from "date-fns";

const DynamicReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const HeatmapChart = ({ allWeather, currentDate }) => {
  const activityRatings = generateActivityRatings(allWeather);
  function formatSeries(series) {
    return series.map((item) => {
      if (item.name.length > 8) {
        return { ...item, name: item.name.split(" ") };
      }
      return item;
    });
  }

  const finalData = formatSeries(activityRatings);

  const options = {
    chart: {
      id: "myHeatmapChart",
      height: 350,
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#F7CC4F"],
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val) {
          const tickDate = new Date(val);
          if (
            tickDate.toDateString() === new Date(currentDate).toDateString()
          ) {
            return format(tickDate, "HH");
          } else {
            return "";
          }
        },
      },
    },
  };

  return (
    <div className="heatmap-container">
      <DynamicReactApexChart
        options={options}
        series={finalData}
        type="heatmap"
        height={350}
      />
      <div className="heatmap-legend-box">
        <div className="heatmap-legend-item">
          <div
            className="heatmap-legend-circle"
            style={{
              backgroundColor: "#FCEEBD",
            }}
          ></div>
          <h4>Not Great</h4>
        </div>
        <div className="heatmap-legend-item">
          <div
            className="heatmap-legend-circle"
            style={{
              backgroundColor: "#F9DD80",
            }}
          ></div>
          <h4>Good</h4>
        </div>
        <div className="heatmap-legend-item">
          <div
            className="heatmap-legend-circle"
            style={{
              backgroundColor: "#F7CC4F",
            }}
          ></div>
          <h4>Ideal</h4>
        </div>
      </div>
    </div>
  );
};

export default HeatmapChart;
