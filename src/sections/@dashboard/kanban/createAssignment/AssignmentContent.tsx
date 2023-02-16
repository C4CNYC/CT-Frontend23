import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Select, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useCreateOrganizationSchoolMutation } from "src/redux/services/admin";
import { countries } from "../../../../assets/data";
import FormProvider, { RHFSelect, RHFTextField } from "../../../../components/hook-form";

type SchoolStepProps = {
  next: () => void;
};


type FormValuesProps = {
  name: string;
  description: string;
};

export default function AssignmentContent({ next }: SchoolStepProps) {
  const [createSchool, { isLoading }] = useCreateOrganizationSchoolMutation();

  const defaultValues = {
    name: "",
    description: "",
  };

  const methods = useForm<FormValuesProps>({
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    try {
      console.log('consoel');
      next();
    } catch (e) {
      // #TODO show error
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          New assignment
        </Typography>

        <RHFTextField
          name="name"
          label="Assignment name"
          sx={{ width: "320px" }}
        />

        <RHFTextField
          multiline
          rows={8}
          name="name"
          label="Assignment description"
          sx={{ width: "320px" }}
        />


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
                theme.palette.mode === "light" ? "common.white" : "grey.800"
            }
          }}
        >
          Next
        </Button>
      </Box>
    </FormProvider>
  );
}
