import {
  RHFTextField,
  RHFUploadAvatar,
  FormProvider,
} from "@ct-nx/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Card, Grid, Stack } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { IUser } from "src/redux/interfaces/auth.interface";
import {
  useUdpateProfileAvatarMutation,
  useUpdateProfileMutation,
} from "src/redux/services/auth";
import * as Yup from "yup";

const UpdateUserSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  about: Yup.string(),
  username: Yup.string(),
  phone: Yup.string(),
  postcode: Yup.string(),
  cover: Yup.string(),
});

interface FormValuesProps {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  about: string;
  phone: string;
  username: string;
  postcode: string;
  cover: string;
  photoURL: File | null;
}

interface Props {
  data: IUser;
}

export default function ProfileInfoForm({
  data,
}: Props): React.ReactElement | null {
  const {
    first_name: firstName,
    last_name: lastName,
    post_code: postcode,
    email,
    about,
    phone,
    username,
  } = data;
  const cover = !data.cover ? "#5be49b" : data.cover;
  const { enqueueSnackbar } = useSnackbar();
  const [updateStudent, { isLoading }] = useUpdateProfileMutation();
  const [updateStudentvatar] = useUdpateProfileAvatarMutation();
  const defaultValues = {
    firstName,
    lastName,
    about,
    phone,
    postcode,
    username,
    cover,
    email,
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const { setValue, handleSubmit, control } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await updateStudent({
        about: data.about,
        // phone: data.phone,
        first_name: data.firstName,
        last_name: data.lastName,
        post_code: data.postcode,
        cover: data.cover,
      }).unwrap();
      if (username !== data.username) {
        updateStudent({ username: data.username })
          .unwrap()
          .catch((error) => {
            enqueueSnackbar(error?.data?.message, {
              variant: "error",
            });
          });
      }
      if (data.photoURL) {
        const file = new FormData();
        file.append("file", data.photoURL);
        updateStudentvatar({
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
    } catch (error) {
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
        <Grid
          item
          sx={{
            flexGrow: 1,
          }}
        >
          <Card sx={{ p: 3, display: "flex", flexDirection: "column" }}>
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "column", md: "row" },
              }}
            >
              <Stack gap={3}>
                <RHFUploadAvatar
                  name="photoURL"
                  maxSize={200000}
                  onDrop={handleDrop}
                />
                <Controller
                  control={control}
                  name="cover"
                  render={({ field, fieldState }) => (
                    <MuiColorInput
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
              <Stack
                sx={{
                  flexGrow: 1,
                  gap: 3,
                  pl: { sm: 0, md: 4 },
                  pt: { xs: 3, sm: 3, md: 1 },
                }}
              >
                <RHFTextField name="firstName" label="Name" />
                <RHFTextField name="lastName" label="Last name" />
                <RHFTextField name="username" label="username" />
              </Stack>
            </Stack>
            <Stack sx={{ gap: 3, pt: 3 }}>
              <RHFTextField name="email" label="email" disabled />
              <RHFTextField name="postcode" label="postcode" />
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
              <RHFTextField name="about" label="about" multiline rows={5} />
            </Stack>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{ alignSelf: "flex-end", mt: 5 }}
            >
              Save
            </LoadingButton>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
