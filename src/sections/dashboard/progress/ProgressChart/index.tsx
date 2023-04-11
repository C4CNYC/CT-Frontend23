import { CircularProgress, Typography } from "@mui/material";
import { HeatMapSerie, ResponsiveHeatMap } from "@nivo/heatmap";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useGetProgressQuery, useGetProgressContentQuery } from "src/redux/services/manager/progress-manager";
import { useGetStudentsQuery } from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";
import { IProgressContent } from "src/redux/services/interfaces/progress.interface";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

interface IProgressChart {
  courseId: string;
  classId: string;
}

export const ProgressChart = ({ courseId, classId }: IProgressChart): React.ReactElement => {
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { data: students, isLoading: isStudentLoading, isFetching: isStudentFetching } = useGetStudentsQuery({
    schoolId,
    class_id: classId
  }, { skip: !schoolId || !classId })
  const { data, isLoading: isCourseLoading, isFetching: isCourseFetching } = useGetProgressQuery(
    { id: courseId },
    { skip: !courseId }
  );
  const { data: content, isLoading: isContentLoading, isFetching } = useGetProgressContentQuery(
    { id: courseId },
    { skip: !courseId }
  );

  if (
    isStudentFetching || isStudentLoading || isContentLoading ||
    isFetching || isCourseFetching || isCourseLoading
  ) return <CircularProgress/>;

  if (!content) return <Typography variant="h5">NO DATA</Typography>;

  return (
     <Box height="800px" width="350px">
          <ResponsiveHeatMap
            data={generateTableData(students?.data ?? [], content)}
            forceSquare
            enableLabels={false}
            enableGridX={true}
            enableGridY={true}
            margin={{ top: 50, right: 90, bottom: 60, left: 130 }}
            xOuterPadding={0.15}
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
              // tickPadding: -10,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              // legendOffset: -72,
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
  );
}

function generateTableData(
  students: Array<IStudent & BaseResponseInterface>,
  content: IProgressContent & BaseResponseInterface
  ): Array<HeatMapSerie<any, any>> {
    const data = students.reduce<any>((acc, curr) => [
      ...acc,
      {
        id: `${curr.first_name} ${curr.last_name}`,
        data: [
          ...content.units.map((c, i) => ({
            x: `M${i + 1}`,
            y: 70000
          }))
        ]
      }
    ], [])

    return data;
}

// function parseDataTable(
//   lessons?: Array<ILesson & BaseResponseInterface>,
//   data?: Array<IProgress & BaseResponseInterface>
// ): Array<HeatMapSerie<any, any>> {
//   if (!data || !lessons) return [];
//   return data.reduce<Array<HeatMapSerie<any, any>>>(
//     (acc, curr) => [
//       ...acc,
//       {
//         id: curr.students[0].email,
//         data: [
//           ...lessons?.map((l, i) => ({
//             x: `L${i + 1}`,
//             y: curr.completed_lessons.find((lc) => lc.id === l.id)
//               ? 70000
//               : -80000,
//           })),
//         ],
//       },
//     ],
//     []
//   );
// }

// function getProgressBy(content, type: "unit" | "lesson"):
