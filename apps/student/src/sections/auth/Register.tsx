import { useSettingsContext, Logo } from "@ct-nx/components";
import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { PATH_AUTH } from "@routes/paths";
import NextLink from "next/link";
import { FcGoogle } from "react-icons/fc";
import RegisterCoderForm from "./RegisterCoderForm";

export default function Register(): React.ReactElement {
  const { themeStretch } = useSettingsContext();

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          m: "0 auto",
          minHeight: "100vh",
          pt: "80px",
          pb: "32px",
          maxWidth: { xs: "335px", sm: "480px" },
        }}
      >
        <Logo
          sx={{
            mb: "40px",
          }}
        />
        <Typography variant="h5">Let’s register your account!</Typography>
        <Typography sx={{ mt: "8px", mb: "40px" }} variant="body2">
          It’s soooo easy to register.
        </Typography>
        <Box width="100%" pb="20px">
          <RegisterCoderForm />
        </Box>
        <Divider
          flexItem
          sx={{
            typography: "overline",
            color: "text.disabled",
          }}
        >
          OR
        </Divider>
        <Button
          sx={{
            width: "100%",
            py: "15px",
            color: "#000",
            border: "1px solid #919EAB52",
            borderRadius: "100px",
            mt: "24px",
            mb: "40px",
          }}
        >
          <Box sx={{ mr: "15px", height: "20px" }}>
            <FcGoogle size="20px" />
          </Box>
          Register with Google
        </Button>
        <Typography variant="subtitle2">
          I’ve been here before.
          <Link component={NextLink} href={PATH_AUTH.login} sx={{ ml: 1 }}>
            Let me Login
          </Link>
        </Typography>
        <Typography
          variant="caption"
          sx={{
            position: { xs: "initial", sm: "fixed" },
            bottom: "32px",
            pt: { xs: "10px", sm: "0" },
          }}
        >
          Copyright CodeTribe 2022 © All rights reserved.
        </Typography>
      </Stack>
    </Container>
  );
}
