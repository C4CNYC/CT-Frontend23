import CustomBreadcrumbs from "@components/custom-breadcrumbs/CustomBreadcrumbs";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Box, CircularProgress, Container } from "@mui/material";
import { HeatMapSerie, ResponsiveHeatMap } from "@nivo/heatmap";
import { PATH_DASHBOARD } from "@routes/paths";
import DrawerFilters from "@sections/@dashboard/progress/filters/drawer";
import { ILesson } from "src/redux/services/interfaces/courseUnits.interface";
import { IProgress } from "src/redux/services/interfaces/progress.interface";
import { useGetLessonsQuery } from "src/redux/services/manager/lessons-manager";
import { useGetProgressQuery } from "src/redux/services/manager/progress-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

Progress.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export default function Progress(): React.ReactElement {
  const { data, isLoading, isFetching } = useGetProgressQuery({});
  const { data: lessons, isLoading: isLessonsLoading } = useGetLessonsQuery({
    take: 10,
  });

  if (isLoading || isFetching || isLessonsLoading) return <CircularProgress />;
  return (
    <>
      <Container sx={{ ml: 0 }}>
        <CustomBreadcrumbs
          heading="Progress"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.root,
            },
            { name: "Progress", href: PATH_DASHBOARD.school.progress },
          ]}
          action={<DrawerFilters />}
        />
        <Box height="400px" width="800px">
          <ResponsiveHeatMap
            data={parseDataTable(lessons?.data, data?.data)}
            forceSquare
            enableLabels={false}
            enableGridX={true}
            enableGridY={true}
            margin={{ top: 50, right: 90, bottom: 60, left: 130 }}
            xOuterPadding={0}
            xInnerPadding={0}
            yOuterPadding={0}
            yInnerPadding={0}
            sizeVariation={{
              sizes: [0.4, 0.4],
            }}
            axisTop={{
              tickRotation: 0,
              tickSize: 1,
              tickPadding: -10,
              legend: "",
              legendOffset: -72,
            }}
            axisLeft={{
              tickSize: 1,
              tickPadding: -10,
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
              divergeAt: 0.5,
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

function parseDataTable(
  lessons?: Array<ILesson & BaseResponseInterface>,
  data?: Array<IProgress & BaseResponseInterface>
): Array<HeatMapSerie<any, any>> {
  if (!data || !lessons) return [];
  return data.reduce<Array<HeatMapSerie<any, any>>>(
    (acc, curr) => [
      ...acc,
      {
        id: curr.students[0].email,
        data: [
          ...lessons?.map((l, i) => ({
            x: `L${i + 1}`,
            y: curr.completed_lessons.find((lc) => lc.id === l.id)
              ? 70000
              : -80000,
          })),
        ],
      },
    ],
    []
  );
}
