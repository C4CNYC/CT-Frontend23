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
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  FormProvider,
  ModuleLessonsAutocomplete,
  RHFSwitch,
  RHFTextField,
  useSnackbar,
} from "@components";
import { useAddModuleToCourseMutation } from "src/redux/services/manager/courses-manager";

import {
  useCreateModuleMutation,
  useUpdateModuleMutation,
} from "../../../redux/services/manager/modules-manager";

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
export default function CreateModuleDialog({
  id,
  isEdit,
  children,
  defaultValues,
}: Prop): React.ReactElement {
  const { query } = useRouter();
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const [addToCourse, { isLoading: isAddToCourseLoading }] =
    useAddModuleToCourseMutation();
  const [editModule, { isLoading: isEditLoading }] = useUpdateModuleMutation();
  const [createModule, { isLoading: isCreateLoading }] =
    useCreateModuleMutation();

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
        await editModule({
          id,
          ...data,
        }).unwrap();
      } else {
        const module = await createModule(data).unwrap();
        if (query.course_id) {
          await addToCourse({
            id: query.course_id as string,
            unit_id: module.id,
          }).unwrap();
        }
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      methods.reset();
      handleClose();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
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
      <Box
        onClick={() => {
          handleClickOpen();
        }}
      >
        {children}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit" : "Create"} Module</DialogTitle>
        <DialogContent sx={{ p: 0, mt: "-10px" }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider", pl: 3 }}>
              {isEdit ? (
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="General" {...a11yProps(0)} />
                  <Tab label="Lessons" {...a11yProps(1)} />
                </Tabs>
              ) : null}
            </Box>
            <TabPanel value={value} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Box rowGap={3} display="grid" mt={2}>
                    <RHFTextField
                      sx={{
                        width: { xs: "100%", sm: "350px" },
                        minWidth: "300px",
                      }}
                      name="name"
                      label="Module name"
                      required
                    />

                    <RHFTextField
                      name="description"
                      label="Module description"
                      required
                      multiline
                      rows={3}
                    />

                    <RHFSwitch name="active" label="Module active" />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box
                sx={{
                  width: { xs: "300px", sm: "350px" },
                  minWidth: "300px",
                  height: "260px",
                }}
              >
                <ModuleLessonsAutocomplete id={id as string} />
              </Box>
            </TabPanel>
            <DialogActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button onClick={handleClose}>Close</Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={
                    isEditLoading || isCreateLoading || isAddToCourseLoading
                  }
                >
                  Save
                </LoadingButton>
              </Box>
            </DialogActions>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
