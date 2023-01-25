import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputInfo from "./InputInfo";
import { useForm } from "react-hook-form";
import { useCreateOrganizationMutation } from "src/redux/services/admin";
import { useRouter } from "next/router";

type OrganizationStepProps = {
  next: () => void;
};

export default function OrganizationStep({ next }: OrganizationStepProps) {
  const router = useRouter();
  const [createOrganization, { isLoading }] = useCreateOrganizationMutation();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const org = await createOrganization(data).unwrap();
      router.push(
        {
          pathname: "/auth/register-unprotected/",
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
          District / Organization
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
          Skip this step if not applicable.
        </Typography>
        <TextField label="District / Organization Name" {...register("name")} />
        <InputInfo text="Leave empty if no district website." />
        <TextField label="Website" {...register("url")} />
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button disabled={isLoading} type="submit" sx={{ mr: 1 }}>
          Next
        </Button>
      </Box>
    </form>
  );
}
