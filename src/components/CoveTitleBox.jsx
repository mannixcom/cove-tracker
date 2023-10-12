import React from 'react';
import cssModule from './CoveTitleBox.module.scss';

const CoveTitleBox = () => {
	return (
		<div className={cssModule.coveTitleBox}>
			<vertical-bar />
			<content>
				<h1>Portally Cove</h1>
				<h4>{"Today's Tide Tracking"}</h4>
			</content>
		</div>
	);
};

export default CoveTitleBox;
