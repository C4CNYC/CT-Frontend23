import { useState } from "react";

import { ApexOptions } from "apexcharts";

// @mui
import { Box, Card, CardHeader, CardProps } from "@mui/material";

// components
import { Chart, CustomSmallSelect, useChart } from "@components";

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    categories?: string[];
    colors?: string[];
    series: Array<{
      type: string;
      data: Array<{
        name: string;
        data: number[];
      }>;
    }>;
    options?: ApexOptions;
  };
}

export default function BookingReservationStats({
  title,
  subheader,
  chart,
  ...other
}: Props): React.ReactElement | null {
  const { categories, colors, series, options } = chart;

  const [seriesData, setSeriesData] = useState("Year");

  const chartOptions = useChart({
    colors,
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `$${value}`,
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <CustomSmallSelect
            value={seriesData}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSeriesData(event.target.value);
            }}
          >
            {series.map((option) => (
              <option key={option.type} value={option.type}>
                {option.type}
              </option>
            ))}
          </CustomSmallSelect>
        }
      />

      {series.map((item) => (
        <Box key={item.type} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.type === seriesData && (
            <Chart
              type="bar"
              series={item.data}
              options={chartOptions}
              height={364}
            />
          )}
        </Box>
      ))}
    </Card>
  );
}
