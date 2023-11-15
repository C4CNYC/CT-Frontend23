import { yupResolver } from "@hookform/resolvers/yup";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack } from "@mui/material";

import { FormProvider, RHFSelect, RHFTextField } from "@components";
import {
  useUpdateSchoolAvatarImgMutation,
  useUpdateSchoolProfileMutation,
} from "src/redux/services/manager/schools-manager";
import { useTranslate } from "src/utils/translateHelper";

import { countries } from "../../../../../assets/data";
import { SchoolProfile } from "../../../../../redux/services/interfaces/school.interface";

const UpdateSchoolSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  active: Yup.boolean(),
  about: Yup.string(),
  phone: Yup.string(),
});

interface FormValuesProps {
  name: string;
  country: string;
  address: string;
  city: string;
  active: boolean;
  about: string;
  phone: string;
}

interface SchoolProfileFormProps {
  schoolProfile?: SchoolProfile;
  schoolId: string;
  file: File;
  setImgValue: (images: File[]) => void;
}

export default function SchoolProfileForm({
  schoolProfile,
  schoolId,
  file,
  setImgValue,
}: SchoolProfileFormProps): React.ReactElement | null {
  const translate = useTranslate();
  const [updateSchoolAvatar, { isLoading: isLoadingAvatar }] =
    useUpdateSchoolAvatarImgMutation();
  const [updateSchoolProfile, { isLoading }] = useUpdateSchoolProfileMutation();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    name: schoolProfile?.name ?? "",
    country: schoolProfile?.country ?? "",
    address: schoolProfile?.address ?? "",
    city: schoolProfile?.city ?? "",
    active: schoolProfile?.active ?? false,
    about: schoolProfile?.about ?? "",
    phone: schoolProfile?.phone ?? "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateSchoolSchema),
    mode: "all",
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (formData: FormValuesProps): Promise<void> => {
    try {
      if (file) {
        const formDataImg = new FormData();
        formDataImg.append("file", file);
        await updateSchoolAvatar({
          id: schoolId,
          file: formDataImg,
        }).unwrap();
        setImgValue([]);
        enqueueSnackbar(translate("messages_cover_success"));
      }
      if (methods.formState.isDirty) {
        await updateSchoolProfile({
          schoolId,
          name: formData.name,
          country: formData.country,
          address: formData.address,
          city: formData.city,
          active: formData.active ?? false,
          about: formData.about ?? "",
          phone: formData.phone,
        }).unwrap();
        methods.reset({}, { keepValues: true, keepIsValid: true });
        enqueueSnackbar(translate("messages_update_info_success"));
      }
    } catch (error: any) {
      enqueueSnackbar(error.message.text, { variant: "error" });
    }
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
              }}
              gridTemplateRows={{
                xs: "repeat(1, 1fr)",
              }}
            >
              <RHFTextField name="name" label={translate("name")} />

              <RHFSelect native name="country" label={translate("country")}>
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="address" label={translate("address")} />

              <RHFTextField name="city" label={translate("city")} />

              <Controller
                name="phone"
                rules={{ validate: matchIsValidTel }}
                render={({ field, fieldState }) => (
                  <MuiTelInput
                    {...field}
                    helperText={
                      fieldState.invalid
                        ? translate("messages_invalid_phone")
                        : ""
                    }
                    error={fieldState.invalid}
                  />
                )}
              />

              <RHFTextField
                fullWidth
                name="about"
                label={translate("about")}
                multiline
                rows={5}
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 7 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading || isLoadingAvatar}
              >
                {translate("actions_save_changes")}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
