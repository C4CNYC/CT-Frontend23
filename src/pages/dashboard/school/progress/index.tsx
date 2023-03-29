import CustomAutocomplete from "@components/custom-autocomplete";
import { useFilters } from "@hooks/useFilters";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Autocomplete, Box, TextField } from "@mui/material";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { RootState } from "src/redux/store";

import { useState } from "react";
import { useSelector } from "react-redux";

Progress.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

const data = [
  {
    id: "Japan",
    data: [
      {
        x: "Train",
        y: -61769,
      },
      {
        x: "Subway",
        y: 13321,
      },
      {
        x: "Bus",
        y: 61639,
      },
      {
        x: "Car",
        y: -19888,
      },
      {
        x: "Boat",
        y: -62718,
      },
      {
        x: "Moto",
        y: 87359,
      },
      {
        x: "Moped",
        y: -19566,
      },
    ],
  },
  {
    id: "France",
    data: [
      {
        x: "Train",
        y: 94432,
      },
      {
        x: "Subway",
        y: -62488,
      },
      {
        x: "Bus",
        y: 82319,
      },
      {
        x: "Car",
        y: 14698,
      },
      {
        x: "Boat",
        y: -21145,
      },
      {
        x: "Moto",
        y: -2162,
      },
      {
        x: "Moped",
        y: -72908,
      },
    ],
  },
  {
    id: "US",
    data: [
      {
        x: "Train",
        y: 83852,
      },
      {
        x: "Subway",
        y: 2658,
      },
      {
        x: "Bus",
        y: -71996,
      },
      {
        x: "Car",
        y: 44862,
      },
      {
        x: "Boat",
        y: 99258,
      },
      {
        x: "Moto",
        y: -69953,
      },
      {
        x: "Moped",
        y: -77423,
      },
    ],
  },
];

const options = ["Option 1", "Option 2"];

export default function Progress(): React.ReactElement {
  const [value, setValue] = useState<string | null>(options[0]);
  const [inputValue, setInputValue] = useState("");
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { filters, setFilter, resetFilters } = useFilters({
    name: "",
    class_id: "",
  });

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        renderInput={(params) => <TextField {...params} label="Text" />}
        sx={{ width: 250, ml: "24px" }}
      />
      <Box width="850px">
        <CustomAutocomplete
          filterName={filters.name}
          onFilterName={(name: string) => {
            setFilter("name", name);
          }}
          onFilterClass={() => {}}
          onResetFilter={resetFilters}
        />
      </Box>

      <Box height="300px" width="800px">
        <ResponsiveHeatMap
          data={data}
          margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
          xOuterPadding={0.3}
          xInnerPadding={0.2}
          yOuterPadding={1}
          yInnerPadding={0.3}
          axisTop={{
            tickSize: 5,
            tickPadding: 1,
            tickRotation: 0,
            legend: "",
            legendOffset: -28,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -72,
          }}
          colors={{
            type: "diverging",
            scheme: "red_yellow_green",
            minValue: -100000,
            maxValue: 100000,
            divergeAt: 1,
          }}
          emptyColor="#555555"
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.7]],
          }}
          legends={[]}
        />
      </Box>
    </>
  );
}
