import React from 'react';
import { fetchCombinedWeatherTide } from '../api/api-utils';
import TideChart from '../components/TideChart';
import CurrentWeatherContainer from '../components/currentWeather/CurrentWeatherContainer';
import HeatmapChart from '../components/HeatMap';
import ChartTitle from '../components/ChartTitle';

const Page = async () => {
	const { currentDate, todaysWeather } = await getData();

	return (
		<div>
			<ChartTitle title="CURRENT WEATHER" />
			<CurrentWeatherContainer todaysWeather={todaysWeather} currentDate={currentDate} />
			<ChartTitle title="TODAY'S TIDES" />
			<div className="charts-page">
				<TideChart todaysTides={todaysWeather} currentDate={currentDate} />
			</div>
			<ChartTitle title="TIDE BASED ACTIVITY" />
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
