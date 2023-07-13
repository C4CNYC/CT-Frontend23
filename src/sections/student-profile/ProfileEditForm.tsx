import { useCallback, useEffect, useMemo } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import { FormProvider, RHFTextField, RHFUploadAvatar } from "@components";
import { BaseResponseInterface, fData } from "@utils";
import {
  useUdpateProfileAvatarMutation,
  useUpdateProfileMutation,
} from "src/redux/services/auth";
import { IUser } from "src/redux/services/interfaces/user.interface";

interface FormValuesProps extends Omit<IUser, keyof BaseResponseInterface> {
  photoURL: File & { preview: string };
}

interface Props {
  isEdit?: boolean;
  currentUser?: IUser & BaseResponseInterface;
}
export default function ProfileEditForm({
  isEdit,
  currentUser,
}: Props): React.ReactElement {
  const [updateUser] = useUpdateProfileMutation();
  const [updateProfileAvatar] = useUdpateProfileAvatarMutation();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required("Name is required"),
    last_name: Yup.string().required("Surename is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });
  const defaultValues = useMemo(
    () => ({
      first_name: currentUser?.first_name ?? "",
      last_name: currentUser?.last_name ?? "",
      email: currentUser?.email ?? "",
    }),
    [currentUser]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentUser]);

  const updateAvatar = async (
    id: string,
    photoURL?: File
  ): Promise<unknown> => {
    if (!id ?? !photoURL) return;

    const file = new FormData();
    file.append("file", photoURL);

    await updateProfileAvatar({
      file,
    }).unwrap();
  };

  const onSubmit = async ({
    photoURL,
    ...data
  }: FormValuesProps): Promise<void> => {
    try {
      if (currentUser?.id) {
        const { email, ...body } = data;
        await updateUser({
          ...body,
        }).unwrap();
        enqueueSnackbar("Update success!");
        if (!photoURL) return;
        await updateAvatar(currentUser?.id, photoURL);
      }
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
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <RHFUploadAvatar
                  name="photoURL"
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
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>
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
                <RHFTextField name="first_name" label="First Name" />
                <RHFTextField name="last_name" label="Last Name" />
                <RHFTextField
                  disabled={!isEdit}
                  name="email"
                  label="Email Address"
                />
              </Box>

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
    </>
  );
}
