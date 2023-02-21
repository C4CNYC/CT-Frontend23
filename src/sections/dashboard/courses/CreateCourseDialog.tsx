import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Card, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField } from "@components/hook-form";

type FormValuesProps = {
  name: string;
  level: string;
  price: string;
  description: string;
  active: boolean;
  cover: string;
};

type Prop = {
  createCourse?: (name: string) => void;
  defaultValues?: FormValuesProps;
  children: React.ReactElement;
};

export default function CreateCourseDialog({
                                             children,
                                             createCourse,
                                             defaultValues
                                           }: Prop) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const onSubmit = async (data: FormValuesProps) => {
    // createCourse(data.name);
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
                      required
                    />

                    <RHFSelect
                      native
                      name="level"
                      label="Course level"
                    >
                      <option key="easy" value="easy">
                        Easy
                      </option>
                      <option key="easy" value="easy">
                        Easy
                      </option>
                    </RHFSelect>

                    <RHFTextField
                      name="price"
                      label="Course price"
                      required
                      type="number"
                    />

                    <RHFTextField
                      name="description"
                      label="Course description"
                      required
                      multiline
                      rows={3}
                    />

                    <RHFSwitch
                      name="active"
                      label="Course active"
                    />
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
