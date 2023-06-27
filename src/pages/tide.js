import React from 'react'

export default function Home({ data }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Mannix cove test news</div>
      <div>{JSON.stringify(data)}</div>
    </main>
  )
}

export async function getStaticProps() {
  const lat = 60.936;
  const lng = 5.114;

  const response = await fetch(
    `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=2023-06-20&end=2023-06-27`,
    {
      headers: {
        Authorization: process.env.TIDEAPI,
      },
    }
  )

  const data = await response.json()

  return {
    props: {
      data,
    },
    revalidate: 4 * 60 * 60, // Revalidate every 4 hours
  }
}