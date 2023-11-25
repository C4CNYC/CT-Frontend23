import { useRouter } from "next/router";

import { countries } from "@assets/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { FormProvider, RHFSelect, useSnackbar } from "@components";
import { useUpdateStudentProfileMutation } from "src/redux/services/auth";

import { styledRegisterInput } from "../styles";

interface FormValueProps {
  country: string;
  birthDate: string;
}

export default function StepperInfo(): React.ReactElement {
  const { reload } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [updateUser] = useUpdateStudentProfileMutation();

  const CreateInfoSchema = Yup.object().shape({
    country: Yup.string(),
    birthDate: Yup.string(),
  });

  const methods = useForm<FormValueProps>({
    resolver: yupResolver(CreateInfoSchema),
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = async (data: FormValueProps) => {
    try {
      await updateUser({
        country: data.country?.toLowerCase(),
        // birthDate: data.birthDate,
      }).unwrap();

      reload();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack
          direction="row"
          sx={{ alignItems: "baseline", ml: { xs: 3, sm: 3, md: 0 }, mt: 3 }}
        >
          <Typography variant="h3">Date of Birth</Typography>
          <Typography variant="h2" sx={{ display: "inline-flex", ml: 1 }}>
            🎂
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}>
          This helps us assign you to the right groups
        </Typography>
        <Controller
          name="birthDate"
          control={methods.control}
          defaultValue=""
          render={({ field: { onChange, value, ...restField } }) => (
            <DatePicker
              value={value}
              onChange={(event) => {
                onChange(event as string | React.ChangeEvent<Element>);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={(theme) => ({ ...styledRegisterInput(theme) })}
                  margin="normal"
                  fullWidth
                  style={{ marginRight: "10px" }}
                />
              )}
            />
          )}
        />
        <Divider sx={{ my: 2 }}>&</Divider>
        <RHFSelect
          native
          name="country"
          label="Country"
          sx={(theme) => ({ ...styledRegisterInput(theme) })}
        >
          <option key={"US"} value={"US"}>
            United States
          </option>
          <option disabled>─────────────────────────</option>
          {countries
            .filter((el) => el.code !== "US")
            .map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
        </RHFSelect>
        <LoadingButton
          type="submit"
          loading={methods.formState.isSubmitting}
          sx={{
            background: "#43D4DD33",
            color: "#43D4DD",
            fontSize: "1.5rem",
            mt: 2,
            width: "100%",
            "&:hover": {
              background: "#fff",
            },
          }}
        >
          ALL DONE
        </LoadingButton>
      </FormProvider>
    </>
  );
}
