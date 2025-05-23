import { ResponsiveLine } from "@nivo/line";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "../../hooks/pure/useClient";
// const data1 = [
//   {
//     id: "Expense",
//     data: [
//       { x: "27-12-2024", y: 0 },
//       { x: "28-12-2024", y: 187 },
//       { x: "31-12-2024", y: 35 },
//       { x: "01-01-2025", y: 14 },
//     ],
//   },
//   {
//     id: "Income",
//     data: [
//       { x: "27-12-2024", y: 0 },
//       { x: "28-12-2024", y: 0 },
//       { x: "31-12-2024", y: 34 },
//       { x: "01-01-2025", y: 14 },
//     ],
//   },
// ];

const MonthLineChart = () => {
  const client = useClient();

  const { data = [] } = useQuery({
    queryKey: ["analytics-monthly"],
    queryFn: () => client(`analytics/monthly`),
  });
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 80, left: 70 }}
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
        tickRotation: -30,
        legend: "Days",
        legendOffset: 55,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Money Amount",
        legendOffset: -50,
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
      colors={["#33FF57", "#ff0066"]}
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

export default MonthLineChart;
