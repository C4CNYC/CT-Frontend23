import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputInfo from "./InputInfo";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { PATH_AFTER_LOGIN } from "src/config-global";
import { useAuthContext } from "src/auth/useAuthContext";
import { useCreateClassMutation } from "src/redux/services/admin";

export default function ClassStep() {
  const { authenticate } = useAuthContext();

  const theme = useTheme();
  const router = useRouter();
  const [createClass, { isLoading }] = useCreateClassMutation();
  const { register, handleSubmit } = useForm();
  const { schoolId, orgId } = router.query;
  const onSubmit = async (data: any) => {
    try {
      await createClass({
        schoolId,
        ...data,
      }).unwrap();
      authenticate();
      router.replace(PATH_AFTER_LOGIN);
    } catch (e) {
      // #TODO show error
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Class Created
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.grey[600],
            fontWeight: 400,
            textAlign: "center",
            mt: "0 !important",
          }}
        >
          We’ve auto-generated your first class.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.grey[600],
            fontWeight: 400,
            textAlign: "center",
            mt: "0 !important",
          }}
        >
          Now you can already invite learners.{" "}
        </Typography>

        <InputInfo text="Here you can change the auto-generated name. " />
        <TextField label="Class Name" {...register("name")} />
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          disabled={isLoading}
          type="submit"
          fullWidth
          sx={{
            boxShadow: "0px 8px 16px rgba(196, 196, 196, 0.59)",
            bgcolor: "#FBDD3F",
            borderRadius: "50px",
            textTransform: "uppercase",
            fontSize: "22px",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </form>
  );
}
