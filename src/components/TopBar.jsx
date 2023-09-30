import React from 'react';
import Image from 'next/image';
import icon from '../app/icon.png';
import cssModule from './TopBar.module.scss';

const TopBar = () => {
	return (
		<header className={cssModule.topbar}>
			<Image src={icon} alt="icon" width={35} height={35} />
			<h1>COVE TRACKER</h1>
			<h2>Your local coves, at your fingertips</h2>
		</header>
	);
};

export default TopBar;
