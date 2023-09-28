import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  DialogActions,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
  useSnackbar,
} from "@components";
import { useAddLessonToModuleMutation } from "src/redux/services/manager/modules-manager";

import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
} from "../../../../redux/services/manager/lessons-manager";
import { IntegrationsTab } from "../LessonStep/Modals/Preferences/IntegrationsTab";
import SkillsTab from "./SkillsTab";
import TipsTab from "./TipsTab";

interface FormValuesProps {
  name: string;
  description: string;
  active: boolean;
  tips: string;
}

interface ICreateLessonDialogProps {
  defaultValues?: FormValuesProps;
  children: React.ReactElement;
  isEdit?: boolean;
  id?: string;
  contentId?: string;
  lessonTips: string[];
}

export default function CreateLessonDialog({
  id,
  isEdit,
  children,
  defaultValues,
  lessonTips,
}: ICreateLessonDialogProps): React.ReactElement {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const [editLesson, { isLoading: isLoadingUpdate }] =
    useUpdateLessonMutation();
  const [createLesson, { isLoading: isLoadingCreate }] =
    useCreateLessonMutation();
  const [addLessonToModule, { isLoading: isLoadingAdd }] =
    useAddLessonToModuleMutation();

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
    try {
      if (isEdit && id) {
        await editLesson({
          id,
          ...data,
          tips:
            data.tips.trim() !== "" ? [...lessonTips, data.tips] : lessonTips,
        }).unwrap();
        methods.resetField("tips");
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
        methods.reset();
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
    if (!isEdit) {
      handleClose();
    }
  };

  const deleteTip = async (tips: string[]): Promise<void> => {
    try {
      if (isEdit && id) {
        await editLesson({
          id,
          ...methods.getValues(),
          tips: lessonTips.filter((t) => !tips.includes(t)),
        }).unwrap();
        enqueueSnackbar("Tip deleted!");
      }
    } catch (error) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
  };

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  return (
    <>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit" : "Create"} Lesson</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider", pl: 2 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Main" {...a11yProps(0)} />
                <Tab label="Skills" {...a11yProps(1)} />
                <Tab label="Integration" {...a11yProps(2)} />
                {isEdit ? <Tab label="Tips" {...a11yProps(3)} /> : null}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Stack gap={2} mt={1}>
                <RHFTextField name="name" label="Lesson name" required />

                <RHFTextField
                  name="description"
                  label="Lesson description"
                  required
                  multiline
                  rows={3}
                />

                <RHFTextField
                  name="tips"
                  placeholder="Enter tip"
                  label="Add tip"
                />

                <RHFSwitch name="active" label="Lesson active" />
              </Stack>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SkillsTab lessonId={id as string} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <IntegrationsTab contentId={id as string} />
            </TabPanel>
            {isEdit ? (
              <TabPanel value={value} index={3}>
                <TipsTab
                  tips={lessonTips ?? []}
                  deleteTip={deleteTip}
                  isLoading={isLoadingUpdate}
                />
              </TabPanel>
            ) : null}

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
                    loading={isLoadingAdd || isLoadingCreate || isLoadingUpdate}
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
            px: { xs: 2, sm: 3 },
            pt: 2,
            width: { xs: "320px", sm: "370px" },
            height: "320px",
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
