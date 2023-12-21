import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { FormProvider, RHFTextField } from "@components";
import { useInviteStudentMutation } from "src/redux/services/manager/students-manager";
import { useTranslate } from "src/utils/translateHelper";

interface FormValueProps {
  email: string;
}
interface Props {
  children: React.ReactElement;
  schoolId: string;
}

export default function InviteStudentDialog({
  children,
  schoolId,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [inviteStudent, { isLoading }] = useInviteStudentMutation();
  const handleOpenDialog = (): void => {
    setOpenDialog(true);
  };
  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };
  const translate = useTranslate();

  const CreateInviteSchema = Yup.object().shape({
    email: Yup.string()
      .email(translate("enter_valid_email"))
      .required(translate("required_field")),
  });

  const methods = useForm<FormValueProps>({
    resolver: yupResolver(CreateInviteSchema),
  });

  const onSubmit = async (data: FormValueProps): Promise<void> => {
    try {
      await inviteStudent({ schoolId, email: data.email }).unwrap();
      enqueueSnackbar(translate("messages_sent_seccessfully"));
      methods.reset();
      handleCloseDialog();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
  };
  return (
    <>
      <Box onClick={handleOpenDialog}>{children}</Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <DialogTitle>{translate("members_invate_student")}</DialogTitle>
          <DialogContent>
            <RHFTextField
              name="email"
              type="email"
              label={`${translate("email")}:`}
              sx={{ minWidth: { xs: "250xp", sm: "300px" }, my: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleCloseDialog}>
              {translate("actions_cancel")}
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              {translate("members_send_invite")}
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
