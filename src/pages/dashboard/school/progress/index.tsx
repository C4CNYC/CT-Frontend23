import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Box, Container, Stack } from "@mui/material";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import FilterCoursesAutocomplete from "../../../../sections/@dashboard/progress/filters/filterCourses";
import FilterLessonsAutocomplete from "../../../../sections/@dashboard/progress/filters/filterLessons";
import FilterStudentsAutocomplete from "../../../../sections/@dashboard/progress/filters/filterStudents";

Progress.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

const data = [
  {
    id: "Jhon",
    data: [
      {
        x: "HTML",
        y: 100,
      },
      {
        x: "JS",
        y: 70,
      },
      {
        x: "React",
        y: 30,
      },
    ],
  },
  {
    id: "MIke",
    data: [
      {
        x: "HTML",
        y: 100,
      },
      {
        x: "JS",
        y: 70,
      },
      {
        x: "React",
        y: 30,
      },
    ],
  },
  {
    id: "Doe",
    data: [
      {
        x: "HTML",
        y: 30,
      },
      {
        x: "JS",
        y: 10,
      },
      {
        x: "React",
        y: 70,
      },
    ],
  },
];

export default function Progress(): React.ReactElement {
  return (
    <>
      <Container sx={{ ml: 0 }}>
        <Stack display="flex" direction="row" spacing={2}>
          <FilterCoursesAutocomplete />
          <FilterLessonsAutocomplete />
          <FilterStudentsAutocomplete />
        </Stack>

        <Box height="400px" width="800px">
          <ResponsiveHeatMap
            data={data}
            margin={{ top: 50, right: 90, bottom: 60, left: 90 }}
            xOuterPadding={0.3}
            xInnerPadding={0.2}
            yOuterPadding={0.6}
            yInnerPadding={0.3}
            axisTop={{
              tickSize: 1,
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
              scheme: "greens",
              minValue: -400,
              maxValue: 100,
              divergeAt: 1,
            }}
            emptyColor="#33d17a"
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.7]],
            }}
          />
        </Box>
      </Container>
    </>
  );
}
