import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";

import { FormProvider, RHFTextField, useSnackbar } from "@components";
import { APIError } from "src/redux/interfaces/custom-error.interface";
import { useTranslate } from "src/utils/translateHelper";

interface Props {
  children: React.ReactElement[] | React.ReactElement;
}

interface FormValuesProps {
  email: string;
}

export default function InviteFriendsModal({
  children,
}: Props): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const translate = useTranslate();

  const { enqueueSnackbar } = useSnackbar();

  const CreateNewUserSchema = Yup.object().shape({
    email: Yup.string().email().required(translate("required_email")),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateNewUserSchema),
  });

  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    setLoading(true);
    try {
      // add friend adding logic
      enqueueSnackbar(translate("messages_thanks"));
      methods.reset((formValues) => ({
        ...formValues,
        email: "",
      }));
    } catch (error) {
      const typedError = error as APIError;
      enqueueSnackbar(typedError.data.message, {
        variant: "error",
      });
    }
    setLoading(false);
    closeDialog();
  };
  return (
    <>
      <Box
        onClick={() => {
          openDialog();
        }}
      >
        {children}
      </Box>
      <Dialog open={open} onClose={closeDialog}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <DialogTitle variant="h5" sx={{ pb: 1, pt: 2 }}>
            {translate("invite_friend")}
          </DialogTitle>
          <IconButton onClick={closeDialog} sx={{ mb: "5px", mr: "14px" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 0 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box rowGap={3} display="grid">
                    <RHFTextField
                      sx={{ width: { xs: "300px", sm: "350px" } }}
                      name="email"
                      label={translate("friends_email")}
                      required
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      mt: 2,
                    }}
                  >
                    <Button onClick={closeDialog}>
                      {translate("actions_close")}
                    </Button>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={loading}
                    >
                      {translate("actions_invite")}
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
