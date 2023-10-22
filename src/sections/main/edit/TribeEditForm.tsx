import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { MuiColorInput } from "mui-color-input";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";

import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar, // useSnackbar,
} from "@components";
import { BaseResponseInterface, getRandomColor } from "@utils";
import { countries } from "src/assets/data";
import { IStudent } from "src/redux/services/interfaces/user.interface";

interface FormValuesProps extends Omit<IStudent, keyof BaseResponseInterface> {
  avatarUrl: File & { preview: string };
}

// interface Props {
//   isEdit?: boolean;
//   currentUser?: IStudent & BaseResponseInterface;
// }

export default function TribeEditForm(): React.ReactElement | null {
  // const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    country: Yup.string(),
    about: Yup.string(),
    active: Yup.boolean(),
    cover: Yup.string(),
  });

  const defaultValues = {
    name: "",
    country: "",
    about: "",
    cover: getRandomColor(),
    active: false,
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const updateAvatar = async (
  //   id: string,
  //   photoURL?: File
  // ): Promise<unknown> => {
  //   if (!id ?? !photoURL) {
  //     return;
  //   }

  //   const file = new FormData();
  //   file.append("file", photoURL);
  // };

  const onSubmit = async (): Promise<void> => {
    // try {
    // } catch (error: any) {
    //   enqueueSnackbar(error?.data?.message, {
    //     variant: "error",
    //   });
    // }
  };
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatarUrl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
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
                  ></Typography>
                }
              />
              <Stack>
                <Typography variant="body2">Cover color</Typography>
                <Controller
                  control={methods.control}
                  name="cover"
                  render={({ field, fieldState }) => (
                    <MuiColorInput
                      sx={{ width: "100%", pt: 1 }}
                      {...field}
                      value={field.value}
                      helperText={fieldState.invalid ? "Color is invalid" : ""}
                      error={fieldState.invalid}
                      isAlphaHidden
                      format="hex"
                    />
                  )}
                />
              </Stack>
            </Box>

            <RHFSwitch
              name="verified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Disabling this will automatically send the user a
                    verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
            />
            <RHFSwitch
              name="active"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    User Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Disabled user dont have access to resorce
                  </Typography>
                </>
              }
              sx={{
                mx: 0,
                my: 1,
                width: 1,
                justifyContent: "space-between",
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              sx={{ mb: 3 }}
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="name" label="Tribe name" />
              <RHFSelect native name="country" label="Country">
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <RHFTextField
              fullWidth
              multiline
              rows={3}
              sx={{ h: 10 }}
              name="about"
              label="About"
            />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
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
