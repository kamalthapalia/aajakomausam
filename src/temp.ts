const data = {
  city: "New York",
  country: "United States",
  current_conditions: {
    temperature: 20,
    humidity: 75,
    wind_speed: 15,
    wind_direction: "NW",
    description: "Cloudy with occasional showers",
  },
  forecast: [
    {
      date: "2023-05-01",
      temperature: {
        low: 18,
        high: 22,
      },
      description: "Showers",
    },
    {
      date: "2023-05-02",
      temperature: {
        low: 16,
        high: 20,
      },
      description: "Partly cloudy",
    },
    {
      date: "2023-05-03",
      temperature: {
        low: 15,
        high: 19,
      },
      description: "Sunny",
    },
  ],
};

export default data;
