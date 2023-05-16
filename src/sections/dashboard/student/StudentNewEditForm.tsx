import { useCallback, useEffect, useMemo } from "react";
import * as Yup from "yup";
// next
import { useRouter } from "next/router";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
// utils
import { fData } from "../../../utils/formatNumber";
// routes
import { PATH_DASHBOARD } from "@routes/paths";
// components
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from "@components/hook-form";
import Label from "@components/label";
import { useSnackbar } from "@components/snackbar";
import generator from "generate-password";
import { useSelector } from "react-redux";
import { countries } from "src/assets/data";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import {
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IStudent, keyof BaseResponseInterface> {}

interface Props {
  isEdit?: boolean;
  currentUser?: IStudent & BaseResponseInterface;
}

export default function StudentNewEditForm({
  isEdit = false,
  currentUser,
}: Props): React.ReactElement | null {
  const { push } = useRouter();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const [createStudent] = useCreateStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required("Name is required"),
    last_name: Yup.string().required("Surename is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    phone: Yup.string(),
    country: Yup.string(),
    cityp: Yup.string(),
    post_code: Yup.string(),
    about: Yup.string(),
    password: !isEdit
      ? Yup.string().required("Password is required")
      : Yup.string(),
    // avatarUrl: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: currentUser?.first_name ?? "",
      last_name: currentUser?.last_name ?? "",
      email: currentUser?.email ?? "",
      phone: currentUser?.phone ?? "",
      country: currentUser?.country ?? "",
      city: currentUser?.city ?? "",
      post_code: currentUser?.post_code ?? "",
      about: currentUser?.about ?? "",
      password: generator.generate({
        length: 10,
        uppercase: true,
        lowercase: true,
        symbols: true,
        numbers: true,
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

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      if (!isEdit) {
        await createStudent({
          schoolId,
          ...data,
        }).unwrap();
      } else {
        const { email, password, ...body } = data;
        await updateStudent({
          studentId: currentUser?.id as string,
          schoolId,
          ...body,
        });
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      push(PATH_DASHBOARD.school.students);
    } catch (error) {
      enqueueSnackbar(error.data.message, {
        variant: "error",
      });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      // const newFile = Object.assign(file, {
      //   preview: URL.createObjectURL(file),
      // });

      if (file) {
        // #TODO upload file
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
                {currentUser?.active ? "active" : "not active"}
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
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
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
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <RHFTextField
              sx={{ mb: 3 }}
              disabled={isEdit}
              name="email"
              label="Email Address"
            />
            {!isEdit ? (
              <RHFTextField
                contentEditable={false}
                sx={{ mb: 3 }}
                disabled={isEdit}
                name="password"
                label="Generated password"
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
              <RHFTextField name="first_name" label="First Name" />
              <RHFTextField name="last_name" label="Last Name" />
              <RHFTextField name="phone" label="Phone" />
              <RHFSelect native name="country" label="Country">
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="city" label="City" />
              <RHFTextField name="post_code" label="Zip" />
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
                {!isEdit ? "Create User" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
