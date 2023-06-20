import FormProvider, { RHFSwitch, RHFTextField } from "@components/hook-form";

import { useSnackbar } from "@components/snackbar";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  DialogActions,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddLessonToModuleMutation } from "src/redux/services/manager/modules-manager";
import * as Yup from "yup";
import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
} from "../../../../redux/services/manager/lessons-manager";
import { IntegrationsTab } from "../LessonStep/Modals/Preferences/IntegrationsTab";
import SkillsTab from "./SkillsTab";

interface FormValuesProps {
  name: string;
  description: string;
  active: boolean;
}

interface Prop {
  defaultValues?: FormValuesProps;
  children: React.ReactElement;
  isEdit?: boolean;
  id?: string;
  contentId?: string;
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
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
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

export default function CreateLessonDialog({
  id,
  isEdit,
  children,
  defaultValues,
}: Prop): React.ReactElement {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [editLesson] = useUpdateLessonMutation();
  const [createLesson] = useCreateLessonMutation();
  const [addLessonToModule] = useAddLessonToModuleMutation();

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const CreateCourseSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateCourseSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    setLoading(true);
    try {
      if (isEdit && id) {
        await editLesson({
          id,
          ...data,
        }).unwrap();
      } else {
        const lesson = await createLesson({
          ...data,
        }).unwrap();
        if (router.query.module_id) {
          addLessonToModule({
            id: router.query.module_id as string,
            lesson_id: lesson.id,
          });
        }
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      methods.reset();
    } catch (error) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
    setLoading(false);
    // eslint-disable-next-line no-eval
    handleClose();
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }} onClick={handleClickOpen}>
        {children}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit" : "Create"} Lesson</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider", pl: 3 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Main" {...a11yProps(0)} />
                <Tab label="Skills" {...a11yProps(1)} />
                <Tab label="Integration" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Grid item xs={12} md={12} mt={2}>
                <Box rowGap={4} display="grid">
                  <RHFTextField
                    sx={{
                      width: { xs: "300px", sm: "350px" },
                      minWidth: "300px",
                    }}
                    name="name"
                    label="Lesson name"
                    required
                  />

                  <RHFTextField
                    name="description"
                    label="Lesson description"
                    required
                    multiline
                    rows={3}
                  />

                  <RHFSwitch name="active" label="Module active" />
                </Box>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box
                sx={{
                  width: { xs: "100%", sm: "350px" },
                  minWidth: "300px",
                  height: "276px",
                }}
              >
                <SkillsTab lessonId={id as string} />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Box
                sx={{
                  width: { xs: "300px", sm: "350px" },
                  minWidth: "300px",
                  height: "276px",
                }}
              >
                <IntegrationsTab contentId={id as string} />
              </Box>
            </TabPanel>
            {value === 0 ? (
              <DialogActions>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                  }}
                >
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Close
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={false}
                  >
                    Save
                  </LoadingButton>
                </Box>
              </DialogActions>
            ) : (
              <DialogActions>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                  }}
                >
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </DialogActions>
            )}
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
