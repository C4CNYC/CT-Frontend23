import { javascript } from "@codemirror/lang-javascript";
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
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import _ from "lodash";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
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
  skills: Yup.array(),
});

interface Props {
  children?: React.ReactElement;
  lessonId: string;
  contentId: string;
  defaultValues?: FormValuesProps;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
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
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        ..._.omit(data, ["createdAt", "updatedAt", "cover"]),
        id: contentId,
      }).unwrap();
      enqueueSnackbar("Your step is udpated successfully");
      setOpenDialog(false);
    } catch (e) {
      enqueueSnackbar("sorry something went wrong", { variant: "error" });
    }
  };
  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    console.log("value:", value);
  }, []);
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
            Lesson Step Preferences
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
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pl: 3 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{
                  p: 2,
                  mr: 0,
                  "&.Mui-selected": {
                    backgroundColor: "ThreeDFace",
                    borderRadius: "8px",
                  },
                }}
                label="Main"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "ThreeDFace",
                    borderRadius: "8px",
                  },

                  p: 2,
                  ml: "-30px",
                }}
                label="Preload"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <DialogContent sx={{ p: 0 }}>
              <FormProvider
                methods={methods}
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <Grid item xs={12} md={8}>
                  <Card sx={{ p: 1 }}>
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
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DialogContent sx={{ width: "100%" }}>
              <Typography variant="h5" mb="10px">
                Solution
              </Typography>
              <Box mb="15px">
                <CodeMirror
                  value="console.log('hello world!');"
                  height="200px"
                  width="500px"
                  extensions={[javascript({ jsx: true })]}
                  onChange={onChange}
                />
              </Box>
              <Typography variant="h5" mb="10px">
                Preload Code
              </Typography>
              <Box>
                <CodeMirror
                  value="console.log('hello world!');"
                  height="200px"
                  width="500px"
                  extensions={[javascript({ jsx: true })]}
                  onChange={onChange}
                />
              </Box>
            </DialogContent>
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
          </TabPanel>
        </Box>
      </Dialog>
    </>
  );
}
