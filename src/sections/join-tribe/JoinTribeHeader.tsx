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
        background: classInfo.cover,
        py: 2,
        px: 3,
        color: theme.palette.primary.contrastText,
        position: "relative",
        borderBottomLeftRadius: "18px",
        borderBottomRightRadius: "18px",
        "&:before": {
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          content: "' '",
          background: "rgba(0,0,0, .1)",
          borderBottomLeftRadius: "18px",
          borderBottomRightRadius: "18px",
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
          {classInfo.students?.length}
        </Typography>
        <Typography variant="h3" mb={2}>
          {classInfo.name}
        </Typography>
        {
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          classInfo.school?.country || classInfo.school?.city ? (
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row">
                <Avatar
                  src={""}
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
                <Typography variant="subtitle1"></Typography>
              </Stack>

              {(classInfo.school?.city || classInfo.school?.city) && (
                <Typography variant="subtitle1">
                  <ImLocation2 /> {classInfo.school.city}
                  {", "}
                  {classInfo.school.country}
                </Typography>
              )}
            </Stack>
          ) : null
        }
      </Stack>
    </Stack>
  );
}
