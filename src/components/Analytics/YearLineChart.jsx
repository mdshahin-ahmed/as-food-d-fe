import { ResponsiveLine } from "@nivo/line";
const data = [
  {
    id: "Expense",
    data: [
      { x: "January", y: 0 },
      { x: "February", y: 187 },
      { x: "March", y: 35 },
      { x: "April", y: 134 },
      { x: "May", y: 150 },
      { x: "June", y: 120 },
      { x: "July", y: 121 },
      { x: "August", y: 133 },
      { x: "September", y: 234 },
      { x: "October", y: 98 },
      { x: "November", y: 198 },
      { x: "December", y: 115 },
    ],
  },
  {
    id: "Income",
    data: [
      { x: "January", y: 0 },
      { x: "February", y: 134 },
      { x: "March", y: 34 },
      { x: "April", y: 14 },
      { x: "May", y: 36 },
      { x: "June", y: 157 },
      { x: "July", y: 47 },
      { x: "August", y: 175 },
      { x: "September", y: 111 },
      { x: "October", y: 100 },
      { x: "November", y: 150 },
      { x: "December", y: 155 },
    ],
  },
];

const YearLineChart = () => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        // max: "auto",
        // stacked: true,
        // reverse: false,
      }}
      enablePointLabel
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Months",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Money Amount",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      colors={["#ff0066", "#33FF57"]}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default YearLineChart;
