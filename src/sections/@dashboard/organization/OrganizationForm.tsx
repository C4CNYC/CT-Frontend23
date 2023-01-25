import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Grid, Card, Typography, Stack, Box } from "@mui/material";
import { fData } from "src/utils/formatNumber";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from "../../../components/hook-form";
import {
  OrganizationResponce,
  useUpdateOrganizationMutation,
} from "src/redux/services/admin";

const UpdateUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email must be a valid email address"),
  url: Yup.string()
    .url("Url mast be a valid")
    .required("Company / Organization Website is required"),
});

type FormValuesProps = {
  name: string;
  email: string;
  address: string;
  url: string;
};

type OrganizationFormProps = {
  organization?: OrganizationResponce;
};

export default function OrganizationForm({
  organization,
}: OrganizationFormProps) {
  const [updateOrg, { isLoading }] = useUpdateOrganizationMutation();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    name: organization?.name || "",
    email: organization?.email || "",
    address: organization?.address || "",
    url: organization?.url || "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const { setValue, handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await updateOrg({
        id: organization?.id as string,
        body: {
          name: data.name,
          email: data.email || null,
          url: data.url,
          address: data.address,
        },
      });
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
        // setValue("photoURL", newFile, { shouldValidate: true });
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
              <RHFTextField name="name" label="Name" />

              <RHFTextField name="email" label="Email Address" />

              <RHFTextField name="url" label="Url" />

              <RHFTextField name="address" label="Address" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 7 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
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
