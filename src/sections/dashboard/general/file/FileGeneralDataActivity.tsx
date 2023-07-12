import { useState } from "react";

import { ApexOptions } from "apexcharts";

// @mui
import { Box, Card, CardHeader, CardProps } from "@mui/material";

// components
import { Chart, CustomSmallSelect, useChart } from "@components";
// utils
import { fData } from "@utils";

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    labels: Record<string, string[]>;
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

export default function FileGeneralDataActivity({
  title,
  subheader,
  chart,
  ...other
}: Props): React.ReactElement | null {
  const { labels, colors, series, options } = chart;

  const [seriesData, setSeriesData] = useState("Week");

  const chartOptions = useChart({
    chart: {
      stacked: true,
    },
    colors,
    stroke: {
      width: 0,
    },
    xaxis: {
      categories:
        (seriesData === "Week" && labels.week) ||
        (seriesData === "Month" && labels.month) ||
        labels.year,
    },
    tooltip: {
      y: {
        formatter: (value: number) => fData(value),
      },
    },
    plotOptions: {
      bar: {
        borderRadius:
          (seriesData === "Week" && 8) || (seriesData === "Month" && 6) || 10,
        columnWidth: "20%",
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
