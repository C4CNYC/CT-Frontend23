import CustomAvatar from "@components/custom-avatar/CustomAvatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";
import { useAuthContext } from "src/auth/useAuthContext";

export default function UserSection() {
  const { user } = useAuthContext();

  return (
    <Stack bgcolor="rgba(145, 158, 171, 0.08)" borderRadius="12px">
      <Stack display="flex" direction="row" alignItems="center" mr="52px">
        <CustomAvatar
          sx={{ width: "40px", height: "40px", m: "18px 16px 18px 20px" }}
          src={user?.avatar}
          name={user?.displayName}
          role={user?.role}
        ></CustomAvatar>
        <Stack display="flex">
          <Stack display="flex" direction="row" spacing={1}>
            <Typography
              variant="subtitle2"
              fontWeight="600"
              fontSize="14px"
              color="#212B36"
            >
              {user?.first_name &&
                user?.first_name?.charAt(0).toUpperCase() +
                  user?.first_name?.slice(1)}
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight="600"
              fontSize="14px"
              color="#212B36"
            >
              {user?.last_name &&
                user?.last_name?.charAt(0).toUpperCase() +
                  user?.last_name?.slice(1)}
            </Typography>
          </Stack>
          <Typography color="#637381" fontWeight="400" fontSize="14px">
            {user?.role}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
