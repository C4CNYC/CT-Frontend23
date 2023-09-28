import NextLink from "next/link";

import { MdWifiTethering } from "react-icons/md";

import {
  Avatar,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useSelector } from "src/redux/store";

export default function GroupHeader(): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const tribe = useSelector((state) => state.codePanel.class);

  if (!isDesktop || !tribe) {
    return <></>;
  }

  return (
    <Stack
      href={tribe ? STUDENT_PATH_DASHBOARD.class.id(tribe.id) : "#"}
      component={NextLink}
      sx={{
        borderRadius: "35px",
        background: "rgba(1, 152, 237, 0.1)",
        p: "2px",
        alignItems: "center",
        ml: "141px",
        textDecoration: "none",
        pointerEvents: tribe ? "all" : "none",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      direction="row"
    >
      <Avatar
        alt="avatar"
        src={tribe?.avatar ?? ""}
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
            tribe && tribe.name.length > 23 ? (
              <Typography variant="subtitle2">{tribe.name}</Typography>
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
            {tribe?.name}
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
