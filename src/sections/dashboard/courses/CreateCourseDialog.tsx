import * as React from "react";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import * as Yup from "yup";

import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormGroup,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import {
  CourseModuleAutocomplete,
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUpload,
  SingleFilePreview,
  useSnackbar,
} from "@components";

import {
  useCreateCourseMutation,
  useUpdateCourseCoverMutation,
  useUpdateCourseMutation,
} from "../../../redux/services/manager/courses-manager";
import AuthorsTab from "./authors-tab/AuthorsTab";

interface FormValuesProps {
  name: string;
  content_id: string;
  level: string;
  price: string;
  description: string;
  active: boolean;
  public: boolean;
  initial_enrolled: number;
  initial_likes: number;
  initial_stars: number;
  skills: [];
}

interface Prop {
  defaultValues?: FormValuesProps;
  children: React.ReactElement;
  isEdit?: boolean;
  id: string;
}

export default function CreateCourseDialog({
  id,
  isEdit = false,
  children,
  defaultValues,
}: Prop): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<null | File>(null);

  const [editCourse, { isLoading: isEditLoading }] = useUpdateCourseMutation();
  const [createCourse, { isLoading: isCreateLoading }] =
    useCreateCourseMutation();
  const [updateCover] = useUpdateCourseCoverMutation();
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  const CreateCourseSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    content_id: Yup.string().required("Content Id is required"),
    level: Yup.string().required("Level is required"),
    price: Yup.string().required("Price is required"),
    description: Yup.string().required("Description is required"),
    initial_likes: Yup.number().required("Initial likes is required"),
    initial_stars: Yup.number().required("Initial stars is required"),
    initial_enrolled: Yup.number().required("Initial enrolled is required"),
    skills: Yup.array(),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateCourseSchema),
    defaultValues,
  });

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  const handleDrop = (files: File[]): void => {
    setUploadedFile(files[0]);
  };

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      const file = new FormData();
      if (isEdit && id) {
        await editCourse({
          id,
          ...data,
        }).unwrap();

        if (uploadedFile) {
          file.append("file", uploadedFile);
          await updateCover({ id, file }).unwrap();
        }
      } else {
        const course = await createCourse(data).unwrap();

        if (uploadedFile) {
          file.append("file", uploadedFile);
          await updateCover({ id: course.id, file }).unwrap();
        }
      }

      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      methods.reset();
      setOpen(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
  };
  const clearFileHandler = (): void => {
    setUploadedFile(null);
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <DialogTitle variant="h5" sx={{ pb: 1, pt: 2 }}>
            {isEdit ? "Edit" : "Create"} Course
          </DialogTitle>
          <IconButton onClick={handleClose} sx={{ mb: "5px", mr: "14px" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            {isEdit ? (
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{ ml: 3 }}
              >
                <Tab label="General" {...a11yProps(0)} />

                <Tab label="Modules" {...a11yProps(1)} />
                {isEdit ? <Tab label="authors" {...a11yProps(2)} /> : null}
              </Tabs>
            ) : null}
          </Box>
          <TabPanel value={value} index={0}>
            <FormProvider
              methods={methods}
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <Box rowGap={3} display="grid">
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
                      onClick={clearFileHandler}
                    >
                      <IoMdClose size="20px" />
                    </IconButton>
                  ) : null}
                  <RHFUpload
                    name="course_img"
                    onDrop={handleDrop}
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
                  sx={{ width: "100%" }}
                  name="name"
                  label="Course name"
                />

                <RHFTextField
                  sx={{ width: "100%" }}
                  name="content_id"
                  label="Course Content Id"
                  placeholder="W1"
                />

                <RHFSelect native name="level" label="Course level">
                  <option key="empty" value="empty">
                    Select Level
                  </option>
                  <option key="beginner" value="beginner">
                    Beginner
                  </option>
                  <option key="intermediate" value="intermediate">
                    Intermediate
                  </option>
                  <option key="advanced" value="advanced">
                    Advanced
                  </option>
                </RHFSelect>

                <FormGroup row style={{ flexWrap: "nowrap" }}>
                  <Button
                    variant="contained"
                    sx={{
                      maxHeight: "56px",
                      bgcolor: "grey.400",
                      color: "grey.800",
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    disableElevation
                  >
                    $
                  </Button>
                  <RHFTextField
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderLeftColor: "transparent",
                      },
                    }}
                    name="price"
                    label="Course price"
                    type="number"
                  />
                </FormGroup>
                <RHFTextField
                  sx={{ width: "100%" }}
                  name="initial_likes"
                  label="Initial likes"
                  type="number"
                />
                <RHFTextField
                  sx={{ width: "100%" }}
                  name="initial_stars"
                  label="Initial starts"
                  type="number"
                />
                <RHFTextField
                  sx={{ width: "100%" }}
                  name="initial_enrolled"
                  label="Initial enrolled"
                  type="number"
                />
                <RHFTextField
                  name="description"
                  label="Course description"
                  multiline
                  rows={3}
                />
                <Stack direction="row">
                  <RHFSwitch name="active" label="Course active" />
                  <RHFSwitch name="public" label="Public" />
                </Stack>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: { xs: 3, sm: 7 },
                }}
              >
                <Button color="error" variant="soft" onClick={handleClose}>
                  Close
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isEditLoading || isCreateLoading}
                >
                  Save
                </LoadingButton>
              </Box>
            </FormProvider>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CourseModuleAutocomplete id={id} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AuthorsTab courseId={id} />
          </TabPanel>
        </Box>
      </Dialog>
    </>
  );
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
        <Box
          sx={{
            py: { xs: 1, sm: 3 },
            px: { xs: 2, sm: 3 },
            height: "700px",
            overflowY: "auto",
            width: { xs: "330px", sm: "350px", md: "450px" },
          }}
        >
          {children}
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
