import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";

import { FormProvider, RHFSelect, RHFSwitch, RHFTextField } from "@components";
import { LessonContentComplexity } from "src/redux/services/enums/lesson-content-complexity.enum";
import { useCreateLessonContentMutation } from "src/redux/services/manager/lesson-content-manager";

interface FormValuesProps {
  slug: string;
  title: string;
  description: string;
  active: boolean;
  draft: boolean;
  tags: string[];
  complexity: LessonContentComplexity;
}

const CreateLessonDemonSchema = Yup.object().shape({
  slug: Yup.string().required("Slug is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  skills: Yup.array(),
});

interface Props {
  children?: React.ReactElement;
  lessonId: string;
  order: number;
  defaultValues?: FormValuesProps;
}

export default function CreateDemonContent({
  children,
  lessonId,
  order,
  defaultValues = {
    active: false,
    draft: false,
    complexity: LessonContentComplexity.Beginner,
    slug: "",
    title: "",
    description: "",
    tags: [],
  },
}: Props): React.ReactElement {
  const [open, setOpenDialog] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();
  const [createLessonContent, { isLoading }] = useCreateLessonContentMutation();
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateLessonDemonSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await createLessonContent({
        lessonId,
        ...data,
        meta: { order },
      }).unwrap();
      enqueueSnackbar("Your step is created successfully");
      setOpenDialog(false);
      methods.reset();
    } catch (e: any) {
      enqueueSnackbar("sorry something went wrong", { variant: "error" });
    }
  };

  return (
    <>
      <Box
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <DialogTitle variant="h5" sx={{ pb: 1, pt: 2 }}>
            Lesson Content
          </DialogTitle>
          <IconButton
            onClick={() => {
              setOpenDialog(false);
            }}
            sx={{ mb: "5px", mr: "14px" }}
          >
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
                    <RHFTextField
                      style={{ width: "350px" }}
                      name="title"
                      label="Title"
                    />
                    <RHFTextField
                      style={{ width: "350px" }}
                      name="slug"
                      label="Slug"
                    />
                    <RHFTextField
                      style={{ width: "350px" }}
                      name="description"
                      label="Description"
                    />

                    <RHFSelect
                      native
                      name="complexity"
                      label="Lesson step complexity"
                    >
                      {Object.keys(LessonContentComplexity).map((c) => (
                        <option
                          key={
                            LessonContentComplexity[
                              c as keyof typeof LessonContentComplexity
                            ]
                          }
                          value={
                            LessonContentComplexity[
                              c as keyof typeof LessonContentComplexity
                            ]
                          }
                        >
                          {c}
                        </option>
                      ))}
                    </RHFSelect>

                    <Stack direction="row" justifyContent="space-between">
                      <RHFSwitch name="active" label="Content active" />
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
                    <Button
                      onClick={() => {
                        setOpenDialog(false);
                      }}
                    >
                      Close
                    </Button>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isLoading}
                    >
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
