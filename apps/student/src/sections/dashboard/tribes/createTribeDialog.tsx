import { useState } from "react";

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

import { useSnackbar, RHFTextField, FormProvider } from "@ct-nx/components";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { useCreateClassMutation } from "src/redux/services/student/classes-manager";
import * as Yup from "yup";

interface FormValuesProps {
  name: string;
  description: string;
}

interface Props {
  children: React.ReactElement;
}

export default function CreateTribeDialog({
  children,
}: Props): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [createClass, { isLoading }] = useCreateClassMutation();

  const CreateTribeSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateTribeSchema),
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
      // add user adding logic
      await createClass(data).unwrap();
      enqueueSnackbar("class created");
      methods.reset((formValues) => ({
        ...formValues,
        name: "",
        description: "",
      }));
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
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
            Create new Tribe
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
                      style={{ width: "350px" }}
                      name="name"
                      label="Tribe name"
                      required
                    />

                    <RHFTextField
                      name="description"
                      label="Tribe description"
                      required
                      multiline
                      rows={3}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      mt: 7,
                    }}
                  >
                    <Button onClick={closeDialog}>Close</Button>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={loading || isLoading}
                    >
                      Save
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
