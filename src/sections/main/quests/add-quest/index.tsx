import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { add, format } from "date-fns";
import { useForm } from "react-hook-form";
import { IoSettingsOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";

import { FormProvider, useSnackbar } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import CustomTabPanel, {
  customTabProps,
} from "src/components/custom-tab-panel";
import { AssignmentTypes } from "src/redux/enums/assignment-types.enum";
import { ISkill } from "src/redux/interfaces/content.interface";
import {
  useCreateAssignmentMutation,
  useGetAssignmentQuery,
  useUpdateAssignmentMutation,
  useUpdateClassAssignmentMutation,
  useUpdateCourseAssignmentMutation,
} from "src/redux/services/manager/assignments-manager";

import DetailsStep from "./DetailsStep";
import SettingsStep from "./SettingsStep";
import { CreateQuestSchema } from "./helpers/create-quest.schema";
import { FormQuestProps } from "./helpers/quest.interface";

const RANDOM_NAME = uniqueNamesGenerator({
  dictionaries: [colors, animals],
  separator: "_",
  length: 2,
});

const DATE_PARSER = (date?: string, increment: number = 0) =>
  date ? new Date(date) : add(new Date(), { days: increment });
const DATE_FORMAT = "yyyy-MM-dd HH:mm:ss.SSSX";
const DAYS_TO_END = 7;
const DAYS_TO_CLOSE = 10;

export default function AddQuest(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const { query, push } = useRouter();

  const [assignmentsSkillsId, setAssignmentsSkillsId] = useState<ISkill[]>();
  const [value, setValue] = useState(0);

  const { data: assignment, isLoading: isAssignmentLoading } =
    useGetAssignmentQuery(
      {
        schoolId: query.schoolId as string,
        assignmentId: query.assignmentId as string,
      },
      { skip: !query.assignmentId || !query.schoolId }
    );
  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();
  const [updateAssignment, { isLoading: isUpdating }] =
    useUpdateAssignmentMutation();
  const [addCourseToAssignment, { isLoading: isAddingToClass }] =
    useUpdateCourseAssignmentMutation();
  const [addAssignmentToClass] = useUpdateClassAssignmentMutation();

  useEffect(() => {
    if (assignment) {
      methods.reset({
        name: assignment?.name,
        description: JSON.parse(assignment?.description ?? "{}"),
        type: assignment?.type ?? AssignmentTypes.COURSE,
        course: assignment?.course?.id,
        startDate: format(DATE_PARSER(assignment?.start_date), DATE_FORMAT),
        dueDate: format(DATE_PARSER(assignment?.end_date), DATE_FORMAT),
        closeDate: format(DATE_PARSER(assignment?.close_date), DATE_FORMAT),
        active: assignment?.active,
      });
    }
  }, [isAssignmentLoading]);

  const methods = useForm<FormQuestProps>({
    resolver: yupResolver(CreateQuestSchema),
    mode: "all",
    defaultValues: {
      name: assignment?.name ?? RANDOM_NAME,
      description: JSON.parse(assignment?.description ?? "{}"),
      type: assignment?.type ?? AssignmentTypes.COURSE,
      course: assignment?.course?.id,
      startDate: format(DATE_PARSER(assignment?.start_date), DATE_FORMAT),
      dueDate: format(
        DATE_PARSER(assignment?.end_date, DAYS_TO_END),
        DATE_FORMAT
      ),
      closeDate: format(
        DATE_PARSER(assignment?.close_date, DAYS_TO_CLOSE),
        DATE_FORMAT
      ),
      active: assignment?.active ?? true,
    },
  });

  const onSubmit = async (formData: FormQuestProps) => {
    if (assignment) {
      try {
        updateAssignment({
          schoolId: query.schoolId as string,
          assignmentId: query.assignmentId as string,
          name: formData.name,
          description: JSON.stringify(formData.description ?? {}),
          start_date: formData.startDate,
          end_date: formData.dueDate,
          close_date: formData.closeDate,
          active: Boolean(formData.active),
        }).unwrap();
        enqueueSnackbar("Assignment updated successfuly!");
        push(
          STUDENT_PATH_DASHBOARD.class.id(query.id as string, {
            schoolId: query.schoolId as string,
            assignmentId: assignment.id,
          })
        );
      } catch (error: any) {
        enqueueSnackbar(error.data.message, {
          variant: "error",
        });
      }
    } else {
      try {
        const newAssignment = await createAssignment({
          schoolId: query.schoolId as string,
          name: formData.name,
          description: JSON.stringify(formData.description),
          type: formData.type,
          start_date: formData.startDate,
          end_date: formData.dueDate,
          close_date: formData.closeDate,
          active: Boolean(formData.active),
          skill_tags: assignmentsSkillsId?.map((el) => el.id) ?? [],
          classes: [query.id as string],
        }).unwrap();
        await addAssignmentToClass({
          assignmentId: newAssignment.id,
          schoolId: query.schoolId as string,
          class_id: query.id as string,
        }).unwrap();
        await addCourseToAssignment({
          assignmentId: newAssignment.id,
          schoolId: query.schoolId as string,
          course_id: formData.course,
        });
        push(
          STUDENT_PATH_DASHBOARD.class.id(query.id as string, {
            schoolId: query.schoolId as string,
            assignmentId: newAssignment.id,
            ...(query.onBoarding ? { onBoarding: "on-boarding" } : {}),
          })
        );
        enqueueSnackbar("Assignment created successfuly!");
      } catch (error: any) {
        enqueueSnackbar(error.data.message, {
          variant: "error",
        });
      }
    }
  };

  if (isAssignmentLoading && query.assignmentId) {
    return (
      <Skeleton
        variant="rounded"
        sx={{ height: "988px", maxWidth: "1152px", borderRadius: 4 }}
      />
    );
  }

  return (
    <>
      <Stack sx={{ px: 5, py: 8, background: "#f3f3f3", borderRadius: 3 }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Stack>
            <Typography variant="h2">Add Quest</Typography>
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
              onChange={(_: any, newValue: number) => {
                setValue(newValue);
              }}
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
                {...customTabProps(0)}
              />
              <Tab
                label={"Settings"}
                icon={<IoSettingsOutline size={20} />}
                sx={{ fontSize: "1.1rem" }}
                {...customTabProps(0)}
              />
            </Tabs>

            <CustomTabPanel value={value} index={0}>
              <DetailsStep />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SettingsStep
                control={methods.control}
                setAssignmentsSkillsId={(s: ISkill[]) => {
                  setAssignmentsSkillsId(s);
                }}
                assignmentsSkillsId={assignmentsSkillsId}
                existedSkills={assignment?.skill_tags ?? []}
              />
            </CustomTabPanel>
            <Stack mt={3} gap={3} flexDirection="row" justifyContent="flex-end">
              <Button
                onClick={() => {
                  push(STUDENT_PATH_DASHBOARD.class.id(query.id as string));
                }}
                variant="soft"
                color="error"
              >
                CANCEL
              </Button>
              <LoadingButton
                type="submit"
                color="success"
                variant="contained"
                loading={isLoading || isUpdating || isAddingToClass}
              >
                {assignment ? "UPDATE" : "LAUNCH"}
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Box>
      </Stack>
    </>
  );
}
