import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from "@components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LessonContentComplexity } from "src/redux/services/enums/lesson-content-complexity.enum";
import { useUpdateLessonContentMutation } from "src/redux/services/manager/lesson-content-manager";
import * as Yup from "yup";

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
  validation: Yup.string(),
  skills: Yup.array(),
});

interface Props {
  children?: React.ReactElement;
  lessonId: string;
  contentId: string;
  validation: string;
  defaultValues?: FormValuesProps;
}

export default function Preferences({
  children,
  lessonId,
  contentId,
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
  const [updateLessonContent, { isLoading }] = useUpdateLessonContentMutation();
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateLessonDemonSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await updateLessonContent({
        lessonId,
        ...data,
        id: contentId,
      }).unwrap();
      enqueueSnackbar("Your step is created successfully");
      setOpenDialog(false);
    } catch (e) {
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
            Lesson Preferences
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
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <RHFTextField sx={{ mb: 3 }} name="title" label="Title" />
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  sx={{ mb: 3 }}
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  }}
                >
                  <RHFTextField name="slug" label="Slug" />
                  <RHFSelect native name="complexity" label="Complexity">
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
                </Box>
                <RHFTextField
                  sx={{ mb: 3 }}
                  name="validation"
                  label="Validation REGEX"
                />

                <RHFTextField
                  multiline
                  rows={3}
                  name="description"
                  label="Description"
                />

                <Stack mt={2} direction="row" justifyContent="end">
                  <RHFSwitch name="active" label="Active" />
                  <RHFSwitch name="draft" label="Draft" />
                </Stack>

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
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
