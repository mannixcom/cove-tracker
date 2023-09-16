import { env } from 'process';
import { today } from '../utils/date';

const revalidate = 60 * 60 * 4; // 4 hours

export async function fetchTides(lat, lng) {
	const start = today;
	const response = await fetch(
		`${env.TIDE_API_BASE}?heights&extremes&date=${start}&lat=${lat}&lon=${lng}&days=7&key=${env.TIDE_API_KEY}`,
		{ next: revalidate }
	);

	if (!response.ok) {
		const message = `An error has occured: ${response.status}`;
		throw new Error(message);
	}

	const data = await response.json();
	if (!data || typeof data !== 'object') {
		throw new Error('API data is not in the expected format');
	}

	return data;
}

export async function fetchWeather(lat, lng) {
	const params =
		'waveHeight,airTemperature,airTemperature,pressure,cloudCover,precipitation,waveDirection,waveHeight,swellPeriod,waterTemperature,windDirection,windSpeed';
	const response = await fetch(`${env.WEATHER_API_BASE}?lat=${lat}&lng=${lng}&params=${params}`, {
		headers: {
			Authorization: env.WEATHER_API_KEY,
		},
		next: revalidate,
	}).then((response) => response.json());

	return response;
}

export async function fetchCombinedWeatherTide() {
	const lat = 52.13909351325254;
	const lng = -7.015760733094569;

	const tideData = await fetchTides(lat, lng);

	function reduceToHour(tidePerHalfHour) {
		const tidePerHour = tidePerHalfHour.filter((_, i) => i % 2 === 0);
		return tidePerHour;
	}
	const tidePerHour = reduceToHour(tideData.heights);
	const weatherPerHour = await fetchWeather(lat, lng);

	let tideDataMap = new Map(tidePerHour.map((item) => [item.date, item.height]));

	let combinedWeather = [];
	for (let weatherItem of weatherPerHour.hours) {
		let tideItem = tideDataMap.get(weatherItem.time);
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
