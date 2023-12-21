import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

import { RHFTextField } from "@components";
import { useTranslate } from "src/utils/translateHelper";

interface ICreateHeaderProps {
  choosenColor: string;
}

export default function CreateHeader({
  choosenColor,
}: ICreateHeaderProps): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const translate = useTranslate();

  return (
    <Stack
      sx={{
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        background: choosenColor,
        minHeight: "300px",
        justifyContent: "center",
        px: { xs: 1, sm: 4, md: 8 },
      }}
    >
      <Stack>
        <Box>
          <Typography
            variant="h3"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            {translate("class_create_class")}
          </Typography>
          <RHFTextField
            name="name"
            autoComplete="off"
            // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
            inputRef={(input) => input && input.focus()}
            placeholder={
              isMobile
                ? translate("class_enter_class_name")
                : translate("class_enter_name")
            }
            inputProps={{
              style: {
                padding: 0,
                fontWeight: 700,
              },
              sx: {
                fontSize: { xs: "42px", sm: "52px", md: "62px" },
                color: "#fff",
                "&::placeholder": {
                  opacity: 0.7,
                  color: "#fff",
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
                boxShadow: "inset 0 0 .1px .1px transparent",
              },
              "& fieldset": { border: "none" },
            }}
          />
          <RHFTextField
            name="description"
            autoComplete="off"
            placeholder={translate("class_enter_description")}
            inputProps={{
              style: {
                padding: 0,
                color: theme.palette.primary.contrastText,
                fontWeight: 700,
              },
              sx: {
                fontSize: { xs: "24px", sm: "32px" },
                "&::placeholder": {
                  opacity: 0.7,
                  color: "#fff",
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
                boxShadow: "inset 0 0 .1px .1px transparent",
              },
              "& fieldset": { border: "none" },
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
