import React from 'react'
import { format } from 'date-fns';

export default function Home({ todaysTides, currentTide }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <h2>Tide Information</h2>
      {todaysTides.map((tide, index) => (
        <p key={index}>
          Height: {tide.height}, Time: {format(new Date(tide.time), 'h:mm:ss a')}, Type: {tide.type}
        </p>
      ))}
      {currentTide && (
        <div>
          <h3>Current Tide</h3>
          <p>
            Height: {currentTide.height}, Time: {format(new Date(currentTide.time),'h:mm:ss a')}, Type: {currentTide.type}
          </p>
        </div>
      )}
    </div>
    </main>
  )
}

export async function getStaticProps() {

  const lat = 52.13909351325254;
  const lng = -7.015760733094569;

  const response = await fetch(
    `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=2023-06-20&end=2023-06-29`,
    {
      headers: {
        Authorization: process.env.TIDEAPI,
      },
    }
  )

  const data = await response.json()
  const todaysTides = data.data.filter(tide => {
    // Modify this to match your timezone and formatting requirements
    const today = new Date().toISOString().split('T')[0];
    return tide.time.startsWith(today);
  });
  const currentTide = todaysTides.find(tide => {
    const tideTime = new Date(tide.time).getTime();
    return tideTime > Date.now();
  });
  console.log(currentTide);
  // const today = new Date().toISOString().split('T')[0];
  // console.log(today)


  return {
    props: {
      todaysTides,
      currentTide
    },
    revalidate: 4 * 60 * 60, // Revalidate every 4 hours
  }
}