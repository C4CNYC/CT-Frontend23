import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import generator from "generate-password";
import { MuiColorInput } from "mui-color-input";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";

import {
  FormProvider,
  Label,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  useSnackbar,
} from "@components";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import {
  BaseResponseInterface,
  createRandomAvatar,
  getRandomColor,
} from "@utils";
import { countries } from "src/assets/data";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import {
  useCreateStudentMutation,
  useUpdateStudentAvatarMutation,
  useUpdateStudentMutation,
} from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

interface FormValuesProps extends Omit<IStudent, keyof BaseResponseInterface> {
  avatarUrl: File & { preview: string };
}

interface Props {
  isEdit?: boolean;
  currentUser?: IStudent & BaseResponseInterface;
  schoolIdProps?: string;
}

export default function StudentNewEditForm({
  isEdit = false,
  currentUser,
  schoolIdProps,
}: Props): React.ReactElement | null {
  const { push } = useRouter();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const [createStudent] = useCreateStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [updateStudentAvatar] = useUpdateStudentAvatarMutation();
  const { enqueueSnackbar } = useSnackbar();
  const translate = useTranslate();
  const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required(translate("required_name")),
    last_name: Yup.string().required(translate("required_surname")),
    email: Yup.string()
      .required(translate("required_email"))
      .email(translate("must_be_valid_email")),
    phone: Yup.string(),
    country: Yup.string(),
    cityp: Yup.string(),
    post_code: Yup.string(),
    about: Yup.string(),
    verified: Yup.boolean(),
    active: Yup.boolean(),
    cover: Yup.string(),
    password: !isEdit
      ? Yup.string().required(translate("required_password"))
      : Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: currentUser?.first_name ?? "",
      last_name: currentUser?.last_name ?? "",
      email: currentUser?.account?.email ?? "",
      phone: currentUser?.phone ?? "",
      country: currentUser?.country ?? "",
      city: currentUser?.city ?? "",
      post_code: currentUser?.post_code ?? "",
      about: currentUser?.about ?? "",
      verified: currentUser?.verified,
      cover: currentUser?.cover ?? getRandomColor(),
      active: currentUser?.active,
      password: generator.generate({
        length: 10,
        uppercase: true,
        lowercase: true,
        symbols: true,
        numbers: true,
        strict: true,
      }),
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

    await updateStudentAvatar({
      file,
      schoolId: id,
      studentId: id,
    }).unwrap();
  };

  const onSubmit = async ({
    avatarUrl,
    ...data
  }: FormValuesProps): Promise<void> => {
    try {
      if (isEdit && currentUser?.id) {
        const { email, password, ...body } = data;
        await updateStudent({
          studentId: currentUser?.id,
          schoolId: schoolIdProps ?? schoolId,
          ...body,
        }).unwrap();
        enqueueSnackbar(
          !isEdit
            ? translate("messages_create_success")
            : translate("messages_update_success")
        );
        if (!schoolIdProps) {
          push(MANAGER_PATH_DASHBOARD.school.students);
        }
      } else {
        const user = await createStudent({
          ...data,
          schoolId: schoolIdProps ?? schoolId,
        }).unwrap();
        if (avatarUrl) {
          await updateAvatar(user.id, avatarUrl);
        } else {
          const file = new FormData();
          const randomAvatar = await createRandomAvatar(true);
          file.append("file", randomAvatar);
          await updateAvatar(user.id, randomAvatar);
        }
        enqueueSnackbar(
          !isEdit
            ? translate("messages_create_success")
            : translate("messages_update_success")
        );
        push(MANAGER_PATH_DASHBOARD.school.students);
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
            {isEdit && (
              <Label
                color={currentUser?.active ? "success" : "error"}
                sx={{
                  textTransform: "uppercase",
                  position: "absolute",
                  top: 24,
                  right: 24,
                }}
              >
                {currentUser?.active
                  ? translate("active")
                  : translate("not_active")}
              </Label>
            )}

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
                  >
                    {isEdit ? "" : translate("students_new_avatar_subtitle")}
                  </Typography>
                }
              />
              <Stack>
                <Typography variant="body2">
                  {translate("students_new_cover_color")}
                </Typography>
                <Controller
                  control={methods.control}
                  name="cover"
                  render={({ field, fieldState }) => (
                    <MuiColorInput
                      sx={{ width: "100%", pt: 1 }}
                      {...field}
                      value={field.value}
                      helperText={
                        fieldState.invalid
                          ? translate("messages_invalid_color")
                          : ""
                      }
                      error={fieldState.invalid}
                      isAlphaHidden
                      format="hex"
                    />
                  )}
                />
              </Stack>
            </Box>
            {isEdit && (
              <>
                <RHFSwitch
                  name="verified"
                  labelPlacement="start"
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        {translate("messages_email_verified")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {translate("students_new_email_notification")}
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
                        {translate("messages_user_verified")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {translate("students_new_user_notification")}
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
              </>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <RHFTextField
              sx={{ mb: 3 }}
              disabled={isEdit}
              name="email"
              label={translate("email_address")}
            />
            {!isEdit ? (
              <RHFTextField
                contentEditable={false}
                sx={{ mb: 3 }}
                disabled={isEdit}
                name="password"
                label={translate("generated_passowrd")}
              />
            ) : null}
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
              <RHFTextField name="first_name" label={translate("first_name")} />
              <RHFTextField name="last_name" label={translate("last_name")} />
              <RHFTextField name="phone" label={translate("phone")} />
              <RHFSelect native name="country" label={translate("country")}>
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="city" label={translate("city")} />
              <RHFTextField name="post_code" label={translate("zip")} />
            </Box>

            <RHFTextField
              fullWidth
              multiline
              rows={3}
              sx={{ h: 10 }}
              name="about"
              label={translate("about")}
            />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!isEdit
                  ? translate("actions_create_user")
                  : translate("actions_save_changes")}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
