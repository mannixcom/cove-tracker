import React from 'react';
import '../styles/global.css';
import { Inter } from 'next/font/google';
import TitleBox from '../components/TitleBox';
import TopBar from '../components/TopBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cove Tracker',
  description: 'Plan your cove visits',
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 'unset' }}>
        <div style={{ backgroundColor: '#F7F9F9' }}>
          <div style={{ margin: '0 auto', maxWidth: '90vw' }}>
            <TopBar />
            <TitleBox />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
