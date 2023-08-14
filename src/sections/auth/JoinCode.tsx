import React, { useState } from "react";

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
  FormHelperText,
  Stack,
} from "@mui/material";

import { FormProvider, RHFCodes } from "@components";

import { useSnackbar } from "../../components/snackbar";

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};
interface Props {
  children: React.ReactElement;
}
export default function JoinCode({ children }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required("Code is required"),
    code2: Yup.string().required("Code is required"),
    code3: Yup.string().required("Code is required"),
    code4: Yup.string().required("Code is required"),
    code5: Yup.string().required("Code is required"),
    code6: Yup.string().required("Code is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar("Verify success!");
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle textAlign="center" typography="h3">
          Join code
        </DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack spacing={1}>
              <RHFCodes
                keyName="code"
                inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
              />

              {(!!errors.code1 ||
                !!errors.code2 ||
                !!errors.code3 ||
                !!errors.code4 ||
                !!errors.code5 ||
                !!errors.code6) && (
                <FormHelperText error sx={{ px: 1 }}>
                  Code is required
                </FormHelperText>
              )}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ gap: 2 }}>
            <Button color="error">Cancel</Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Verify
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
