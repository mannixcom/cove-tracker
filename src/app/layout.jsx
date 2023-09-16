import React from 'react';
import '../styles/global.css';
import { Inter } from 'next/font/google';
import TitleBox from '../components/TitleBox';
import icon from './icon.png';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Cove Tracker',
	description: 'Plan your cove visits',
};

export default function Layout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div style={{ backgroundColor: '#F7F9F9' }}>
					<div style={{ margin: '0 auto', maxWidth: '90vw' }}>
						<Image src={icon} alt="icon" width={35} height={35} style={{ marginTop: '8px' }} />
						<TitleBox />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
