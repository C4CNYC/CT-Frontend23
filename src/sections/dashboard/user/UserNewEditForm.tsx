import * as Yup from "yup";
import { useCallback, useEffect, useMemo } from "react";
// next
import { useRouter } from "next/router";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
// utils
import { fData } from "../../../utils/formatNumber";
// routes
import { PATH_DASHBOARD } from "@routes/paths";
// components
import Label from "@components/label";
import { useSnackbar } from "@components/snackbar";
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from "@components/hook-form";
import { IUser } from "src/redux/services/interfaces/user.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { Role } from "src/redux/services/enums/role.enum";
import {
  useCreateOrgMemberMutation,
  useUdpateMemberAvatarMutation,
  useUpdateOrgMemberMutation,
} from "src/redux/services/admin";
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IUser, keyof BaseResponseInterface> {
  photoURL: File & { preview: string } 
}

type Props = {
  isEdit?: boolean;
  currentUser?: IUser & BaseResponseInterface;
};

export default function UserNewEditForm({
  isEdit = false,
  currentUser,
}: Props) {
  const { push } = useRouter();
  const [createUser] = useCreateOrgMemberMutation();
  const [updateUser] = useUpdateOrgMemberMutation();
  const [updateMemberAvatar] = useUdpateMemberAvatarMutation();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required("Name is required"),
    last_name: Yup.string().required("Surename is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    role: Yup.string().required("Role is required"),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: currentUser?.first_name || "",
      last_name: currentUser?.last_name || "",
      email: currentUser?.email || "",
      role: (currentUser?.role as Role) || Role.Manager,
      verified: currentUser?.verified
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const values = {
    status: "active",
  };

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async ({photoURL, ...data}: FormValuesProps) => {
    try {
      if (!isEdit) {
        const user = await createUser({
          ...data,
        }).unwrap();
        if (photoURL) {
          const file = new FormData();
          file.append("file", photoURL);
          await updateMemberAvatar({
            user_id: user?.id,
            file,
          }).unwrap();
        }
      } else {
        const { email, ...body } = data;
        await updateUser({
          user_id: currentUser?.id as string,
          ...body,
        }).unwrap();
        if (photoURL && currentUser?.id) {
          const file = new FormData();
          file.append("file", photoURL);
          await updateMemberAvatar({
            user_id: currentUser?.id,
            file,
          }).unwrap();
        }
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      push(PATH_DASHBOARD.organization.members);
    } catch (error) {
      enqueueSnackbar(error.data.message, {
        variant: "error",
      });
      console.error(error, "test");
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
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status === "active" ? "success" : "error"}
                sx={{
                  textTransform: "uppercase",
                  position: "absolute",
                  top: 24,
                  right: 24,
                }}
              >
                {values.status}
              </Label>
            )}

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
                disabled={isEdit}
                name="email"
                label="Email Address"
              />

              <RHFSelect native name="role" label="Role" placeholder="Role">
                {(Object.keys(Role) as Array<keyof typeof Role>).map((role) =>
                  role === "Owner" ? null : (
                    <option key={Role[role]} value={Role[role]}>
                      {role}
                    </option>
                  )
                )}
              </RHFSelect>
            </Box>

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
