import { Box, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/system";

interface ICourseDescriptionProps {
  name: string;
  desc: string;
  index: number;
}

export default function CourseDescription({
  name,
  desc,
}: ICourseDescriptionProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        [theme.breakpoints.down(1400)]: {
          flexWrap: "wrap",
          gap: 2,
        },
      }}
    >
      <Box>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h5" fontWeight={400} maxWidth={600}>
          {desc}
        </Typography>
      </Box>
      <Box
        sx={{
          background: "#F0EEEE",
          borderRadius: 2,
          boxShadow: "3px 4px 4px 0px #00000026",
          px: 3,
          py: 1,
          height: "fit-content",
          [theme.breakpoints.down(1400)]: {
            ml: "auto",
          },
        }}
      >
        <Typography variant="h6" color="#364954" gutterBottom>
          AUTHOR
        </Typography>
        <Stack direction="row" alignItems="center">
          <Avatar
            alt="Jason"
            src="/static/images/avatar/1.jpg"
            sx={{
              width: "60px",
              height: "60px",
              border: "2px solid #EE467A",
              mr: 2,
            }}
          />
          <Box>
            <Typography
              noWrap
              variant="subtitle1"
              maxWidth="150px"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              Jason Doe
            </Typography>
            <Typography noWrap maxWidth="150px" variant="body1">
              john@gmail.com
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
