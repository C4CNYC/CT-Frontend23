import {
  Avatar,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MdWifiTethering } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

export default function GroupHeader(): React.ReactElement {
  const theme = useTheme();
  const student = useSelector((state: RootState) => state.global.user);
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  if (!isDesktop) {
    return <></>;
  }
  return (
    <Stack
      sx={{
        borderRadius: "35px",
        background: "rgba(1, 152, 237, 0.1)",
        p: "2px",
        alignItems: "center",
        ml: "141px",
      }}
      direction="row"
    >
      <Avatar
        sx={{
          border: "2px solid #FBDD3F",
          background: "#0198ED",
          width: "35px",
          height: "35px",
        }}
      >
        🤖
      </Avatar>
      <Stack
        sx={{
          pl: 2,
          pr: 4,
          width: "250px",
        }}
      >
        <Typography variant="caption" sx={{ color: "#A6A6A6", mb: -0.5 }}>
          Group
        </Typography>
        <Tooltip
          title={
            student?.classes?.[0]?.name &&
            student?.classes?.[0]?.name.length > 23 ? (
              <Typography variant="subtitle2">
                {student?.classes?.[0]?.name}
              </Typography>
            ) : (
              ""
            )
          }
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: "#0198ED",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {student?.classes?.[0]?.name}
          </Typography>
        </Tooltip>
      </Stack>
      <MdWifiTethering
        size="20px"
        color="#A6A6A6"
        style={{ justifySelf: "flex-end", marginRight: "5px" }}
      />
    </Stack>
  );
}
