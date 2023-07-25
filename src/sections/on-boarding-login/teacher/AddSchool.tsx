import { countries } from "@assets/data";

import { Stack, Typography } from "@mui/material";

import { RHFSelect, RHFTextField } from "@components";

interface Props {
  handleBack: () => void;
}

export default function AddSchool({ handleBack }: Props): React.ReactElement {
  return (
    <>
      <Stack direction="row" sx={{ ml: { xs: 3, sm: 3, md: 0 } }}>
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
          name="name"
          label="First Name"
          required
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
          name="schoolType"
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
          <option key="empty" value="empty"></option>
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
            required
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
            name="zipCode"
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
          required
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
    </>
  );
}
