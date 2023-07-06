const apiUtils = require("./api-utils");

jest.mock('./api-utils', () => ({
  fetchTides: jest.fn(),
}));

it('returns the expected data', async () => {
  const mockData = {
    data: [{ height: 2, time: new Date().toISOString(), type: 'high' }],
  };

  apiUtils.fetchTides.mockImplementation(() => Promise.resolve(mockData));

  const lat = 52.13909351325254;
  const lng = -7.015760733094569;

  const result = await apiUtils.fetchTides(lat, lng);
  expect(result).toEqual(mockData);
});

// Test for API error
it('throws an error when the API call fails', async () => {
  const errorMessage = 'API call failed';
  apiUtils.fetchTides.mockImplementation(() => Promise.reject(new Error(errorMessage)));

  const lat = 52.13909351325254;
  const lng = -7.015760733094569;

  await expect(apiUtils.fetchTides(lat, lng)).rejects.toThrow(errorMessage);
});