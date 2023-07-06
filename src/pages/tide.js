import React from "react";
import { fetchTides } from "@/api/api-utils"
import TideChart from "@/components/TideChart";
import TidePlot from "@/components/TidePlot";

export default function Home({ todaysTides, allTides }) {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2>Todays Tide Information</h2>
        <>
        <TideChart todaysTides={todaysTides}/>
        </>
        <h2>The Tide Activity for the Coming Week</h2>
        <>
        <TidePlot allTides={allTides}/>
        </>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const lat = 52.13909351325254;
  const lng = -7.015760733094569;

  const response = await fetchTides(lat, lng)

  const todaysTides = response.heights.filter((tide) => {

    const today = new Date().toISOString().split("T")[0];
    return tide.date.startsWith(today);
  });

  const allTides = response.heights
  // console.log(allTides)

  return {
    props: {
      todaysTides,
      allTides,
    },
    revalidate: 12 * 60 * 60, // Revalidate every 12 hours
  };
}
