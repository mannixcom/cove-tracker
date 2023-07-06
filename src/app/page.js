import Link from 'next/link';
import React from 'react'

export default function Home() { 
const latitude = 52.13909351325254;
const longitude = -7.015760733094569;
const apiKey = process.env.GMAPAPI;
const googleMapsUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01}%2C${latitude-0.01}%2C${longitude+0.01}%2C${latitude+0.01}&layer=mapnik&marker=${latitude}%2C${longitude}`;

return (
  <main className="flex min-h-screen flex-col items-center p-24">
    <div>
      <h2>Portally Cove Report</h2>
      <Link 
      href='tide'
      style={{
        textDecoration: 'underline'
      }}
      >
        Weather and Tide Data</Link>
      </div>
    <div className="mt-10">
      <iframe 
        width="600" 
        height="450" 
        frameBorder="0" 
        style={{border: 0}} 
        src={googleMapsUrl} 
        allowfullscreen=""
        loading="lazy"
      />
    </div>
  </main>
);
}
