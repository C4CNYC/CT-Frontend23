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
import CoursesController from "@sections/dashboard/courses/CoursesController";
import { useForm } from "react-hook-form";
import { LessonContentComplexity } from "src/redux/services/enums/lesson-content-complexity.enum";
import * as Yup from "yup";

interface FormValuesProps {
  type: string;
  slug: string;
  title: string;
  description: string;
  active: boolean;
  draft: boolean;
  tags: string[];
  complexity: LessonContentComplexity;
}

type Props = {
  children?: React.ReactElement;
  open: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  defaultValues?: FormValuesProps;
};

export default function CreateDemonContent({
  children,
  onClose,
  open,
  defaultValues = {
    type: "hello type",
    slug: "helo slug",
    title: "hello title",
    description: "hellog desc",
    active: true,
    draft: true,
    tags: ["Html"],
    complexity: LessonContentComplexity.Beginner,
  },
}: Props): React.ReactElement {
  const CreateLessonDemonSchema = Yup.object().shape({
    type: Yup.string(),
    slug: Yup.string().required("Slug is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    skills: Yup.array(),
  });
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateLessonDemonSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps) => {
    console.log(data);
  };

  return (
    <>
      <Box>{children}</Box>
      <Dialog open={open} onClose={onClose}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <DialogTitle variant="h5" sx={{ pb: 1, pt: 2 }}>
            Demon Content
          </DialogTitle>
          <IconButton onClick={onClose} sx={{ mb: "5px", mr: "14px" }}>
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

                    <RHFSelect native name="level" label="Course level">
                      <option key="empty" value="empty">
                        Select Level
                      </option>
                      <option
                        key="beginner"
                        value={LessonContentComplexity.Beginner}
                      >
                        Beginner
                      </option>
                      <option
                        key="intermediate"
                        value={LessonContentComplexity.Intermediate}
                      >
                        Intermediate
                      </option>
                      <option
                        key="advanced"
                        value={LessonContentComplexity.Advanced}
                      >
                        Advanced
                      </option>
                      <option
                        key="expert"
                        value={LessonContentComplexity.Expert}
                      >
                        Expert
                      </option>
                    </RHFSelect>

                    <Box sx={{ maxWidth: "350px" }}>
                      <CoursesController skills={[]} />
                    </Box>
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
                    <Button onClick={onClose}>Close</Button>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      //   loading={loading}
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
