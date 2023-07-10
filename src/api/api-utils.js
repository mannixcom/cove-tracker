import dayjs from "dayjs";

export async function fetchTides(lat, lng) {
  const start = new Date().toISOString().split("T")[0];
  const response = await fetch(
    `https://www.worldtides.info/api/v3?heights&extremes&date=${start}&lat=${lat}&lon=${lng}&days=7&key=${process.env.WORLDTIDEAPI}`
  );
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  if (!data || typeof data !== "object") {
    throw new Error("API data is not in the expected format");
  }

  return data;
}

export async function fetchWeather(lat, lng) {
  const params = "waveHeight,airTemperature,airTemperature,pressure,cloudCover,precipitation,waveDirection,waveHeight,swellPeriod,waterTemperature,windDirection,windSpeed";
  const response = await fetch(
    `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`,
    {
      headers: {
        Authorization: process.env.TIDEAPI,
      },
    }
  ).then((response) => response.json());

  return response;
}

export async function fetchCombinedWeatherTide() {
  const lat = 52.13909351325254;
  const lng = -7.015760733094569;

  const tideData = await fetchTides(lat, lng);

  function reduceToHour(tidePerHalfHour) {
    const tidePerHour = tidePerHalfHour.reduce((acc, curr, i, src) => {
      if (i % 2 !== 0) {
        let prev = src[i - 1];
        let avgHeight = (prev.height + curr.height) / 2;

        acc.push({
          dt: prev.dt,
          date: dayjs(prev.date).format("YYYY-MM-DDTHH:mmZ[Z]"),
          height: avgHeight,
        });
      }
      return acc;
    }, []);
    return tidePerHour;
  }
  const tidePerHour = reduceToHour(tideData.heights);
  const weatherPerHour = await fetchWeather(lat, lng);

  let tideDataMap = new Map(
    tidePerHour.map((item) => [item.date, item.height])
  );
  let combinedWeather = [];
  for (let weatherItem of weatherPerHour.hours) {
    let weatherTime = dayjs(weatherItem.time).format("YYYY-MM-DDTHH:mmZ[Z]");
    let tideItem = tideDataMap.get(weatherTime);
    if (tideItem) {
      combinedWeather.push({
        date: weatherItem.time,
        tide: tideItem,
        weather: weatherItem,
      });
    }
  }
  return combinedWeather;
}
