import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputInfo from "./InputInfo";
import { useForm } from "react-hook-form";
import { useUpdateOrganizationMutation } from "src/redux/services/admin";
import { useRouter } from "next/router";
import FormProvider, { RHFSelect } from "../../../../components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

type OrganizationStepProps = {
  next: () => void;
};

type FormValuesProps = {
  type: string;
  course: string;
  lesson: string;
};


export default function AssignmentSettings({ next }: OrganizationStepProps) {
  const router = useRouter();
  const [createAssignment, { isLoading }] = useUpdateOrganizationMutation();
  const defaultValues = {
    type: "",
    course: "",
    lesson: ""
  };

  const methods = useForm<FormValuesProps>({
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    try {
      console.log("qwe");
      next();
      // const org = await updateOrg({ body: data }).unwrap();
    } catch (e) {
      // #TODO show error
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            New assignment
          </Typography>

          <RHFSelect
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

          <RHFSelect
            name="course"
            label="Select Course"
            sx={{ width: "320px" }}
          >
            <option key="en" value="en">
              English
            </option>
            <option key="fr" value="fr">
              French
            </option>
          </RHFSelect>

          <RHFSelect
            name="lesson"
            label="Select Lesson"
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
                  theme.palette.mode === "light" ? "common.white" : "grey.800"
              }
            }}
          >
            Next
          </Button>
        </Box>
      </FormProvider>
    </>
  );
}
