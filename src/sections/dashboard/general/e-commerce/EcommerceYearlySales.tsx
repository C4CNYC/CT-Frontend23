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
      year: string;
      data: Array<{
        name: string;
        data: number[];
      }>;
    }>;
    options?: ApexOptions;
  };
}

export default function EcommerceYearlySales({
  title,
  subheader,
  chart,
  ...other
}: Props): React.ReactElement | null {
  const { colors, categories, series, options } = chart;

  const [seriesData, setSeriesData] = useState("2019");

  const chartOptions = useChart({
    colors,
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    xaxis: {
      categories,
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
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </CustomSmallSelect>
        }
      />

      {series.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <Chart
              type="area"
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
