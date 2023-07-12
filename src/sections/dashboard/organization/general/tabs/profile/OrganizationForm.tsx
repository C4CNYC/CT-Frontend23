import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";

import { FormProvider, RHFTextField, RHFUploadAvatar } from "@components";
import { fData } from "@utils";
import {
  useUpdateOrgAvatarMutation,
  useUpdateOrganizationMutation,
} from "src/redux/services/admin/organization-admin";
import { OrganizationResponce } from "src/redux/services/interfaces/organization.interface";

import { useLocales } from "../../../../../../locales";

const UpdateUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email must be a valid email address"),
  url: Yup.string()
    .url("Url mast be a valid")
    .required("Company / Organization Website is required"),
});

interface FormValuesProps {
  name: string;
  email: string;
  address: string;
  url: string;
  photoURL: File | null;
}

interface OrganizationFormProps {
  organization?: OrganizationResponce;
}

export default function OrganizationForm({
  organization,
}: OrganizationFormProps): React.ReactElement | null {
  const { translate } = useLocales();
  const [updateOrg, { isLoading }] = useUpdateOrganizationMutation();
  const [updateOrgAvatar] = useUpdateOrgAvatarMutation();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    name: organization?.title ?? "",
    email: organization?.email ?? "",
    address: organization?.address ?? "",
    url: organization?.url ?? "",
    photoURL: null,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const { setValue, handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await updateOrg({
        body: {
          title: data.name,
          email: data.email ?? null,
          url: data.url,
          address: data.address,
        },
      }).unwrap();
      if (data.photoURL) {
        const file = new FormData();
        file.append("file", data.photoURL);
        updateOrgAvatar({
          file,
        })
          .unwrap()
          .catch((error) => {
            enqueueSnackbar(error?.data?.message, {
              variant: "error",
            });
          });
      }
      enqueueSnackbar("Update success!");
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
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
              maxSize={200000}
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
                    whiteSpace: "pre-line",
                  }}
                >
                  {`${translate(
                    "organizations.general_page.tabs.content.profile.upload_image",
                    {
                      formats: "png",
                      size: fData(200000),
                    }
                  )}`}
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
              gridTemplateRows={{
                xs: "repeat(3, 1fr)",
              }}
            >
              <RHFTextField
                name="name"
                label={`${translate(
                  "organizations.general_page.tabs.content.profile.name_input"
                )}`}
              />

              <RHFTextField
                name="email"
                label={`${translate(
                  "organizations.general_page.tabs.content.profile.email_input"
                )}`}
              />

              <RHFTextField
                name="url"
                label={`${translate(
                  "organizations.general_page.tabs.content.profile.url_input"
                )}`}
              />

              <RHFTextField
                name="address"
                label={`${translate(
                  "organizations.general_page.tabs.content.profile.address_input"
                )}`}
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 7 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
              >
                {`${translate("actions_save_changes")}`}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
