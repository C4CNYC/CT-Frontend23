import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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
import { BaseResponseInterface, fData } from "@utils";
import {
  useCreateOrgMemberMutation,
  useUdpateMemberAvatarMutation,
  useUpdateOrgMemberMutation,
} from "src/redux/services/admin/members-admin";
import { Role } from "src/redux/services/enums/role.enum";
import { IUser } from "src/redux/services/interfaces/user.interface";
import { useTranslate } from "src/utils/translateHelper";

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
  const translate = useTranslate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required(translate("required_name")),
    last_name: Yup.string().required(translate("required_surname")),
    email: Yup.string()
      .required(translate("required_email"))
      .email(translate("must_be_valid_email")),
    role: Yup.string().required(translate("required_role")),
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
          id: currentUser?.id,
          user_id: currentUser?.id,
          ...body,
        }).unwrap();

        if (photoURL) {
          await updateAvatar(currentUser?.id, photoURL);
        }

        enqueueSnackbar(
          !isEdit
            ? translate("messages_create_success")
            : translate("messages_update_success")
        );
        push(MANAGER_PATH_DASHBOARD.organization.members);
      } else {
        const user = await createUser({
          id: "",
          ...data,
        }).unwrap();
        if (photoURL) {
          await updateAvatar(user.id, photoURL);
        }
      }
      enqueueSnackbar(
        !isEdit
          ? translate("messages_create_success")
          : translate("messages_update_success")
      );
      push(MANAGER_PATH_DASHBOARD.organization.members);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
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
                {currentUser?.active
                  ? translate("active")
                  : translate("not_active")}
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
                    {translate("allowed_img")}
                    <br />{" "}
                    {translate("max_img_size", {
                      size: fData(3145728),
                    })}
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
                    {translate("messages_email_verified")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {translate("send_verification_email_content")}
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
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {translate("verified_user_info")}
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
              <RHFTextField name="first_name" label={translate("first_name")} />
              <RHFTextField name="last_name" label={translate("last_name")} />
              <RHFTextField
                disabled={isEdit}
                name="email"
                label={translate("email_address")}
              />

              <RHFSelect
                native
                name="role"
                label={translate("role")}
                placeholder={translate("role")}
              >
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
