import React from "react";
import { format } from "date-fns";
import { fetchTides } from "@/api/api-utils";

export default function Home({ todaysTides, currentTide }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2>Tide Information</h2>
        {todaysTides.map((tide, index) => (
          <p key={index}>
            Height: {tide.height}, Time:{" "}
            {format(new Date(tide.time), "h:mm:ss a")}, Type: {tide.type}
          </p>
        ))}
        {currentTide && (
          <div>
            <h3>Current Tide</h3>
            <p>
              Height: {currentTide.height}, Time:{" "}
              {format(new Date(currentTide.time), "h:mm:ss a")}, Type:{" "}
              {currentTide.type}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const lat = 52.13909351325254;
  const lng = -7.015760733094569;
  const start = new Date().toISOString();
  let end = new Date();
  end.setDate(end.getDate() + 1);
  end = end.toISOString();

  const response = await fetchTides(lat, lng, start, end)

  const todaysTides = response.data.filter((tide) => {
    // Modify this to match your timezone and formatting requirements
    const today = new Date().toISOString().split("T")[0];
    return tide.time.startsWith(today);
  });
  const currentTide = todaysTides.find((tide) => {
    const tideTime = new Date(tide.time).getTime();
    return tideTime > Date.now();
  });


  return {
    props: {
      todaysTides,
      currentTide,
    },
    revalidate: 4 * 60 * 60, // Revalidate every 4 hours
  };
}
