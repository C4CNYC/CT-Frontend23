import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IoSettingsOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";

import { FormProvider } from "@components";

import DetailsTab from "./DetailsTab";
import SettingsTab from "./SettingsTab";

export interface FormValuesProps {
  course: string;
  module: string;
  name: string;
  description: string;
  startDate?: string;
  dueDate?: string;
  closeDate?: string;
  status?: string | Date;
  tags?: string[];
}

interface Props {
  isEdit?: boolean;
  defaultValues?: FormValuesProps;
  children: React.ReactElement;
}

export default function AddQuestModal({
  children,
  isEdit,
  defaultValues,
}: Props): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [editorValue, setEditorValue] = useState("");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const CreateQuestSchema = Yup.object().shape({
    course: Yup.string().required("Select course"),
    module: Yup.string().required("Select module"),
    name: Yup.string().required("Name is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateQuestSchema),
    defaultValues,
  });
  const onSubmit = (data: FormValuesProps) => {
    console.log(data);
    try {
    } catch {}
  };
  return (
    <>
      <Box
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{ sx: { pr: 6 } }}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 0,
          }}
        >
          <Stack>
            <Typography variant="h4">Add Quest</Typography>
            <Tooltip title="this is .....">
              <Typography
                variant="caption"
                sx={{ textDecoration: "underline" }}
              >
                What`s a quest?
              </Typography>
            </Tooltip>
          </Stack>
          <Typography variant="subtitle2">Type: Course/Module</Typography>
        </DialogTitle>
        <DialogContent>
          <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons={false}
            sx={{
              pb: 2,
              "& .MuiTabs-indicator": {
                backgroundColor: "#43D4DD",
              },
              "& .MuiTabs-flexContainer": {
                justifyContent: "flex-end",
              },
            }}
          >
            <Tab
              label={"Details"}
              icon={<TbListDetails size={20} />}
              {...a11yProps(0)}
              sx={{ fontSize: "1.1rem" }}
            />
            <Tab
              label={"Settings"}
              icon={<IoSettingsOutline size={20} />}
              sx={{ fontSize: "1.1rem" }}
              {...a11yProps(1)}
            />
          </Tabs>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <CustomTabPanel index={0} value={value}>
              <DetailsTab
                editorValue={editorValue}
                setEditorValue={setEditorValue}
              />
            </CustomTabPanel>
            <CustomTabPanel index={1} value={value}>
              <SettingsTab control={methods.control} />
            </CustomTabPanel>
            <DialogActions
              sx={{
                mt: 4,
                mb: 3,
                gap: 3,
              }}
            >
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                variant="contained"
                sx={{
                  fontSize: "1.1rem",
                  background: "#EAEAEB",
                  border: "2px solid #EAEAEB",
                  textTransform: "uppercase",
                  color: "#364954",
                  width: "240px",
                  py: 0,
                  "&:hover": {
                    background: "#fff",
                    border: "2px solid #EAEAEB",
                    color: "#364954",
                    boxShadow: 0,
                  },
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                sx={{
                  fontSize: "1.1rem",
                  background: "#EE467A",
                  border: "2px solid #EE467A",
                  textTransform: "uppercase",
                  width: "240px",
                  py: 0,
                  mr: { md: 3, lg: 9 },
                  ml: 0,
                  "&:hover": {
                    background: "#fff",
                    border: "2px solid #EE467A",
                    color: "#EE467A",
                    boxShadow: 0,
                  },
                }}
                loading={false}
              >
                Launch
              </LoadingButton>
            </DialogActions>
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

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ px: { xs: 0, ms: 4, md: 6, lg: 12 }, minHeight: "628px" }}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
