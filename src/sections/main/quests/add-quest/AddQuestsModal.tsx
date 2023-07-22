import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAtom } from "jotai";
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

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";

import { FormProvider, useSnackbar } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { IClass } from "src/redux/interfaces/class.interface";
import { AssignmentTypes } from "src/redux/services/enums/assignment-types.enum";
import {
  IAssignmentCreate,
  IAssignmentUpdate,
} from "src/redux/services/interfaces/assignment.interface";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import {
  useCreateAssignmentMutation,
  useGetAssignmentQuery,
  useUpdateAssignmentMutation,
  useUpdateCourseAssignmentMutation,
} from "src/redux/services/manager/assignments-manager";

import DetailsStep from "./DetailsStep";
import ModalActionsBtn from "./ModalActionsBtn";
import SettingsStep from "./SettingsStep";
import { addQuestAtom } from "./add-quest-atom";

interface Props {
  isEdit?: boolean;
  children: React.ReactElement;
  data: IClass;
}

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

export default function AddQuestModal({
  children,
  isEdit,
  data,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const { query, push } = useRouter();
  const nameConfig: Config = {
    dictionaries: [colors, animals],
    separator: "_",
    length: 2,
  };
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [
    { startDate, closeDate, dueDate, assingmentSkills, students },
    setQuestAtom,
  ] = useAtom(addQuestAtom);
  const { data: assignment } = useGetAssignmentQuery(
    {
      schoolId: data.school.id,
      assignmentId: query.assignmentId as string,
    },
    { skip: !query.assignmentId }
  );
  const [createAssignment] = useCreateAssignmentMutation();
  const [updateAssignment] = useUpdateAssignmentMutation();
  const [addAssignmrntsToClass] = useUpdateCourseAssignmentMutation();

  useEffect(() => {
    if (assignment) {
      setQuestAtom((prev) => ({
        ...prev,
        startDate: assignment.start_date,
        dueDate: assignment.end_date,
        closeDate: assignment.close_date,
        assingmentSkills: assignment?.skills ?? [],
      }));
    }
  }, [assignment]);

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

  const methods = useForm<FormProps>({
    resolver: yupResolver(CreateSchema),
    defaultValues: {
      name: assignment?.name ?? uniqueNamesGenerator(nameConfig),
      description: assignment?.description ?? "",
      type: assignment?.type ?? AssignmentTypes.RESEARCH,
      course: assignment?.course?.id,
      startDate: assignment?.start_date ?? startDate,
      dueDate: assignment?.end_date ?? dueDate,
      closeDate: assignment?.close_date ?? closeDate,
      active: assignment?.active ?? true,
    },
  });
  const onSubmit = async (formData: FormProps) => {
    console.log(formData, assingmentSkills, "data");
    const assignmentData: IAssignmentCreate & {
      schoolId: string;
    } = {
      schoolId: data.school.id,
      name: formData.name,
      description: JSON.stringify(formData.description),
      type: formData.type,
      start_date: formData.startDate,
      end_date: formData.dueDate,
      close_date: formData.closeDate,
      active: Boolean(formData.active),
      skills: assingmentSkills,
    };
    if (students?.length) {
      assignmentData.students = students;
    } else {
      assignmentData.classes = [data.id as string];
    }
    try {
      if (assignment) {
        updateAssignment({
          schoolId: data.school.id,
          assignmentId: query.assignmentId as string,
          name: formData.name,
          description: JSON.stringify(formData.description),
          start_date: formData.startDate,
          end_date: formData.dueDate,
          close_date: formData.closeDate,
          active: Boolean(formData.active),
          skills: assingmentSkills,
        });
      } else {
        const newAssignment = await createAssignment(assignmentData).unwrap();
        addAssignmrntsToClass({
          assignmentId: newAssignment.id,
          schoolId: data.school.id,
          course_id: data.id as string,
        });
        push(
          `${STUDENT_PATH_DASHBOARD.class.id(
            query.id as string
          )}?${new URLSearchParams({ assignmentId: newAssignment.id })}`,
          undefined,
          { shallow: true }
        );
      }
      enqueueSnackbar("Assignment created successfuly!");
    } catch (error: any) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{ sx: { pr: { md: 6 } } }}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 0,
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
          <Typography variant="subtitle2">Type: Course/Module</Typography>
        </DialogTitle>
        <DialogContent>
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
                courses={data.courses ?? []}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SettingsStep
                schoolId={data.school.id}
                control={methods.control}
              />
            </CustomTabPanel>
            <ModalActionsBtn handleCloseDialog={handleCloseDialog} />
          </FormProvider>
        </DialogContent>
      </Dialog>
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
