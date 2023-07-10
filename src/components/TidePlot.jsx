import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const TidePlot = ({allTides}) => {
  const processedData = allTides.map(d => {
    const dateObj = new Date(d.date);
    const decimalTime = dateObj.getHours() + dateObj.getMinutes() / 60;
    return {
      time: decimalTime,
      dayIndex: dateObj.getDay(), 
      date: daysOfWeek[dateObj.getDay()],
      height: d.tide,
      size: Math.abs(d.tide * 10),
    }
  });

  return (
    <ScatterChart
      width={800}
      height={500}
      margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
    >
      <CartesianGrid />
      <XAxis dataKey="time" name="time" tick={{ fontSize: 10 }} type="number" domain={['dataMin', 'dataMax']} />
      <YAxis 
        dataKey="dayIndex" 
        name="day" 
        type="number" 
        tickFormatter={(tickItem) => daysOfWeek[tickItem]}
        domain={[0, 6]}
      />
      <ZAxis dataKey="size" range={[10, 200]} />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Legend />
      <Scatter name="Tide height" data={processedData} fill="#8884d8" />
    </ScatterChart>
  );
}

export default TidePlot;

