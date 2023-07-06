import React from "react";
import { fetchTides } from "@/api/api-utils"
import TideChart from "@/components/TideChart";

export default function Home({ todaysTides }) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2>Todays Tide Information</h2>
        <TideChart todaysTides={todaysTides}/>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const lat = 52.13909351325254;
  const lng = -7.015760733094569;

  const response = await fetchTides(lat, lng)

  const todaysTides = response.heights.filter((tide) => {
    // Modify this to match your timezone and formatting requirementsx
    const today = new Date().toISOString().split("T")[0];
    return tide.date.startsWith(today);
  });

  return {
    props: {
      todaysTides,
    },
    revalidate: 12 * 60 * 60, // Revalidate every 12 hours
  };
}
