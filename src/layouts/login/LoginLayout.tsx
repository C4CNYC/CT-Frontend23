// @mui
import { Stack, Typography } from "@mui/material";

// components
import { Image, Logo } from "@components";
import ThemeSwitcher from "src/components/theme-switcher";

//
import {
  StyledContent,
  StyledRoot,
  StyledSection,
  StyledSectionBg,
  StyledSwitcher,
} from "./styles";

// ----------------------------------------------------------------------

interface Props {
  subtitle?: string;
  title?: string;
  illustration?: string;
  children: React.ReactNode;
}

export default function LoginLayout({
  children,
  illustration,
  title,
  subtitle,
}: Props): React.ReactElement | null {
  return (
    <StyledRoot>
      <StyledSection>
        <Logo
          sx={{
            zIndex: 9,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            width: "100%",
            mt: { xs: 1.5, md: 5 },
          }}
        />
        <Typography variant="h3" sx={{ maxWidth: 480, textAlign: "left" }}>
          {title ?? "Hi!"}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            mb: 10,
            maxWidth: 480,
            textAlign: "left",
            color: "text.secondary",
          }}
        >
          {subtitle ?? "Welcome back"}
        </Typography>

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={illustration ?? "/assets/illustrations/auth-cat.png"}
          sx={{ maxWidth: 720 }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
      <StyledSwitcher>
        <ThemeSwitcher />
      </StyledSwitcher>
    </StyledRoot>
  );
}
