import CustomAvatar from "@components/custom-avatar/CustomAvatar";
import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";
import { useAuthContext } from "src/auth/useAuthContext";

export default function UserSection() {
  const { user } = useAuthContext();
  const firstName = user?.first_name;
  const lastName = user?.last_name;
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
          <Tooltip
            placement="top-end"
            disableHoverListener={firstName.length + lastName.length < 17}
            title={
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                }}
                variant="subtitle2"
              >
                {firstName &&
                  firstName?.charAt(0).toUpperCase() + firstName?.slice(1)}{" "}
                {lastName &&
                  lastName?.charAt(0).toUpperCase() + lastName?.slice(1)}
              </Typography>
            }
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                color: "#212B36",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: "140px",
              }}
              variant="subtitle2"
            >
              {firstName &&
                firstName?.charAt(0).toUpperCase() + firstName?.slice(1)}{" "}
              {lastName &&
                lastName?.charAt(0).toUpperCase() + lastName?.slice(1)}
            </Typography>
          </Tooltip>
          <Typography color="#637381" fontWeight="400" fontSize="14px">
            {user?.role}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
