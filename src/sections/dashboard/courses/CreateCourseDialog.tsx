import * as React from "react";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Card, Grid, FormGroup } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField } from "@components/hook-form";
import { useCreateCourseMutation, useUpdateCourseMutation } from "../../../redux/services/manager";
import { useSnackbar } from "@components/snackbar";

type FormValuesProps = {
  name: string;
  level?: string;
  price?: string;
  description: string;
  active: boolean;
  draft?: boolean;
  type?: string;
};

type Prop = {
  defaultValues?: FormValuesProps;
  children: React.ReactElement;
  isEdit?: boolean;
  id?: string;
  type?: string;
  level?: string;
  price?: string;
};

export default function CreateCourseDialog({
                                             id,
                                             isEdit = false,
                                             children,
                                             defaultValues
                                           }: Prop) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [editCourse] = useUpdateCourseMutation();
  const [createCourse] = useCreateCourseMutation();


  const CreateCourseSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    level: Yup.string().required("Level is required"),
    price: Yup.string().required("Price is required"),
    description: Yup.string().required("Description is required")
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateCourseSchema),
    defaultValues
  });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (!isEdit) {
        await createCourse({
          ...data
        }).unwrap();
      } else {
        await editCourse({
          id,
          ...data
        });
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
    } catch (error) {
      enqueueSnackbar(error.data.message, {
        variant: "error"
      });
      console.error(error, "test");
    }
    handleClose();
  };

  return (
    <>
      <Box onClick={() => handleClickOpen()}>{children}</Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Course</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box rowGap={3} display="grid">
                    <RHFTextField
                      style={{ width: "350px" }}
                      name="name"
                      label="Course name"
                    />

                    <RHFSelect
                      native
                      name="level"
                      label="Course level"
                    >
                      <option key="empty" value="empty">Select Level</option>
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
                          borderBottomRightRadius: 0
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
                            borderLeftColor: "transparent"
                          }
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
                      <RHFSwitch
                        name="active"
                        label="Course active"
                      />
                      <RHFSwitch
                        name="draft"
                        label="Draft"
                      />
                    </Stack>

                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      mt: 7
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
