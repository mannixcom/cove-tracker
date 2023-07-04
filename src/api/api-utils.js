export async function fetchTides(lat, lng, start, end) {
  const response = await fetch(
    `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=${start}&end=${end}`,
    {
      headers: {
        Authorization: process.env.TIDEAPI,
      },
    }
  );
  if(!response.ok){
    const message = `An error has occured: ${response.status}`
    throw new Error(message);
  }

  const data = await response.json();
  if (!data || typeof data !== 'object') {
    throw new Error('API data is not in the expected format');
  }

  return data;
}






