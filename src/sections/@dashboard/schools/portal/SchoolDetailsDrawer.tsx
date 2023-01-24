import {
  Box,
  Stack,
  Drawer,
  Button,
  Divider,
  Typography,
  IconButton,
  StackProps,
  DrawerProps,
} from "@mui/material";
import { IFile } from "../../../../@types/file";
import Iconify from "../../../../components/iconify";
import Scrollbar from "../../../../components/scrollbar";
import SchoolIcon from "@mui/icons-material/School";
import FormProvider, {RHFSelect, RHFTextField} from "../../../../components/hook-form";
import {countries} from "../../../../assets/data";
import {LoadingButton} from "@mui/lab";
import * as React from "react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
// ----------------------------------------------------------------------

interface Props extends DrawerProps {
  item: IFile;
  onClose: VoidFunction;
  onDelete: VoidFunction;
}

type FormValuesProps = {
  organizationName: string;
  country: string | null;
  address: string | null;
  city: string | null;
};


export default function SchoolDetailsDrawer({
  item,
  open,
  onClose,
  onDelete,
  ...other
}: Props) {
  const { name } = item;

  const UpdateUserSchema = Yup.object().shape({
    schoolName: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
  });

  const defaultValues = {
    schoolName: "",
    phoneNumber: "",
    country: "",
    address: "",
    city: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: {isSubmitting},
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar("Update success!");
      console.log("DATA", data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: 320 },
        }}
        {...other}
      >
        <Scrollbar sx={{ height: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2.5 }}
          >
            <Typography variant="h6"> School Info </Typography>
          </Stack>

          <Stack
            spacing={2.5}
            justifyContent="center"
            sx={{ p: 2.5, bgcolor: "background.neutral" }}
          >
            <SchoolIcon/>
            <Typography variant="h6" sx={{ wordBreak: "break-all" }}>
              {name}
            </Typography>
            <Divider sx={{ borderStyle: "dashed" }} />
            <Stack spacing={1}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Box
                  rowGap={4}
                  display="grid"
                  gridTemplateRows="repeat(8, 1fr)"
                >
                  <RHFTextField name="schoolName" label="School name" required/>

                  <RHFSelect
                    native
                    name="country"
                    label="Country"
                    placeholder="Country"
                  >
                    <option value=""/>
                    {countries.map((country) => (
                      <option key={country.code} value={country.label}>
                        {country.label}
                      </option>
                    ))}
                  </RHFSelect>
                  <RHFTextField name="cite" label="City" required/>
                </Box>
                <Box sx={{mt: 2, height: '100%'}}></Box>
                <Box sx={{mt: 2}}>
                  <LoadingButton
                    fullWidth
                    variant="soft"
                    color="primary"
                    size="large"
                    type="submit"
                    loading={isSubmitting}
                    sx={{mb: 2}}
                    startIcon={<Iconify icon="eva:save-outline" />}
                  >
                    Save Changes
                  </LoadingButton>
                  <Button
                    fullWidth
                    variant="soft"
                    color="error"
                    size="large"
                    startIcon={<Iconify icon="eva:trash-2-outline" />}
                    onClick={onDelete}
                  >
                    Archive
                  </Button>
                </Box>
              </FormProvider>
            </Stack>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

interface PanelProps extends StackProps {
  label: string;
  toggle: boolean;
  onToggle: VoidFunction;
}

function Panel({ label, toggle, onToggle, ...other }: PanelProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      {...other}
    >
      <Typography variant="subtitle2"> {label} </Typography>

      <IconButton size="small" onClick={onToggle}>
        <Iconify
          icon={toggle ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
        />
      </IconButton>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type RowProps = {
  label: string;
  value: string;
};

function Row({ label, value = "" }: RowProps) {
  return (
    <Stack
      direction="row"
      sx={{ typography: "caption", textTransform: "capitalize" }}
    >
      <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
        {label}
      </Box>

      {value}
    </Stack>
  );
}
