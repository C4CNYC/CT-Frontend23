import * as Yup from "yup";
import { useCallback } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Box, Grid, Card, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// auth
import { useAuthContext } from "../../../../../auth/useAuthContext";
// utils
import { fData } from "../../../../../utils/formatNumber";
// assets
import { countries } from "../../../../../assets/data";
// components
import { CustomFile } from "../../../../../components/upload";
import { useSnackbar } from "../../../../../components/snackbar";
import FormProvider, {
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "../../../../../components/hook-form";

// ----------------------------------------------------------------------

type FormValuesProps = {
  organizationName: string;
  email: string;
  photoURL: CustomFile | string | null;
  phoneNumber: string | null;
  country: string | null;
  address: string | null;
  city: string | null;
  site: string | null;
  brandName: string | null;
  domain: string | null;
};

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    organizationName: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    photoURL: Yup.string().required("Avatar is required").nullable(true),
    phoneNumber: Yup.string().required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    site: Yup.string().required("Company / Organization Website is required"),
    brandName: Yup.string().required("Brand name is required"),
    domain: Yup.string().required("Domain is required"),
  });

  const defaultValues = {
    organizationName: user?.organizationName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || null,
    phoneNumber: user?.phoneNumber || "",
    country: user?.country || "",
    address: user?.address || "",
    city: user?.city || "",
    site: user?.site || "",
    brandName: user?.brandName || "",
    domain: user?.domain || "",
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

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("photoURL", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
            <RHFUploadAvatar
              name="photoURL"
              maxSize={30000}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  Allowed transparent *.png
                  <br /> max size of {fData(30000)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="organizationName" label="Name" />

              <RHFTextField name="email" label="Email Address" />

              <RHFTextField name="phoneNumber" label="Phone Number" />

              <RHFTextField name="address" label="Address" />

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

              <RHFTextField name="city" label="City" />

            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 7 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
