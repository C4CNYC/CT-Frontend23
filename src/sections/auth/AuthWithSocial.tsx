// @mui
import { Divider, IconButton, Stack, Button } from "@mui/material";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
// components
import Iconify from "../../components/iconify";
import {DeleteIcon} from '@mui/icons-material'

// ----------------------------------------------------------------------

export default function AuthWithSocial() {
  const { loginWithGoogle, loginWithGithub, loginWithTwitter } =
    useAuthContext();

  const handleGoogleLogin = async () => {
    try {
      if (loginWithGoogle) {
        loginWithGoogle();
      }
      console.log("GOOGLE LOGIN");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before, ::after": {
            borderTopStyle: "dashed",
          },
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button variant="outlined"
                startIcon={<Iconify icon="eva:google-fill" color="#DF3E30" sx={{mr: 2}}/>}
                sx={{ width: '100%', borderRadius: '50px'}}
        >
          Register with Google
        </Button>
      </Stack>
    </div>
  );
}
