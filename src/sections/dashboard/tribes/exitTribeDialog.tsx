import { useState } from "react";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";

import { useSnackbar } from "@components";
import { APIError } from "src/redux/interfaces/custom-error.interface";

interface IExitTribeDialogProps {
  children: React.ReactElement;
}

export default function ExitTribeDialog({
  children,
}: IExitTribeDialogProps): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };

  const onSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      // add user adding logic
      enqueueSnackbar("You left the tribe");
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
      <Dialog
        open={open}
        onClose={closeDialog}
        PaperProps={{ sx: { width: "350px" } }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Typography
            variant="h5"
            sx={{ pb: 1, pt: 2, px: 2, textAlign: "center" }}
          >
            Are you sure you <br /> want to leave tribe?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button color="error" onClick={closeDialog}>
                    Cancel
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                    onClick={onSubmit}
                  >
                    Leave
                  </LoadingButton>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
