import type { Meta } from "@storybook/react";
import { ApexOptions } from "apexcharts";

import { CardProps } from "@mui/material";

import { fNumber } from "@utils";

import { Chart } from "./index";
import { useChart } from "./useChart";

const Component: Meta<typeof Chart> = {
  component: Chart,
  title: "Chart",
};

export default Component;

interface Props extends CardProps {
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

const ExampleComponent = ({ subheader, chart, ...other }: Props) => {
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
    <Chart eries={[{ data: chartSeries }]} ptions={chartOptions} {...other} />
  );
};

export const Default = {
  args: {
    type: "bar",
    height: 364,
    subheader: "Subheader",
    chart: {
      colors: ["white", "green"],
      series: [
        {
          label: "label",
          value: "value",
        },
        {
          label: "label",
          value: "value",
        },
      ],
    },
  },
};
