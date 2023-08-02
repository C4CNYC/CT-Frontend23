import { FiUsers } from "react-icons/fi";
import { ImLocation2 } from "react-icons/im";

import { Avatar, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { IClass } from "src/redux/interfaces/class.interface";

interface IJoinTribeHeaderProps {
  classInfo: IClass;
}

export default function JoinTribeHeader({
  classInfo,
}: IJoinTribeHeaderProps): React.ReactElement {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        background: "url(/assets/background/overlay_2.jpg)",
        py: 2,
        px: 3,
        color: theme.palette.primary.contrastText,
        position: "relative",
        borderBottomLeftRadius: "16px",
        borderBottomRightRadius: "16px",
        "&:before": {
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          content: "''",
          background: "rgba(0,0,0, .3)",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        },
      }}
    >
      <Stack sx={{ zIndex: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            alignSelf: "flex-end",
            display: "inline-flex",
            alignItems: "center",
            mb: 4,
          }}
        >
          <FiUsers size={18} style={{ marginRight: "5px" }} />
          22
        </Typography>
        <Typography variant="h3" mb={2}>
          CreativeLalaby23
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row">
            <Avatar
              sx={{
                width: "25px",
                height: "25px",
                border: "2px solid #AE5EB7",
                background: "black",
                mr: 2,
              }}
            >
              🦙
            </Avatar>
            <Typography variant="subtitle1">Jonathan T.</Typography>
          </Stack>
          <Typography variant="subtitle1">
            <ImLocation2 /> Bali, Indonesia
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
