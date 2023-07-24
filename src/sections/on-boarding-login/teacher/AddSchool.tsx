import { countries } from "@assets/data";

import { Button, MenuItem, Stack, Typography } from "@mui/material";

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
          })}
        />
        <RHFSelect
          name="schoolType"
          label="Type of School"
          sx={(theme) => ({
            "& .MuiInputBase-root": {
              height: "52px",
              background: theme.palette.grey[200],
            },
            "& fieldset": { border: "none" },
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
        <Stack direction="row" sx={{ my: 2, gap: 2 }}>
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
        <Button
          sx={{
            background: "#43D4DD33",
            color: "#43D4DD",
            fontSize: "1.5rem",
            mt: 1,
          }}
        >
          ALL DONE
        </Button>
        <Button
          onClick={handleBack}
          sx={{
            background: "#EE467A33",
            color: "#EE467A",
            fontSize: "1.5rem",
            mt: 1,
            "&:hover": {
              background: "#f9e0ef",
            },
          }}
        >
          BACK
        </Button>
      </Stack>
    </>
  );
}
