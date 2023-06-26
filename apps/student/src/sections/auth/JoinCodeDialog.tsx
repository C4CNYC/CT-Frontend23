import {
  RHFTextField,
  FormProvider,
} from "@ct-nx/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { PATH_AUTH } from "@routes/paths";
import NextLink from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import * as Yup from "yup";

interface FormValuesProps {
  code: string;
}

interface Props {
  children: React.ReactElement;
}

export default function JoinCodeDialog({
  children,
}: Props): React.ReactElement {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const openDialog = () => {
    setIsOpenDialog(true);
  };
  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const LoginSchema = Yup.object().shape({
    code: Yup.string().required("Enter code"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
  });

  const {
    handleSubmit,
    // formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {};

  return (
    <>
      <Box onClick={openDialog}>{children}</Box>
      <Dialog
        open={isOpenDialog}
        onClose={closeDialog}
        sx={{
          boxSizing: "border-box",
          width: { sx: "auto", sm: "488px" },
          m: "0 auto",

          "& .MuiBackdrop-root": { background: " #E6FBFC" },
        }}
      >
        <Box
          onClick={closeDialog}
          sx={{
            position: "absolute",
            right: "15px",
            top: "15px",
            height: "20px",
            width: "20px",
            "& :hover": {
              cursor: "pointer",
            },
          }}
        >
          <IoClose size="20px" />
        </Box>
        <DialogTitle sx={{ textAlign: "center", pb: 0 }}>
          <Typography variant="h5">AWESOME!</Typography>
          <Typography variant="h5" gutterBottom>
            Someone wants you on-board.
          </Typography>
          <Typography variant="body2">
            Enter JOIN code. But, if you don’t have this you can add it later.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" sx={{ mt: "40px", mb: "40px" }}>
              <RHFTextField
                sx={{
                  ml: "16px",
                  maxWidth: "56px",
                  height: "56px",
                }}
                name="num1"
                placeholder="-"
                inputProps={{ maxLength: 1 }}
              />
              <RHFTextField
                sx={{
                  ml: "16px",
                  maxWidth: "56px",
                  height: "56px",
                }}
                name="num2"
                placeholder="-"
                inputProps={{ maxLength: 1 }}
              />
              <RHFTextField
                sx={{
                  ml: "16px",
                  maxWidth: "56px",
                  height: "56px",
                }}
                name="num3"
                placeholder="-"
                inputProps={{ maxLength: 1 }}
              />
              <RHFTextField
                sx={{
                  ml: "16px",
                  maxWidth: "56px",
                  height: "56px",
                }}
                name="num4"
                placeholder="-"
                inputProps={{ maxLength: 1 }}
              />
              <RHFTextField
                sx={{
                  ml: "16px",
                  maxWidth: "56px",
                  height: "56px",
                }}
                name="num5"
                placeholder="-"
                inputProps={{ maxLength: 1 }}
              />
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{
                boxShadow: "0px 8px 16px rgba(2, 211, 215, 0.24)",
                bgcolor: "primary",
                borderRadius: "100px",
                fontSize: "15px",
                "&:hover": {
                  background: "#02D3D714",
                  border: "1px solid #02D3D7",
                  color: "#02D3D7",
                },
              }}
            >
              Submit Code
            </LoadingButton>
          </FormProvider>
          <Link
            component={NextLink}
            href={PATH_AUTH.register}
            sx={{
              display: "inline-block",
              m: "40px 0 55px calc(50% - 80px)",
            }}
          >
            Back to register page
          </Link>
        </DialogContent>
        <Typography
          variant="body2"
          sx={{
            position: "fixed",
            bottom: "20px",
            left: { sx: "calc(50% - 150px)", sm: "calc(50% - 230px)" },
            zIndex: "10000",
            width: { sx: "300px", sm: "460px" },
            textAlign: "center",
          }}
        >
          Copyright CodeTribe 2022 © All rights reserved.
        </Typography>
      </Dialog>
    </>
  );
}
