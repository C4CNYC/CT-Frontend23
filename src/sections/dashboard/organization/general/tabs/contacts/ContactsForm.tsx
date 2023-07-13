import { yupResolver } from "@hookform/resolvers/yup";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack } from "@mui/material";

import { FormProvider, RHFTextField } from "@components";
import { useUpdateOrgContactsMutation } from "src/redux/services/admin/organization-contacts";
import { ContactsResponce } from "src/redux/services/interfaces/organization.interface";

const UpdateUserSchema = Yup.object().shape({
  email: Yup.string().email("Email must be a valid email address"),
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
});

interface FormValuesProps {
  email: string;
  title: string;
  name: string;
  phone: string;
}

interface ContactsFormProps {
  contacts?: ContactsResponce;
}

export default function ContactsForm({
  contacts,
}: ContactsFormProps): React.ReactElement | null {
  const [updateContacts, { isLoading }] = useUpdateOrgContactsMutation();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    email: contacts?.email ?? "",
    title: contacts?.title ?? "",
    name: contacts?.name ?? "",
    phone: contacts?.phone ?? "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await updateContacts({
        email: data.email,
        title: data.title,
        name: data.name,
        phone: data.phone,
      });
      enqueueSnackbar("Update success!");
    } catch (error: any) {}
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
              gridTemplateRows={{
                xs: "repeat(3, 1fr)",
              }}
            >
              <RHFTextField name="name" label="Name" />

              <RHFTextField name="email" label="Email Address" />

              <RHFTextField name="title" label="Title" />

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
