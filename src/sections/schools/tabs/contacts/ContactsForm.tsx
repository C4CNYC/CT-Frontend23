import { yupResolver } from "@hookform/resolvers/yup";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";

import { FormProvider, RHFTextField } from "@components";
import { useUpdateSchoolContactsMutation } from "src/redux/services/manager/schools-manager";

import { SchoolContacts } from "../../../../redux/services/interfaces/school.interface";

const UpdateUserSchema = Yup.object().shape({
  email: Yup.string().email("Email must be a valid email address"),
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  technical_email: Yup.string().email("Email must be a valid email address"),
  technical_name: Yup.string().required("Technical name is required"),
  technical_phone: Yup.string().required("Technical phone is required"),
  billing_email: Yup.string().email(
    "Billing email must be a valid email address"
  ),
  billing_name: Yup.string().required("Billing name is required"),
  billing_phone: Yup.string().required("Billing phone is required"),
});

interface FormValuesProps {
  schoolId: string;
  email: string;
  name: string;
  phone: string;
  technical_email: string;
  technical_name: string;
  technical_phone: string;
  billing_email: string;
  billing_name: string;
  billing_phone: string;
}

interface ContactsFormProps {
  contacts?: SchoolContacts;
  schoolId: string;
}

export default function ContactsForm({
  contacts,
  schoolId,
}: ContactsFormProps): React.ReactElement | null {
  const [updateContacts, { isLoading }] = useUpdateSchoolContactsMutation();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    schoolId,
    email: contacts?.email,
    name: contacts?.name,
    phone: contacts?.phone,
    technical_email: contacts?.technical_email,
    technical_name: contacts?.technical_name,
    technical_phone: contacts?.technical_phone,
    billing_email: contacts?.billing_email,
    billing_name: contacts?.billing_name,
    billing_phone: contacts?.billing_phone,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await updateContacts({
        schoolId: data.schoolId,
        email: data.email,
        name: data.name,
        phone: data.phone,
        technical_email: data.technical_email,
        technical_name: data.technical_name,
        technical_phone: data.technical_phone,
        billing_email: data.billing_email,
        billing_name: data.billing_name,
        billing_phone: data.billing_phone,
      }).unwrap();
      enqueueSnackbar("Update success!");
    } catch (error: any) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contacts
            </Typography>

            <Box
              rowGap={2}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(3, 1fr)",
              }}
              gridTemplateRows={{
                xs: "repeat(4, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="name" label="Name" />

              <RHFTextField name="email" label="Email Address" />

              <Controller
                name="phone"
                rules={{ validate: matchIsValidTel }}
                render={({ field, fieldState }) => (
                  <MuiTelInput
                    {...field}
                    helperText={fieldState.invalid ? "Phone is invalid" : ""}
                    error={fieldState.invalid}
                    placeholder="Mobile number"
                  />
                )}
              />
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Technical Contacts
            </Typography>

            <Box
              rowGap={2}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(3, 1fr)",
              }}
              gridTemplateRows={{
                xs: "repeat(4, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="technical_name" label="Name" />

              <RHFTextField name="technical_email" label="Email Address" />

              <Controller
                name="technical_phone"
                rules={{ validate: matchIsValidTel }}
                render={({ field, fieldState }) => (
                  <MuiTelInput
                    {...field}
                    helperText={fieldState.invalid ? "Phone is invalid" : ""}
                    error={fieldState.invalid}
                    placeholder="Mobile number"
                  />
                )}
              />
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Billing Contacts
            </Typography>

            <Box
              rowGap={2}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(3, 1fr)",
              }}
              gridTemplateRows={{
                xs: "repeat(4, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="billing_name" label="Name" />

              <RHFTextField name="billing_email" label="Email Address" />

              <Controller
                name="billing_phone"
                rules={{ validate: matchIsValidTel }}
                render={({ field, fieldState }) => (
                  <MuiTelInput
                    {...field}
                    helperText={fieldState.invalid ? "Phone is invalid" : ""}
                    error={fieldState.invalid}
                    placeholder="Mobile number"
                  />
                )}
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mb: 10 }}>
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
