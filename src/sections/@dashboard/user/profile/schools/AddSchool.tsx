import * as React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "../../../../../components/hook-form";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { fData } from "../../../../../utils/formatNumber";
import { countries } from "../../../../../assets/data";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "../../../../../components/snackbar";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import { CustomFile } from "../../../../../components/upload";

type FormValuesProps = {
  organizationName: string;
  email: string;
  phoneNumber: string | null;
  country: string | null;
  address: string | null;
  city: string | null;
};

export default function AddSchool() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const UpdateUserSchema = Yup.object().shape({
    schoolName: Yup.string().required("Name is required"),
    adminEmail: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    phoneNumber: Yup.string().required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    admin2Address: Yup.string().required("Address is required"),
    admin2PhoneNumber: Yup.string().required("Phone number is required"),
  });

  const defaultValues = {
    schoolName: "",
    adminEmail: "",
    phoneNumber: "",
    country: "",
    address: "",
    city: "",
    admin2Address: "",
    admin2PhoneNumber: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
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
      <Button
        onClick={handleClickOpen}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add School
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add School</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box
                    rowGap={3}
                    columnGap={1}
                    display="grid"
                    gridTemplateColumns={{
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                    }}
                  >
                    <RHFTextField
                      name="schoolName"
                      label="School name"
                      required
                    />

                    <RHFSelect
                      native
                      name="country"
                      label="Country"
                      placeholder="Country"
                    >
                      <option value="" />
                      {countries.map((country) => (
                        <option key={country.code} value={country.label}>
                          {country.label}
                        </option>
                      ))}
                    </RHFSelect>

                    <RHFTextField name="cite" label="City" required />

                    <RHFTextField name="admin" label="School admin" required />

                    <Box style={{ gridColumn: "1 / span 2" }}>
                      <Typography variant="h6" paragraph>
                        Admin 2
                      </Typography>
                    </Box>

                    <RHFTextField
                      name="admin"
                      label="School admin 2"
                      required
                    />

                    <RHFTextField
                      name="admin2Address"
                      label="School admin address"
                      required
                    />

                    <RHFTextField
                      name="admin2Phone"
                      label="School admin phone"
                      required
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      mt: 7,
                    }}
                  >
                    <Button onClick={handleClose}>Close</Button>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                    >
                      Save Changes
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
