export async function fetchTides(lat, lng) {
  const start = new Date().toISOString().split("T")[0];
  const response = await fetch(
    `https://www.worldtides.info/api/v3?heights&extremes&date=${start}&lat=${lat}&lon=${lng}&days=7&key=${process.env.WORLDTIDEAPI}` 
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






