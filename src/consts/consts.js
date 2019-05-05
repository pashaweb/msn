export const configurations = {
  chartOptions: [
    {
      type: "TIME_SERIES_WEEKLY",
      name: "Weekly Breakdown",
      selected: false,
      id: 1
    },
    {
      type: "TIME_SERIES_MONTHLY",
      name: "Monthly Breakdown",
      selected: false,
      id: 2
    }
  ],
  dataFilds: ["open", "high", "low", "close", "volume"],
  apiKey: "QGOQPE3XQXIDBW4W",
  timeRange: { min: 2010, max: 2016 },
  threshold: 40,
  formatDataUrl: (type, apiKey) =>
    `https://www.alphavantage.co/query?function=${type}&symbol=MSFT&apikey=${apiKey}`
};
