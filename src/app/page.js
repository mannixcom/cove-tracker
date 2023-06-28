import Link from 'next/link';
import React from 'react'

export default function Home() { 
const latitude = 52.13909351325254;
const longitude = -7.015760733094569;
const apiKey = process.env.GMAPAPI;
const googleMapsUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${latitude},${longitude}&zoom=16`;

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
        frameborder="0" 
        style={{border: 0}} 
        src={googleMapsUrl} 
        allowfullscreen=""
        loading="lazy"
      />
    </div>
  </main>
);
}
