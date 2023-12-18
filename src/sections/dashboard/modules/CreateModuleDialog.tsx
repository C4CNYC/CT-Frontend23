import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  DialogActions,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  FormProvider,
  ModuleLessonsAutocomplete,
  useSnackbar,
} from "@components";
import { useAddModuleToCourseMutation } from "src/redux/services/manager/courses-manager";

import {
  useCreateModuleMutation,
  useUpdateModuleAvatarMutation,
  useUpdateModuleMutation,
} from "../../../redux/services/manager/modules-manager";
import MainTab from "./MainTab";
import SettingsTab from "./SettingsTab";
import { DIALOG_ACTIONS_SX, TAB_PANEL_SX, TAB_SX } from "./constants";

interface FormValuesProps {
  name: string;
  description: string;
  active: boolean;
  tips: string;
  duration: string;
  teacher_slides: string;
  teacher_forum: string;
  lesson_plans: string;
  initial_enrolled: number;
  initial_likes: number;
  initial_stars: number;
}

interface Prop {
  defaultValues?: FormValuesProps;
  children: React.ReactElement;
  isEdit?: boolean;
  id?: string;
  moduleTips?: string[] | [];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): React.ReactElement {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={TAB_SX}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const durationRegexp =
  /^(?!.*(second|minute|hour|day|week|month|year).*\1)\d+\s?(?:second|minute|hour|day|week|month|year)s?(?: ?\d+\s?(?:second|minute|hour|day|week|month|year)s?)*$/gm;

export default function CreateModuleDialog({
  id,
  isEdit,
  children,
  defaultValues,
  moduleTips,
}: Prop): React.ReactElement {
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  const [uploadedFile, setUploadedFile] = useState<null | File>(null);

  const [addToCourse, { isLoading: isAddToCourseLoading }] =
    useAddModuleToCourseMutation();
  const [editModule, { isLoading: isEditLoading }] = useUpdateModuleMutation();
  const [createModule, { isLoading: isCreateLoading }] =
    useCreateModuleMutation();
  const [updateAvatar] = useUpdateModuleAvatarMutation();

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  const CreateCourseSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description:
      Yup.string().required("Description is required") &&
      Yup.string().max(100, "Write less then 100 characters"),
    duration: Yup.string()
      .trim()
      .nullable()
      .transform((v, o) => (o === "" ? null : v))
      .matches(
        durationRegexp,
        "Use key words: second, minute, hour, day, week, month, year. E.g: 1 hour 30 minutes"
      ),
    initial_likes: Yup.number().positive(),
    initial_stars: Yup.number().positive(),
    initial_enrolled: Yup.number().positive(),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateCourseSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      const file = new FormData();
      if (isEdit && id) {
        await editModule({
          id,
          ...data,
          tips:
            data.tips.trim() !== "" && moduleTips
              ? [...moduleTips, data.tips]
              : [],
          duration: data.duration?.trim(),
        }).unwrap();
        if (uploadedFile) {
          file.append("file", uploadedFile);
          await updateAvatar({ id, file }).unwrap();
        }
      } else {
        const module = await createModule({
          ...data,
          tips: data?.tips ? [data.tips] : [],
          duration: data?.duration?.trim() ?? "1 month",
        }).unwrap();
        if (query.course_id) {
          await addToCourse({
            id: query.course_id as string,
            unit_id: module.id,
          }).unwrap();
        }
        if (uploadedFile) {
          file.append("file", uploadedFile);
          await updateAvatar({ id: module.id, file }).unwrap();
        }
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      methods.reset();
      handleClose();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Box
        onClick={() => {
          handleClickOpen();
        }}
      >
        {children}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit" : "Create"} Module</DialogTitle>
        <DialogContent sx={{ p: 0, mt: "-10px" }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider", pl: 3 }}>
              {isEdit ? (
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="General" {...a11yProps(0)} />
                  <Tab label="Lessons" {...a11yProps(1)} />
                  <Tab label="Settings" {...a11yProps(2)} />
                </Tabs>
              ) : null}
            </Box>
            <TabPanel value={value} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Box rowGap={3} display="grid" mt={2}>
                    <MainTab
                      uploadedFile={uploadedFile}
                      setUploadedFile={setUploadedFile}
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={TAB_PANEL_SX}>
                <ModuleLessonsAutocomplete id={id as string} />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Box rowGap={3} display="grid" mt={2}>
                    <SettingsTab />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <DialogActions>
              <Box sx={DIALOG_ACTIONS_SX}>
                <Button onClick={handleClose}>Close</Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={
                    isEditLoading || isCreateLoading || isAddToCourseLoading
                  }
                >
                  Save
                </LoadingButton>
              </Box>
            </DialogActions>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
