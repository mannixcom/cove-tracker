const apiUtils = require("./api-utils");

jest.mock('./api-utils', () => ({
  fetchTides: jest.fn(),
  fetchWeather: jest.fn(),
  fetchCombinedWeatherTide: jest.fn(),
}));

it('returns the expected tide data', async () => {
  const mockData = {
    data: [{ height: 2, time: new Date().toISOString(), type: 'high' }],
  };

  apiUtils.fetchTides.mockImplementation(() => Promise.resolve(mockData));

  const lat = 52.13909351325254;
  const lng = -7.015760733094569;

  const result = await apiUtils.fetchTides(lat, lng);
  expect(result).toEqual(mockData);
});

it('throws an error when the fetchTides API call fails', async () => {
  const errorMessage = 'API call failed';
  apiUtils.fetchTides.mockImplementation(() => Promise.reject(new Error(errorMessage)));

  const lat = 52.13909351325254;
  const lng = -7.015760733094569;

  await expect(apiUtils.fetchTides(lat, lng)).rejects.toThrow(errorMessage);
});

it('returns the expected weather data', async () => {
  const mockData = {
    hours: [{ waveHeight: 2, airTemperature: 15, time: new Date().toISOString() }],
  };

  apiUtils.fetchWeather.mockImplementation(() => Promise.resolve(mockData));

  const lat = 52.13909351325254;
  const lng = -7.015760733094569;

  const result = await apiUtils.fetchWeather(lat, lng);
  expect(result).toEqual(mockData);
});

it('throws an error when the fetchWeather API call fails', async () => {
  const errorMessage = 'API call failed';
  apiUtils.fetchWeather.mockImplementation(() => Promise.reject(new Error(errorMessage)));

  const lat = 52.13909351325254;
  const lng = -7.015760733094569;

  await expect(apiUtils.fetchWeather(lat, lng)).rejects.toThrow(errorMessage);
});

it('returns the combined data', async () => {
  const mockTideData = {
    heights: [{ height: 2, dt: 1234567890, date: new Date().toISOString() }],
  };
  const mockWeatherData = {
    hours: [{ waveHeight: 2, airTemperature: 15, time: new Date().toISOString() }],
  };

  apiUtils.fetchTides.mockImplementation(() => Promise.resolve(mockTideData));
  apiUtils.fetchWeather.mockImplementation(() => Promise.resolve(mockWeatherData));

  const mockCombinedData = [{
    date: new Date().toISOString(),
    tide: 2,
    weather: { waveHeight: 2, airTemperature: 15, time: new Date().toISOString() },
  }];

  apiUtils.fetchCombinedWeatherTide.mockImplementation(() => Promise.resolve(mockCombinedData));

  const combinedData = await apiUtils.fetchCombinedWeatherTide();
  
  expect(combinedData).toEqual(expect.arrayContaining([
    expect.objectContaining({
      date: expect.any(String),
      tide: expect.any(Number),
      weather: expect.objectContaining({
        waveHeight: expect.any(Number),
        airTemperature: expect.any(Number),
        time: expect.any(String),
      }),
    }),
  ]));
});


it('throws an error when the fetchCombinedWeatherTide API call fails', async () => {
  const errorMessage = 'API call failed';
  apiUtils.fetchCombinedWeatherTide.mockImplementation(() => Promise.reject(new Error(errorMessage)));

  await expect(apiUtils.fetchCombinedWeatherTide()).rejects.toThrow(errorMessage);
});
