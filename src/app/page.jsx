import React from 'react';
import { fetchCombinedWeatherTide } from '../api/api-utils';
import TideChart from '../components/TideChart';
import CurrentWeatherContainer from '../components/currentWeather/CurrentWeatherContainer';
import HeatmapChart from '../components/HeatMap';

const Page = async () => {
	const { currentDate, todaysWeather } = await getData();

	return (
		<div>
			<CurrentWeatherContainer todaysWeather={todaysWeather} currentDate={currentDate} />
			<div style={{ justifyContent: 'left', display: 'flex', marginTop: 5, marginBottom: 1 }}>
				<h4>{"TODAY'S TIDE"}</h4>
			</div>
			<div className="charts-page">
				<TideChart todaysTides={todaysWeather} currentDate={currentDate} />
			</div>
			<div style={{ justifyContent: 'left', marginTop: 5, marginBottom: 1 }}>
				<h4>TIDE BASED ACTIVITY</h4>
			</div>
			<div className="charts-page" style={{ height: '500px' }}>
				<HeatmapChart allWeather={todaysWeather} currentDate={currentDate} />
			</div>
		</div>
	);
};

export default Page;

async function getData() {
	const response = await fetchCombinedWeatherTide();

	const todaysWeather = response.filter((weather) => {
		const today = new Date().toISOString().split('T')[0];
		return weather.date.startsWith(today);
	});

	const currentDate = new Date().toLocaleDateString();
	const allWeather = response;

	return {
		todaysWeather,
		allWeather,
		currentDate,
	};
}
