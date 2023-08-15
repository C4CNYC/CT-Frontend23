import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  useSnackbar,
} from "@components";
import SkillsAutocomplete from "@sections/main/quests/add-quest/components/SkillsAutocomplete";
import { RHFRemirror } from "src/components/hook-form/RHFRemirror";
import { IAssignment } from "src/redux/interfaces/assignment.interface";
import { useUpdateAssignmentMutation } from "src/redux/services/manager/assignments-manager";

interface IAssignmentDarawerProps {
  openDetails: boolean;
  onCloseDetails: () => void;
  assignment: IAssignment;
}
const DATE_FORMAT = "yyyy-MM-dd HH:mm:ss.SSSX";
const DATE_PARSER = (data: string | Date) => new Date(data);

export default function AssignmentDrawer({
  openDetails,
  onCloseDetails,
  assignment,
}: IAssignmentDarawerProps): React.ReactElement {
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [assignmentsSkills, setAssignmentsSkills] = useState<string[]>();
  const [students, setStudents] = useState<string[]>();

  const [updateAssignment, { isLoading: isUpdating }] =
    useUpdateAssignmentMutation();

  const methods = useForm<FormAssignmentProps>({
    resolver: yupResolver(UpdateAssignmentSchema),
    mode: "all",
    defaultValues: {
      name: assignment.name,
      description: JSON.parse(assignment.description),
      startDate: format(DATE_PARSER(assignment.start_date), DATE_FORMAT),
      dueDate: format(DATE_PARSER(assignment.end_date), DATE_FORMAT),
      closeDate: format(DATE_PARSER(assignment.close_date), DATE_FORMAT),
      active: assignment.active,
    },
  });

  useEffect(() => {
    if (assignment) {
      setAssignmentsSkills(assignment.tags);
      setStudents(assignment?.students ? assignment.students : []);
    }
  }, []);

  const onSubmit = async (formData: FormAssignmentProps) => {
    try {
      await updateAssignment({
        assignmentId: assignment.id,
        schoolId: query.id as string,
        start_date: format(DATE_PARSER(formData.startDate), DATE_FORMAT),
        end_date: format(DATE_PARSER(formData.dueDate), DATE_FORMAT),
        close_date: format(DATE_PARSER(formData.closeDate), DATE_FORMAT),
        description: JSON.stringify(formData.description),
        name: formData.name,
        tags: assignmentsSkills,
      }).unwrap();
      enqueueSnackbar("Assignment updated!");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <Drawer
      open={openDetails}
      onClose={onCloseDetails}
      anchor="right"
      PaperProps={{
        sx: {
          width: {
            xs: 1,
            sm: 420,
          },
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <IconButton
            onClick={onCloseDetails}
            sx={{ ml: "auto", mr: 1, mb: -2 }}
          >
            <IoMdClose size={25} />
          </IconButton>
          <ListItem>
            <ListItemText primaryTypographyProps={{ variant: "h6" }}>
              Type:
            </ListItemText>
            <ListItemText
              primaryTypographyProps={{ variant: "button", fontSize: "1.0rem" }}
              sx={{ minWidth: "252px" }}
            >
              {assignment.type}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText primaryTypographyProps={{ variant: "h6" }}>
              Course:
            </ListItemText>
            <ListItemText sx={{ minWidth: "252px" }}>
              {assignment?.course?.name}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText primaryTypographyProps={{ variant: "h6" }}>
              Name:
            </ListItemText>
            <RHFTextField name="name" sx={{ maxWidth: "252px" }} />
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignContent: "stretch",
            }}
          >
            <Typography variant="h6" alignSelf="flex-start">
              Description:
            </Typography>
            <Box width="100%">
              <RHFRemirror name="description" />
            </Box>
          </ListItem>
          <ListItem>
            <ListItemText primaryTypographyProps={{ variant: "h6" }}>
              Start date:
            </ListItemText>
            <Controller
              name="startDate"
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  value={value}
                  onChange={(event) => {
                    onChange(event as string | React.ChangeEvent<Element>);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <ListItemText primaryTypographyProps={{ variant: "h6" }}>
              End date:
            </ListItemText>
            <Controller
              name="dueDate"
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  value={value}
                  onChange={(event) => {
                    onChange(event as string | React.ChangeEvent<Element>);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <ListItemText primaryTypographyProps={{ variant: "h6" }}>
              Close date:
            </ListItemText>
            <Controller
              name="closeDate"
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  value={value}
                  onChange={(event) => {
                    onChange(event as string | React.ChangeEvent<Element>);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <ListItemText primaryTypographyProps={{ variant: "h6" }}>
              Status:{" "}
            </ListItemText>
            <RHFSelect
              native
              name="active"
              sx={{ maxWidth: "252px" }}
              defaultValue={true as any}
            >
              <option key="published" value={true as any}>
                Published
              </option>
              <option key="draft" value={false as any}>
                Draft
              </option>
            </RHFSelect>
          </ListItem>
          <ListItem>
            <ListItemText>
              <SkillsAutocomplete
                labelProps="h6"
                setAssignmentsSkillsId={(s: string[]) => {
                  setAssignmentsSkills(s);
                }}
                assignmentsSkillsId={assignmentsSkills}
                existedSkills={[]}
              />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText primaryTypographyProps={{ variant: "h6" }}>
              Assign to:
            </ListItemText>
            <Avatar sx={{ width: "25px", height: "25px", mr: 1 }} />
            <ListItemText>{assignment.assignee_classes[0].name}</ListItemText>
          </ListItem>
          <ListItem>
            <LoadingButton
              type="submit"
              loading={isUpdating}
              variant="contained"
              sx={{ ml: "auto", mr: 1 }}
            >
              Save
            </LoadingButton>
          </ListItem>
        </List>
      </FormProvider>
    </Drawer>
  );
}

interface FormAssignmentProps {
  classes?: string[] | [];
  students?: string[] | [];
  name: string;
  description?: string;
  startDate: string;
  dueDate: string;
  closeDate: string;
  active: boolean;
}

const UpdateAssignmentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  startDate: Yup.string(),
  dueDate: Yup.string(),
  closeDate: Yup.string(),
  active: Yup.boolean().required("Choose status"),
});
