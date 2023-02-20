import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";
import { useAuthContext } from "src/auth/useAuthContext";
import CustomAvatar from "../custom-avatar/CustomAvatar";
import Logo from "../logo/Logo";

export default function UserSection() {
  const { user } = useAuthContext();

  return (
    <>
      <Container maxWidth={false}>
        <Logo sx={{ mx: 2.5, my: 3 }} />
        <Stack display="flex" direction="row" alignItems="center">
          <CustomAvatar
            sx={{ mx: 4, my: 2 }}
            src={user?.avatar}
            name={user?.displayName}
            role={user?.role}
          ></CustomAvatar>
          <Stack display="flex">
            <Stack display="flex" direction="row" spacing={1}>
              <Typography fontSize="16px">
                {user?.first_name &&
                  user?.first_name?.charAt(0).toUpperCase() +
                    user?.first_name?.slice(1)}
              </Typography>
              <Typography fontSize="16px">
                {user?.last_name &&
                  user?.last_name?.charAt(0).toUpperCase() +
                    user?.last_name?.slice(1)}
              </Typography>
            </Stack>
            <Typography color="#637381">{user?.role}</Typography>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
