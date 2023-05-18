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
import {
  useCreateOrgMemberMutation,
  useUdpateMemberAvatarMutation,
  useUpdateOrgMemberMutation,
} from "src/redux/services/admin/members-admin";
import { Role } from "src/redux/services/enums/role.enum";
import { IUser } from "src/redux/services/interfaces/user.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IUser, keyof BaseResponseInterface> {
  photoURL: File & { preview: string };
}

interface Props {
  isEdit?: boolean;
  currentUser?: IUser & BaseResponseInterface;
}

export default function UserNewEditForm({
  isEdit = false,
  currentUser,
}: Props): React.ReactElement | null {
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
    verifired: Yup.boolean(),
    active: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: currentUser?.first_name ?? "",
      last_name: currentUser?.last_name ?? "",
      email: currentUser?.email ?? "",
      role: (currentUser?.role as Role) ?? Role.Manager,
      verified: currentUser?.verified,
      active: currentUser?.active,
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

    return await updateMemberAvatar({
      user_id: id,
      file,
    }).unwrap();
  };

  const onSubmit = async ({
    photoURL,
    ...data
  }: FormValuesProps): Promise<void> => {
    try {
      if (isEdit && currentUser?.id) {
        const { email, ...body } = data;
        await updateUser({
          user_id: currentUser?.id,
          ...body,
        }).unwrap();
        enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
        if (!photoURL) return;
        await updateAvatar(currentUser?.id, photoURL);
      } else {
        const user = await createUser({
          ...data,
        }).unwrap();
        if (!photoURL) return;
        await updateAvatar(user.id, photoURL);
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      push(PATH_DASHBOARD.organization.members);
    } catch (error) {
      enqueueSnackbar(error.data.message, {
        variant: "error",
      });
    }
    reset();
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
