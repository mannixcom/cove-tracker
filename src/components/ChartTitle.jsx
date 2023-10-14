import React from 'react';
import cssModule from './ChartTitle.module.scss';

const ChartTitle = ({ title }) => {
	return (
		<div className={cssModule.chartTitle}>
			<h3>{title}</h3>
		</div>
	);
};

export default ChartTitle;
