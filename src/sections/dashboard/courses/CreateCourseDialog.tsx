import {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUpload,
  useSnackbar,
  SingleFilePreview,
  CourseModuleAutocomplete,
  FormProvider,
} from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
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
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import * as Yup from "yup";
import {
  useCreateCourseMutation,
  useUpdateCourseCoverMutation,
  useUpdateCourseMutation,
} from "../../../redux/services/manager/courses-manager";
import AuthorsList from "./authors-tab/AuthorsList";

interface FormValuesProps {
  name: string;
  level: string;
  price: string;
  description: string;
  active: boolean;
  draft: boolean;
  public: boolean;
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
  const [open, setOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<null | File>(null);
  const { enqueueSnackbar } = useSnackbar();
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
    level: Yup.string().required("Level is required"),
    price: Yup.string().required("Price is required"),
    description: Yup.string().required("Description is required"),
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
          await updateCover({ id, file });
        }
      } else {
        const course = await createCourse({
          ...data,
        }).unwrap();
        if (!uploadedFile) return;
        file.append("file", uploadedFile);
        await updateCover({ id: course.id, file });
      }

      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      methods.reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
    handleClose();
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
                  name="description"
                  label="Course description"
                  multiline
                  rows={3}
                />
                <Stack direction="row" justifyContent="space-between">
                  <RHFSwitch name="active" label="Course active" />
                  <RHFSwitch name="draft" label="Draft" />
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
                <Button onClick={handleClose}>Close</Button>
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
            <Box
              sx={{
                minHeight: "550px",
                width: { xs: "330px", sm: "350px", md: "450px" },
              }}
            >
              <CourseModuleAutocomplete id={id} />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box
              sx={{
                minHeight: "550px",
                width: { xs: "330px", sm: "350px", md: "450px" },
              }}
            >
              <AuthorsList id={id} />
            </Box>
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
        <Box sx={{ p: { xs: 2, sm: 3 }, height: "700px", overflowY: "auto" }}>
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
