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

interface Props {
  children: React.ReactElement[] | React.ReactElement;
}

interface FormValuesProps {
  email: string;
}

export default function FeedbackDialog({
  children,
}: Props): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const FeedbackSchema = Yup.object().shape({
    feedback: Yup.string().email(),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FeedbackSchema),
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
      enqueueSnackbar("thanks!");
      methods.reset((formValues) => ({
        ...formValues,
        feedback: "",
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle variant="h5" sx={{ pb: 1, pt: 2 }}>
            Feedback
          </DialogTitle>
          <IconButton onClick={closeDialog} sx={{ mr: "14px", mt: "5px" }}>
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
                      sx={{ width: { xs: "300px", sm: "350px", md: "450px" } }}
                      rows={5}
                      multiline
                      name="Feedback"
                      label=""
                      placeholder="Tell us your thoughts, emotions, and comments"
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
                    <Button onClick={closeDialog}>Close</Button>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={loading}
                    >
                      Send
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
