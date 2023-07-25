import { BaseSyntheticEvent } from "react";

import { countries } from "@assets/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { MdArrowBackIosNew } from "react-icons/md";
import * as Yup from "yup";

import { Button, IconButton, Stack, Typography } from "@mui/material";

import { FormProvider, RHFSelect, RHFTextField } from "@components";

import { teacherStepperAtom } from "./teacher-stepper-atom";

interface SchoolFormProps {
  schcoolName: string;
  type: string;
  city: string;
  zip: string;
  country: string;
}

export default function AddSchool(): React.ReactElement {
  const [activeStep, setActiveStep] = useAtom(teacherStepperAtom);

  const CreateSchoolSchema = Yup.object().shape({
    shcoolName: Yup.string().required("Name is required"),
    type: Yup.string().required("Choose type of school"),
    city: Yup.string().required("City your surname"),
    zip: Yup.string(),
    country: Yup.string().required("Choose school country"),
  });

  const methods = useForm<SchoolFormProps>({
    resolver: yupResolver(CreateSchoolSchema),
    mode: "all",
  });

  const onSubmit = async (data: SchoolFormProps) => {
    console.log(data);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack direction="row" sx={{ ml: { xs: 3, sm: 3, md: 0 }, mt: 1 }}>
          <Typography
            variant="h3"
            sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}
          >
            Add School{" "}
            <Typography sx={{ display: "inline-flex" }} variant="h2">
              🏫
            </Typography>
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}>
          This is the school name students see
        </Typography>
        <Stack gap={2}>
          <RHFTextField
            name="schoolName"
            label="School name"
            sx={(theme) => ({
              "& .MuiInputBase-root": {
                height: "52px",
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
          />
          <RHFSelect
            native
            name="type"
            label="Type of School"
            sx={(theme) => ({
              "& .MuiInputBase-root": {
                height: "52px",
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
          >
            <option key="pre-k" value="Pre-K">
              Pre-K
            </option>
            <option key="primary" value="primary school">
              Primary School
            </option>
            <option key="middle" value="middle school">
              Middle School
            </option>
            <option key="high" value="high school">
              High School
            </option>
            <option key="technical" value="technical school">
              Technical School
            </option>
            <option key="college" value="college">
              College
            </option>
            <option key="university" value="university">
              University
            </option>
            <option key="other" value="other">
              Other
            </option>
          </RHFSelect>
          <Stack direction="row" sx={{ gap: 2 }}>
            <RHFTextField
              name="city"
              label="City"
              sx={(theme) => ({
                "& .MuiInputBase-root": {
                  height: "52px",
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
            />
            <RHFTextField
              name="zip"
              label="Zip code"
              sx={(theme) => ({
                "& .MuiInputBase-root": {
                  height: "52px",
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
            />
          </Stack>
          <RHFSelect
            native
            name="country"
            label="Country"
            sx={(theme) => ({
              "& .MuiInputBase-root": {
                height: "52px",
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
          >
            <option key={"US"} value={"United States"}>
              United States
            </option>
            <option disabled>─────────────────────────</option>
            {countries
              .filter((el) => el.code !== "US")
              .map((country) => (
                <option key={country.code} value={country.label}>
                  {country.label}
                </option>
              ))}
          </RHFSelect>
        </Stack>
        <Button
          sx={{
            background: "#43D4DD33",
            color: "#43D4DD",
            fontSize: "1.5rem",
            mt: 1,
            width: "100%",
          }}
        >
          ALL DONE
        </Button>
        <IconButton
          onClick={() => {
            setActiveStep(activeStep - 1);
          }}
        >
          <MdArrowBackIosNew />
        </IconButton>
      </FormProvider>
    </>
  );
}
