import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUpload,
  RHFUploadBox,
} from "@components/hook-form";
import { useSnackbar } from "@components/snackbar";
import { Upload } from "@components/upload";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  FormGroup,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  useCreateCourseMutation,
  useUpdateCourseCoverMutation,
  useUpdateCourseMutation,
} from "../../../redux/services/manager/courses-manager";
import CoursesController from "./CoursesController";

interface FormValuesProps {
  name: string;
  level: string;
  price: string;
  description: string;
  active: boolean;
  draft: boolean;
  skills: [];
}

interface Prop {
  defaultValues?: FormValuesProps;
  children: React.ReactElement;
  isEdit?: boolean;
  id?: string;
}

export default function CreateCourseDialog({
  id,
  isEdit = false,
  children,
  defaultValues,
}: Prop): React.ReactElement | null {
  const [open, setOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<null | File>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [editCourse] = useUpdateCourseMutation();
  const [createCourse] = useCreateCourseMutation();
  const [updateCover] = useUpdateCourseCoverMutation();

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
  const handleDrop = (files: File[]) => {
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
        if (!uploadedFile) return;
        file.append("file", uploadedFile);
        await updateCover({ id, file });
      } else {
        const course = await createCourse({
          ...data,
        }).unwrap();
        if (!uploadedFile) return;
        file.append("file", uploadedFile);
        await updateCover({ id: course.id, file });
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      methods.reset(data);
    } catch (error) {
      enqueueSnackbar(error.data.message, {
        variant: "error",
      });
      console.error(error, "test");
    }
    handleClose();
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
            Create Course
          </DialogTitle>
          <IconButton onClick={handleClose} sx={{ mb: "5px", mr: "14px" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Grid container>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3, pt: 2 }}>
                  <Box rowGap={3} display="grid">
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
                    <RHFTextField
                      style={{ width: "350px" }}
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
                    <Box sx={{ maxWidth: "350px" }}>
                      <CoursesController skills={defaultValues?.skills} />
                    </Box>
                    <RHFTextField
                      name="description"
                      label="Course description"
                      multiline
                      rows={3}
                    />
                    <Stack direction="row" justifyContent="space-between">
                      <RHFSwitch name="active" label="Course active" />
                      <RHFSwitch name="draft" label="Draft" />
                    </Stack>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      mt: 7,
                    }}
                  >
                    <Button onClick={handleClose}>Close</Button>
                    <LoadingButton type="submit" variant="contained">
                      Save
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
