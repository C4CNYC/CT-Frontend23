import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

import { RHFTextField } from "@components";

interface ICreateHeaderProps {
  choosenColor: string;
}

export default function CreateHeader({
  choosenColor,
}: ICreateHeaderProps): React.ReactElement {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        background: choosenColor,
        minHeight: "340px",
        justifyContent: "center",
        px: 8,
      }}
    >
      <Stack>
        <Box>
          <Typography
            variant="h3"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            Create class
          </Typography>
          <RHFTextField
            name="name"
            autoComplete="off"
            inputRef={(input) => input && input.focus()}
            placeholder="Enter a class name here ... "
            inputProps={{
              style: {
                fontSize: "62px",
                padding: 0,
                color: theme.palette.primary.contrastText,
                fontWeight: 700,
              },
              sx: {
                "&::placeholder": {
                  opacity: 0.4,
                },
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                background: "transparent",
                p: 0,
              },
              "& input:-webkit-autofill": {
                "-webkit-background-clip": "text",
                transition: "background-color 5000s ease-in-out 0s",
                boxShadow: `inset 0 0 .1px .1px transparent`,
              },
              "& fieldset": { border: "none" },
            }}
          />
          <RHFTextField
            name="description"
            autoComplete="off"
            inputRef={(input) => input && input.focus()}
            placeholder="and description here ... "
            inputProps={{
              style: {
                fontSize: "32px",
                padding: 0,
                color: theme.palette.primary.contrastText,
                fontWeight: 700,
              },
              sx: {
                "&::placeholder": {
                  opacity: 0.4,
                },
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                background: "transparent",
                p: 0,
              },
              "& input:-webkit-autofill": {
                "-webkit-background-clip": "text",
                transition: "background-color 5000s ease-in-out 0s",
                boxShadow: `inset 0 0 .1px .1px transparent`,
              },
              "& fieldset": { border: "none" },
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
