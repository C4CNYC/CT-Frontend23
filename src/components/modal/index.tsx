import FormProvider, { RHFTextField } from "@components/hook-form";
import { useSnackbar } from "@components/snackbar";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/system";
import OrganizationForm from "@sections/dashboard/organization/general/tabs/profile/OrganizationForm";
import * as React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useLocales } from "src/locales";
import {
  useUpdateOrganizationMutation,
  useUpdateOrgAvatarMutation,
} from "src/redux/services/admin";
import { OrganizationResponce } from "src/redux/services/interfaces/organization.interface";
import * as Yup from "yup";

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

export default function ModalEdit({
  organization,
}: OrganizationFormProps): React.ReactElement | null {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "16px",
  };

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
        }).unwrap();
      }
      enqueueSnackbar("Update success!");
    } catch (error) {
      console.error(error);
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
      <Button
        onClick={handleOpen}
        variant="contained"
        size="medium"
        sx={{ height: "35px" }}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={style} pt="30px">
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
          </Box>
        </FormProvider>
      </Modal>
    </>
  );
}
