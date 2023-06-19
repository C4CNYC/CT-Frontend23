import { RHFTextField } from "@components/hook-form";
import FormProvider from "@components/hook-form/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

interface FormValueProps {
  email: string;
}
interface Props {
  children: React.ReactElement;
}

export default function InviteStudentDialog({
  children,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = (): void => {
    setOpenDialog(true);
  };
  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };
  const defaultValues = {
    email: "",
  };

  const CreateInviteSchema = Yup.object().shape({
    email: Yup.string()
      .email("Pleace, enter a valide email adress")
      .required("This field is required"),
  });

  const methods = useForm<FormValueProps>({
    resolver: yupResolver(CreateInviteSchema),
    defaultValues,
  });

  const onSubmit = async (): Promise<void> => {
    try {
      enqueueSnackbar("Message was sent successfully");
      methods.reset();
    } catch (error) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
  };
  return (
    <>
      <Box onClick={handleOpenDialog}>{children}</Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Invite Student</DialogTitle>
        <DialogContent>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <RHFTextField
              name="email"
              type="email"
              label="email:"
              sx={{ minWidth: { xs: "250xp", sm: "300px" }, my: 1 }}
            />
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <LoadingButton variant="contained" loading={false}>
            Send invite
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
