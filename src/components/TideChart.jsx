'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { getHour } from '../utils/date';

const DynamicReactApexChartTide = dynamic(() => import('react-apexcharts'), {
	ssr: false,
});

const TideChart = ({ todaysTides, currentDate }) => {
	const series = [
		{
			name: 'tide',
			data: todaysTides.map(({ date, tide }) => ({
				x: new Date(date).getTime(),
				y: tide,
			})),
		},
	];

	const minTide = Math.min(...todaysTides.map((tide) => tide.tide)) - 0.2;
	const maxTide = Math.max(...todaysTides.map((tide) => tide.tide)) + 0.2;

	const options = {
		chart: {
			height: 350,
			type: 'area',
			toolbar: {
				show: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		colors: ['#F7CC4F'],
		xaxis: {
			type: 'datetime',
			labels: {
				formatter: function (val) {
					const tickDate = new Date(val);
					if (tickDate.toDateString() === new Date(currentDate).toDateString()) {
						return getHour(tickDate);
					} else {
						return '';
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
				},
			},
		},
		stroke: {
			curve: 'smooth',
		},
	};

	return (
		<div
			className="chart-container"
			style={{
				backgroundColor: 'white',
				height: '100%',
				borderRadius: '20px',
			}}
		>
			<DynamicReactApexChartTide options={options} series={series} type="area" height={350} />
		</div>
	);
};

export default TideChart;
