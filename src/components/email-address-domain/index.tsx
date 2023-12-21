import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { AiFillPlusCircle } from "react-icons/ai";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";

import { useInviteStudentMutation } from "src/redux/services/manager/students-manager";

import { FormProvider, RHFTextField } from "../hook-form";
import { Iconify } from "../iconify";

interface FormValuesProps {
  email: string;
}

interface IEmailAddressModalProps {
  children: React.ReactElement;
  schoolId: string;
  classId: string;
}

export default function EmailAddressModal({
  children,
  schoolId,
  classId,
}: IEmailAddressModalProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [inviteStudent, { isLoading }] = useInviteStudentMutation();

  const CreateEmailSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateEmailSchema),
    mode: "all",
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: FormValuesProps) => {
    try {
      await inviteStudent({ schoolId, email, class_id: classId }).unwrap();
      enqueueSnackbar("Student invited!");
      methods.reset({ email: "" });
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: "error" });
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
        sx={{ minWidth: "70wh" }}
      >
        <Box
          sx={{
            justifyContent: "end",
            alignItems: "flex-end",
            display: "flex",
            p: 1,
          }}
        >
          <IconButton>
            <Iconify
              icon="ep:close"
              width={24}
              height={24}
              onClick={() => {
                setOpen(false);
              }}
            />
          </IconButton>
        </Box>
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Box ml="30px" mb="30px" mr="30px" mt="-20px">
            <Box display="flex" alignItems="center" ml="-20px">
              <Button
                sx={{
                  color: "inherit",
                  background: "none",
                  p: "0px",
                  "&:hover": {
                    background: "none",
                    boxShadow: "none",
                  },
                }}
              >
                <Iconify
                  icon="iconamoon:arrow-left-2-bold"
                  width={28}
                  height={28}
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              </Button>
              <Typography variant="h4" ml="-10px">
                Email address
              </Typography>
            </Box>
            <RHFTextField
              name="email"
              variant="outlined"
              placeholder="Type email"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AiFillPlusCircle size={30} />
                  </InputAdornment>
                ),
              }}
              sx={(theme) => ({
                borderRadius: "8px",
                fontSize: "16px",
                mt: "40px",
                "& .MuiInputBase-root": {
                  background: "#f0f0f0",
                },
                "& input:-webkit-autofill": {
                  "-webkit-background-clip": "text",
                  "-webkit-text-fill-color": "#000",
                  transition: "background-color 5000s ease-in-out 0s",
                  boxShadow: `inset 0 0 .1px .1px ${theme.palette.grey[200]}`,
                },
              })}
            />
            <LoadingButton
              fullWidth
              type="submit"
              loading={isLoading}
              loadingIndicator={<CircularProgress size={22} thickness={5} />}
              sx={{
                mt: 5,
                background: "#d1329e",
                color: "white",
                "&:hover": {
                  background: "#d1329e",
                },
                height: "54px",
                fontSize: "20px",
                "& .MuiCircularProgress-root": {
                  color: "#fff",
                },
              }}
            >
              Confirm
            </LoadingButton>
          </Box>
        </FormProvider>
      </Dialog>
    </>
  );
}
