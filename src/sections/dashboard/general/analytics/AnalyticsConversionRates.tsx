import { ApexOptions } from "apexcharts";

import { 
  Box, 
  Card, 
  CardProps,
  CardHeader, 
 } from "@mui/material";

import { fNumber } from "@utils";
import { useChart, Chart } from "@components";

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: Array<{
      label: string;
      value: number;
    }>;
    options?: ApexOptions;
  };
}

export default function AnalyticsConversionRates({
  title,
  subheader,
  chart,
  ...other
}: Props): React.ReactElement | null {
  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    colors,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: () => "",
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "28%",
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: series.map((i) => i.label),
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <Chart
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
