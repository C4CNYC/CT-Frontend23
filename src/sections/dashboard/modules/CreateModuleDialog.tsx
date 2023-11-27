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
  IconButton,
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
  RHFSwitch,
  RHFTextField,
  RHFUpload,
  SingleFilePreview,
  useSnackbar,
} from "@components";
import { useAddModuleToCourseMutation } from "src/redux/services/manager/courses-manager";

import {
  useCreateModuleMutation,
  useUpdateModuleAvatarMutation,
  useUpdateModuleMutation,
} from "../../../redux/services/manager/modules-manager";
import { IoMdClose } from "react-icons/io";
import TipsTab from "@sections/dashboard/lessons/CreateLessonDialog/TipsTab";

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
        <Box sx={{
          p: { xs: 2, sm: 3 },
          minWidth: { xs: "320px", sm: "370px" },
          minHeight: "320px",
        }}>
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
const durationRegexp = /^(?!.*(second|minute|hour|day|week|month|year).*\1)\d+\s?(?:second|minute|hour|day|week|month|year)s?(?: ?\d+\s?(?:second|minute|hour|day|week|month|year)s?)*$/gm

export default function CreateModuleDialog({
  id,
  isEdit,
  children,
  defaultValues,
  moduleTips,
}: Prop): React.ReactElement {
  const { query } = useRouter();
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
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

  const CreateCourseSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required") && Yup.string().max(100, "Write less then 100 characters"),
    duration: Yup.string().trim().nullable().transform((v, o) => (o === "" ? null : v)).matches(durationRegexp, "Use key words: second, minute, hour, day, week, month, year. E.g: 1 hour 30 minutes"),
    initial_likes: Yup.number().required("Initial likes is required").positive(),
    initial_stars: Yup.number().required("Initial stars is required").positive(),
    initial_enrolled: Yup.number().required("Initial enrolled is required").positive(),
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
          tips: data.tips.trim() !== "" && moduleTips ? [...moduleTips, data.tips] : [],
          duration: data.duration?.trim(),
        }).unwrap();
        if (uploadedFile) {
          file.append("file", uploadedFile);
          await updateAvatar({ id, file }).unwrap();
        }
      } else {
        const module = await createModule({ ...data, tips: data.tips ? [data.tips] : [], duration: data.duration.trim() }).unwrap();
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
  const [value, setValue] = React.useState(0);
  const [uploadedFile, setUploadedFile] = useState<null | File>(null);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
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
                    <Box sx={{ position: "relative" }}>
                      {uploadedFile ? (
                        <IconButton
                          sx={{
                            position: "absolute",
                            right: "5px",
                            top: "5px",
                            zIndex: 10,
                            width: "20px",
                            height: "20px",
                            p: 0,
                          }}
                          onClick={() => { setUploadedFile(null) }}
                        >
                          <IoMdClose size="20px" />
                        </IconButton>
                      ) : null}
                      <RHFUpload
                        name="module_img"
                        onDrop={(files: File[]) => { setUploadedFile(files[0]) }}
                        helperText={
                          <Typography
                            variant="caption"
                            noWrap
                            width="90px"
                            sx={{
                              mt: 1,
                              mb: -1,
                              mx: "auto",
                              display: "block",
                              textAlign: "center",
                              color: "text.secondary",
                            }}
                          >
                            {uploadedFile?.name}
                          </Typography>
                        }
                      />
                      <SingleFilePreview
                        file={
                          uploadedFile ? URL.createObjectURL(uploadedFile) : null
                        }
                      />
                    </Box>
                    <RHFTextField
                      sx={{
                        width: { xs: "100%", sm: "350px" },
                        minWidth: "300px",
                      }}
                      name="name"
                      label="Module name"
                      required
                    />

                    <RHFTextField
                      name="description"
                      label="Module description"
                      required
                      multiline
                      rows={3}
                    />

                    <RHFTextField
                      name="tips"
                      placeholder="Enter tip"
                      label="Add tip"
                    />

                    <RHFSwitch name="active" label="Module active" />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box
                sx={{
                  width: { xs: "300px", sm: "350px" },
                  minWidth: "300px",
                  height: "260px",
                }}
              >
                <ModuleLessonsAutocomplete id={id as string} />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Box rowGap={3} display="grid" mt={2}>
                    <RHFTextField
                      sx={{
                        width: { xs: "100%", sm: "350px" },
                        minWidth: "300px",
                      }}
                      name="duration"
                      label="Module duration"
                    />
                    <RHFTextField
                      sx={{
                        width: { xs: "100%", sm: "350px" },
                        minWidth: "300px",
                      }}
                      name="initial_likes"
                      label="Initial likes"
                      type="number"
                    />
                    <RHFTextField
                      sx={{
                        width: { xs: "100%", sm: "350px" },
                        minWidth: "300px",
                      }}
                      name="initial_stars"
                      label="Initial stars"
                      type="number"
                    />
                    <RHFTextField
                      sx={{
                        width: { xs: "100%", sm: "350px" },
                        minWidth: "300px",
                      }}
                      name="initial_enrolled"
                      label="Initial enrolled"
                      type="number"
                    />
                    <RHFTextField
                      sx={{
                        width: { xs: "100%", sm: "350px" },
                        minWidth: "300px",
                      }}
                      name="teacher_slides"
                      label="Teacher slides link"
                    />
                    <RHFTextField
                      sx={{
                        width: { xs: "100%", sm: "350px" },
                        minWidth: "300px",
                      }}
                      name="teacher_forum"
                      label="Teacher forum link"
                    />
                    <RHFTextField
                      sx={{
                        width: { xs: "100%", sm: "350px" },
                        minWidth: "300px",
                      }}
                      name="lesson_plans"
                      label="Lesson plans link"
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <DialogActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
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
