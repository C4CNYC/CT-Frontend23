import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useCreateOrganizationSchoolMutation } from "src/redux/services/admin";

type SchoolStepProps = {
  next: () => void;
};

export default function SchoolStep({ next }: SchoolStepProps) {
  const [createSchool, { isLoading }] = useCreateOrganizationSchoolMutation();
  const theme = useTheme();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { orgId } = router.query;
  // #TODO when ortId doesn't exist pls back user to prev step

  const onSubmit = async (data: any) => {
    try {
      const school = await createSchool({
        org_id: orgId,
        ...data,
      }).unwrap();
      router.push(
        {
          pathname: "/auth/register",
          query: { orgId, schoolId: school.id },
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
          School / Location
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
          Add your school or academy.
        </Typography>
        <TextField label="School name" {...register("name")} />
        <TextField label="City" {...register("city")} />
        <TextField label="Country" {...register("country")} />
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button disabled={isLoading} type="submit" sx={{ mr: 1 }}>
          Next
        </Button>
      </Box>
    </form>
  );
}
