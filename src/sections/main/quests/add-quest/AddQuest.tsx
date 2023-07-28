import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { add } from "date-fns";
import { useForm } from "react-hook-form";
import { IoSettingsOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import {
  Config,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import * as Yup from "yup";

import { Box, Stack, Tab, Tabs, Tooltip, Typography } from "@mui/material";

import { FormProvider, useSnackbar } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { ISkill } from "src/redux/interfaces/content.interface";
import { AssignmentTypes } from "src/redux/services/enums/assignment-types.enum";
import { IAssignmentCreate } from "src/redux/services/interfaces/assignment.interface";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import {
  useCreateAssignmentMutation,
  useGetAssignmentQuery,
  useUpdateAssignmentMutation,
  useUpdateCourseAssignmentMutation,
} from "src/redux/services/manager/assignments-manager";
import { useGetClassQuery } from "src/redux/services/student/classes-manager";

import DetailsStep from "./DetailsStep";
import ModalActionsBtn from "./ModalActionsBtn";
import SettingsStep from "./SettingsStep";

const nameConfig: Config = {
  dictionaries: [colors, animals],
  separator: "_",
  length: 2,
};

const CreateSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  type: Yup.mixed<AssignmentTypes>()
    .oneOf(Object.values(AssignmentTypes))
    .required("Select type"),
  course: Yup.string().when("type", {
    is: AssignmentTypes.RESEARCH,
    then: Yup.string().required("Select course"),
    otherwise: Yup.string(),
  }),
  startDate: Yup.string(),
  dueDate: Yup.string(),
  closeDate: Yup.string(),
  active: Yup.boolean().required("Choose status"),
});

export interface FormProps {
  type: AssignmentTypes;
  course: string;
  classes?: string[] | [];
  students?: string[] | [];
  name: string;
  description?: string;
  startDate: string;
  dueDate: string;
  closeDate: string;
  active: boolean;
}

export default function AddQuestModal(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const { query, push } = useRouter();

  const [assignmentsSkills, setAssignmentsSkills] = useState<ISkill[]>();
  const [students, setStudents] = useState<string[]>();
  const [value, setValue] = useState(0);

  const [createAssignment] = useCreateAssignmentMutation();
  const [updateAssignment] = useUpdateAssignmentMutation();
  const [addAssignmrntsToClass] = useUpdateCourseAssignmentMutation();
  const { data } = useGetClassQuery(
    { id: query.id as string },
    { skip: !query.id }
  );
  const { data: assignment, isLoading } = useGetAssignmentQuery(
    {
      schoolId: query.schoolId as string,
      assignmentId: query.assignmentId as string,
    },
    { skip: !query.assignmentId && !query.scholId }
  );

  useEffect(() => {
    if (!isLoading) {
      methods.reset({
        name: assignment?.name ?? uniqueNamesGenerator(nameConfig),
        description: assignment?.description
          ? JSON.parse(assignment?.description)
          : "",
        type: assignment?.type ?? AssignmentTypes.RESEARCH,
        course: assignment?.course?.id,
        startDate: assignment?.start_date ?? new Date().toString(),
        dueDate:
          assignment?.end_date ?? add(new Date(), { days: 7 }).toString(),
        closeDate:
          assignment?.close_date ?? add(new Date(), { days: 10 }).toString(),
        active: assignment?.active ?? true,
      });
      setAssignmentsSkills(assignment?.skills);
      setStudents(assignment?.students ? assignment.students : []);
    }
  }, [isLoading]);

  const methods = useForm<FormProps>({
    resolver: yupResolver(CreateSchema),
    mode: "all",
  });

  const onSubmit = async (formData: FormProps) => {
    const assignmentData: IAssignmentCreate & {
      schoolId: string;
    } = {
      schoolId: query.schoolId as string,
      name: formData.name,
      description: JSON.stringify(formData.description),
      type: formData.type,
      start_date: formData.startDate,
      end_date: formData.dueDate,
      close_date: formData.closeDate,
      active: Boolean(formData.active),
      skills: assignmentsSkills,
    };
    if (students?.length) {
      assignmentData.students = students;
    } else {
      assignmentData.classes = [query.id as string];
    }
    if (assignment) {
      try {
        updateAssignment({
          schoolId: query.schoolId as string,
          assignmentId: query.assignmentId as string,
          name: formData.name,
          description: JSON.stringify(formData.description),
          start_date: formData.startDate,
          end_date: formData.dueDate,
          close_date: formData.closeDate,
          active: Boolean(formData.active),
          // skills: assingmentSkills,
        }).unwrap();
        enqueueSnackbar("Assignment updated successfuly!");
      } catch (error: any) {
        enqueueSnackbar("Something went wrong when updating", {
          variant: "error",
        });
      }
    } else {
      try {
        const newAssignment = await createAssignment(assignmentData).unwrap();
        addAssignmrntsToClass({
          assignmentId: newAssignment.id,
          schoolId: query.schoolId as string,
          course_id: query.id as string,
        });
        push(
          `${STUDENT_PATH_DASHBOARD.class.id(
            query.id as string
          )}?${new URLSearchParams({
            schoolId: query.schoolId as string,
          })}&${new URLSearchParams({ assignmentId: newAssignment.id })}`,
          undefined,
          { shallow: true }
        );
        enqueueSnackbar("Assignment created successfuly!");
      } catch (error: any) {
        enqueueSnackbar("Something went wrong when creating", {
          variant: "error",
        });
      }
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Stack>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            <Typography variant="h4">Add Quest</Typography>
            <Tooltip title="this is .....">
              <Typography
                variant="caption"
                sx={{ textDecoration: "underline" }}
              >
                What`s a quest?
              </Typography>
            </Tooltip>
          </Stack>
          <Typography variant="subtitle2" textAlign="left">
            Type: Course/Module
          </Typography>
        </Stack>
        <Box sx={{ px: { xs: 1, sm: 3, md: 5, lg: 12 } }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Tabs
              onChange={handleChange}
              value={value}
              scrollButtons={false}
              sx={{
                pb: 2,
                "& .MuiTabs-indicator": {
                  backgroundColor: "#43D4DD",
                },
                "& .MuiTabs-flexContainer": {
                  justifyContent: "flex-end",
                },
              }}
            >
              <Tab
                label={"Details"}
                icon={<TbListDetails size={20} />}
                sx={{ fontSize: "1.1rem" }}
                {...a11yProps(0)}
              />
              <Tab
                label={"Settings"}
                icon={<IoSettingsOutline size={20} />}
                sx={{ fontSize: "1.1rem" }}
                {...a11yProps(0)}
              />
            </Tabs>

            <CustomTabPanel value={value} index={0}>
              <DetailsStep
                control={methods.control}
                courses={data?.courses ?? []}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SettingsStep
                students={students}
                control={methods.control}
                setAssignmentsSkills={(s: ISkill[]) => {
                  setAssignmentsSkills(s);
                }}
                assignmentsSkills={assignmentsSkills}
              />
            </CustomTabPanel>
            <ModalActionsBtn />
          </FormProvider>
        </Box>
      </Stack>
    </>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}
