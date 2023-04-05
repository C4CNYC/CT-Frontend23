import CustomBreadcrumbs from "@components/custom-breadcrumbs/CustomBreadcrumbs";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Box, CircularProgress, Container } from "@mui/material";
import { HeatMapSerie, ResponsiveHeatMap } from "@nivo/heatmap";
import { PATH_DASHBOARD } from "@routes/paths";
import DrawerFilters from "@sections/@dashboard/progress/filters/drawer";
import { IProgress } from "src/redux/services/interfaces/progress.interface";
import { useGetProgressQuery } from "src/redux/services/manager/progress-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

Progress.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export default function Progress(): React.ReactElement {
  const { data, isLoading, isFetching } = useGetProgressQuery({});

  if (isLoading || isFetching) return <CircularProgress />;
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
            data={parseDataTable(data?.data)}
            forceSquare
            enableLabels={false}
            margin={{ top: 50, right: 90, bottom: 60, left: 90 }}
            xOuterPadding={0.3}
            xInnerPadding={0.1}
            yOuterPadding={0.6}
            yInnerPadding={0.3}
            axisTop={{
              tickRotation: 90,
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

function parseDataTable(
  data?: Array<IProgress & BaseResponseInterface>
): Array<HeatMapSerie<any, any>> {
  if (!data) return [];
  return data.reduce<Array<HeatMapSerie<any, any>>>(
    (acc, curr) => [
      ...acc,
      {
        id: curr.students[0].email,
        data: [
          ...curr.completed_lessons.map((l) => ({
            x: l.name,
            // y: 100
          })),
        ],
      },
    ],
    []
  );
}
