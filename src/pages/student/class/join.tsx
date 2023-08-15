import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  CircularProgress,
  Container,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";

import {
  FormProvider,
  Image,
  RHFTextField,
  useSettingsContext,
  useSnackbar,
} from "@components";
import { StudentDashboardLayout } from "@layouts/dashboard";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useJoinClassMutation } from "src/redux/services/manager/classes-student";

JoinClass.getLayout = (page: React.ReactElement) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

const CreateClassSchema = Yup.object().shape({
  code: Yup.string().required("code is required"),
});

interface FormValueProps {
  code: string;
}

export default function JoinClass(): React.ReactElement {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { themeStretch } = useSettingsContext();
  const [joinClass, { isLoading }] = useJoinClassMutation();

  const methods = useForm<FormValueProps>({
    resolver: yupResolver(CreateClassSchema),
  });

  const onSubmit = async ({ code }: FormValueProps) => {
    try {
      const { status, tribe } = await joinClass({ share_token: code }).unwrap();
      if (status === "joined") {
        push(STUDENT_PATH_DASHBOARD.class.id(tribe.id));
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack
          sx={{
            flexDirection: "row",
            flexWrap: { xs: "wrap", sm: "wrap" },
            gap: 7,
            justifyContent: "center",
          }}
        >
          <Stack sx={{ pt: 4 }}>
            <Typography variant="h2">Join a tribe</Typography>
            <Typography variant="body1" sx={{ maxWidth: "350px", mt: 3 }}>
              Have you been invited to a tribe? Then enter your join-code below
              or follow the join-link. Have fun!
            </Typography>
            <RHFTextField
              required
              name="code"
              placeholder="1 2 a s d 5"
              inputProps={{
                style: {
                  fontSize: "32px",
                  letterSpacing: "10px",
                },
              }}
              sx={(theme) => ({
                mt: 7,
                maxWidth: "350px",
                "& .MuiInputBase-root": {
                  background: theme.palette.grey[200],
                },
                "& fieldset": { border: "none" },
                "& input:-webkit-autofill": {
                  "-webkit-background-clip": "text",
                  "-webkit-text-fill-color": "#000",
                  transition: "background-color 5000s ease-in-out 0s",
                  boxShadow: `inset 0 0 .1px .1px ${theme.palette.grey[200]}`,
                },
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LoadingButton
                      loadingIndicator={
                        <CircularProgress
                          color="inherit"
                          thickness={6}
                          size={26}
                        />
                      }
                      disabled={!methods.formState.isValid}
                      type="submit"
                      sx={{ color: "#43D4DD", p: 2, minWidth: 0 }}
                      loading={isLoading}
                    >
                      <FaArrowRight size={30} />
                    </LoadingButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack>
            <Image
              sx={{ maxWidth: "350px", width: "100%", height: "100%" }}
              src="/assets/join-class/join-tiger.svg"
            />
          </Stack>
        </Stack>
      </FormProvider>
    </Container>
  );
}
