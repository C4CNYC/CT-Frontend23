import * as React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box, Button, Select, Stack } from "@mui/material";

import { useCreateOrganizationSchoolMutation } from "src/redux/services/admin/school-amdin";
import { countries } from "../../../assets/data";

interface SchoolStepProps {
  next: () => void;
}

export default function SchoolStep({
  next,
}: SchoolStepProps): React.ReactElement | null {
  const [createSchool, { isLoading }] = useCreateOrganizationSchoolMutation();
  const theme = useTheme();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { orgId } = router.query;
  // #TODO when ortId doesn't exist pls back user to prev step

  const onSubmit = async (data: any): Promise<void> => {
    try {
      const school = await createSchool({
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
    } catch (e: any) {
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
        <Select {...register("country")} native fullWidth>
          <option value="Choose country">Choose Country</option>
          {countries.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </Select>
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
