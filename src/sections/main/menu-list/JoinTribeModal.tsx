import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
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
  Typography,
} from "@mui/material";

import {
  FormProvider,
  RHFTextField,
  useSnackbar,
} from "@components";
import { useJoinClassMutation } from "src/redux/services/manager/classes-student";
import { useRouter } from "next/router";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";

const CreateClassSchema = Yup.object().shape({
  code: Yup.string().required("code is required"),
});

export interface FormJoinClassProps {
  code: string;
}

interface IJoinClassModal {
  children: React.ReactElement;
}

enum JoinStatus {
  JOINED = "joined",
  PENDING = "pending"
}

export default function JoinClassModal({
  children,
}: IJoinClassModal): React.ReactElement {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpenDialog] = useState<boolean>(false);

  const [joinClass, { isLoading }] = useJoinClassMutation();

  const methods = useForm<FormJoinClassProps>({
    resolver: yupResolver(CreateClassSchema),
  });
  const onSubmit = async ({
    code,
  }: FormJoinClassProps): Promise<void> => {
    try {
      const { status, tribe } = await joinClass({ share_token: code }).unwrap();
      if (status === JoinStatus.JOINED) {
        setOpenDialog(false);
        push(STUDENT_PATH_DASHBOARD.class.id(tribe.id));
      }
    } catch (error: any) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <>
      <Box
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        {children}
      </Box>
      <Dialog
        maxWidth="md"
        open={open}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <DialogTitle variant="h5" sx={{ pb: 1, pt: 2 }}>
          Join Class
        </DialogTitle>
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <DialogContent>
            <Typography mb={3} variant="body1">
              Enter your Join Code to find your class
            </Typography>
            <RHFTextField
              required
              name="code"
              placeholder="Example: atV1d3Dsd"
            />
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                color="error"
                onClick={() => {
                  setOpenDialog(false);
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
              >
                Let's go
              </LoadingButton>
            </Box>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
