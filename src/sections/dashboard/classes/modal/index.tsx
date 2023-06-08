import { ClassMembersAutocomplete } from "@components/class-members-autocomplete";
import { ClassMentorsAutocomplete } from "@components/class-mentors-autocomplete";
import { ClassCoursesAutocomplete } from "@components/ClassCoursesAutocomplete";
import FormProvider from "@components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Role } from "src/redux/services/enums/role.enum";
import { RootState } from "src/redux/store";
import * as Yup from "yup";
import AddClassTab from "./AddClassTab";

interface FormValuesProps {
  name: string;
  description: string;
  avatar?: File;
}

interface Props {
  children?: React.ReactElement;
  updateClass: (name: string, description: string, uploadedFile?: File) => void;
  defaultValues: { name: string; description: string };
  rowId: string;
  updateResult: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const UpdateUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

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
        <Box sx={{ p: 2 }}>
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

export default function ClassPreferences({
  children,
  updateClass,
  defaultValues,
  rowId,
  updateResult,
}: Props): React.ReactElement {
  const [open, setOpenDialog] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  const userRole = useSelector((state: RootState) => state.global?.user?.role);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const onSubmit = (data: FormValuesProps): void => {
    updateClass?.(data.name, data.description, data.avatar);
  };
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        methods.setValue("avatar", newFile, { shouldValidate: false });
      }
    },
    [methods.setValue]
  );
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
        fullWidth
        open={open}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <DialogTitle variant="h5" sx={{ pb: 1, pt: 2 }}>
          Class Preferences
        </DialogTitle>
        <Box sx={{ width: "100%" }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <DialogContent sx={{ p: 0, height: { xs: "530px", sm: "400px" } }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider", pl: 3 }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="General" {...a11yProps(0)} />
                  <Tab label="Mates" {...a11yProps(1)} />
                  <Tab label="Courses" {...a11yProps(2)} />

                  {userRole !== Role.Manager ? (
                    <Tab label="Mentors" {...a11yProps(3)} />
                  ) : null}
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <AddClassTab handleDrop={handleDrop} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ClassMembersAutocomplete classId={rowId} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ClassCoursesAutocomplete classId={rowId} />
              </TabPanel>
              {userRole !== Role.Manager ? (
                <TabPanel value={value} index={3}>
                  <ClassMentorsAutocomplete classId={rowId} />
                </TabPanel>
              ) : null}
            </DialogContent>
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
                      setOpenDialog(false);
                    }}
                  >
                    Close
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={updateResult}
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
                      setOpenDialog(false);
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </DialogActions>
            )}
          </FormProvider>
        </Box>
      </Dialog>
    </>
  );
}
