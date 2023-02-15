import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputInfo from "./InputInfo";
import { useForm } from "react-hook-form";
import { useUpdateOrganizationMutation } from "src/redux/services/admin";
import { useRouter } from "next/router";
import { RHFSelect } from "../../../../components/hook-form";

type OrganizationStepProps = {
  next: () => void;
};

export default function AssignmentSettings({ next }: OrganizationStepProps) {
  const router = useRouter();
  const [updateOrg, { isLoading }] = useUpdateOrganizationMutation();
  const theme = useTheme();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const org = await updateOrg({ body: data }).unwrap();
      router.push(
        {
          pathname: "/auth/register",
          query: { orgId: org.id },
        },
        undefined,
        { shallow: true }
      );
      next();
    } catch (e) {
      // #TODO show error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          New assignment
        </Typography>

        <RHFSelect
          native
          control={control}
          name="type"
          label="Select Type"
          sx={{ width: "320px" }}
        >
          <option key="en" value="en">
            English
          </option>
          <option key="fr" value="fr">
            French
          </option>
        </RHFSelect>

      </Stack>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          disabled={isLoading}
          fullWidth
          type="submit"
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
