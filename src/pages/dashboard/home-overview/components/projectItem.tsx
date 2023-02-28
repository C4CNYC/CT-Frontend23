import Iconify from "@components/iconify";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

type Props = {
  name: string;
  descr: string;
  progress: string;
  time: number;
  lessons: number;
};

export default function ProjectItem({
  name,
  descr,
  progress,
  time,
  lessons,
}: Props): React.ReactElement {
  return (
    <>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, maxWidth: "350px" }}>
        <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "orange",
            }}
          />
          <Box display="flex">
            <Box sx={{ position: "relative", display: "inline-flex", mr: 2 }}>
              <CircularProgress
                size="20px"
                variant="determinate"
                value={100}
                sx={{ position: "absolute", color: "#FF1D89" }}
              />
              <CircularProgress
                sx={{ color: "#FF1D89" }}
                size="20px"
                variant="determinate"
                value={15}
                thickness={25}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </Box>
            <Typography sx={{ display: "inline-block", color: "#FF1D89" }}>
              {progress} Completed
            </Typography>
          </Box>
        </Grid>
        <Typography variant="h4" gutterBottom>
          {name}
        </Typography>
        <Typography variant="subtitle1">{descr}</Typography>
        <Grid container justifyContent="space-between" sx={{ my: 4 }}>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Iconify color="gray" width="20px" icon="mingcute:computer-fill" />
            <Typography sx={{ display: "inline-block", color: "gray", ml: 1 }}>
              {lessons} lessons
            </Typography>
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Iconify
              color="gray"
              width="20px"
              icon="material-symbols:nest-clock-farsight-analog-rounded"
            />
            <Typography sx={{ display: "inline-block", color: "gray", ml: 1 }}>
              {time} mins
            </Typography>
          </Grid>
        </Grid>
        <Button
          sx={{
            border: "1px solid #02D3D7",
            borderRadius: "100px",
            width: "100%",
            padding: "12px 0",
            color: "#02D3D7",
            fontSize: "16px",
          }}
          startIcon={
            <Iconify
              width="25px"
              color="#02D3D7"
              icon="mdi:briefcase-variant-outline"
            />
          }
        >
          View Project
        </Button>
      </Paper>
    </>
  );
}
