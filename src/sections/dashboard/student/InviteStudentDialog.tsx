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

  const CreateInviteSchema = Yup.object().shape({
    email: Yup.string()
      .email("Pleace, enter a valide email adress")
      .required("This field is required"),
  });

  const methods = useForm<FormValueProps>({
    resolver: yupResolver(CreateInviteSchema),
  });

  const onSubmit = async (data: FormValueProps): Promise<void> => {
    try {
      await inviteStudent({ schoolId, email: data.email }).unwrap();
      enqueueSnackbar("Message was sent successfully");
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
          <DialogTitle>Invite Student</DialogTitle>
          <DialogContent>
            <RHFTextField
              name="email"
              type="email"
              label="email:"
              sx={{ minWidth: { xs: "250xp", sm: "300px" }, my: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              Send invite
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
