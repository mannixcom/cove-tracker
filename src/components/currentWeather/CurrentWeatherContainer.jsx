import React from 'react';
import CurrentTide from './CurrentTide';
import CurrentTemp from './CurrentTemp';

const CurrentWeatherContainer = ({ todaysTide, todaysWeather, currentDate }) => {
	return (
		<div style={{ textAlign: 'left' }}>
			<CurrentTemp todaysWeather={todaysWeather} currentDate={currentDate} />
		</div>
	);
};

export default CurrentWeatherContainer;
