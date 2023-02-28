import Iconify from "@components/iconify";
import { Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

type Props = {
  name: string;
};

export default function TaskItem({ name }: Props): React.ReactElement {
  return (
    <Grid container sx={{ alignItems: "center" }}>
      <Grid>
        <Box
          sx={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid lightgray",
          }}
        >
          <Iconify width="40px" icon="vscode-icons:file-type-python" />
        </Box>
      </Grid>
      <Grid sx={{ ml: 2, flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {name}
        </Typography>
        <Grid container>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Iconify color="gray" width="20px" icon="mingcute:computer-fill" />
            <Typography sx={{ display: "inline-block", color: "gray", ml: 1 }}>
              6 lessons
            </Typography>
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center", ml: 3 }}>
            <Iconify
              color="gray"
              width="20px"
              icon="material-symbols:nest-clock-farsight-analog-rounded"
            />
            <Typography sx={{ display: "inline-block", color: "gray", ml: 1 }}>
              60 mins
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Link
          href="#"
          sx={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            backgroundColor: "#d2f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Iconify
            color="#02D3D7"
            width="40px"
            icon="material-symbols:play-arrow-rounded"
          />
        </Link>
      </Grid>
    </Grid>
  );
}
