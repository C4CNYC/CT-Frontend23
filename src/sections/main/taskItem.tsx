import { 
  Grid, 
  Link, 
  Typography,
 } from "@mui/material";
import { Box } from "@mui/system";

import { Iconify } from "@components";

import { 
  convertDuration, 
  BaseResponseInterface,
} from "@utils";

import { IAssignment } from "src/redux/interfaces/assignment.interface";

interface Props {
  assignment?: IAssignment & BaseResponseInterface;
}

const LanguageLogo: Record<string, string> = {
  python: "vscode-icons:file-type-python",
  javascript: "vscode-icons:file-type-js",
};

export default function TaskItem({
  assignment,
}: Props): React.ReactElement | null {
  if (!assignment) return null;

  const lang = assignment?.code_assignment?.language;
  return (
    <Grid container mb="15px" alignItems="center">
      <Grid>
        <Box
          sx={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid lightgray",
          }}
        >
          <Iconify width="40px" icon={LanguageLogo[lang]} />
        </Box>
      </Grid>
      <Grid sx={{ ml: { xs: 1, sm: 3 }, flexGrow: 1 }}>
        <Typography variant="body1" gutterBottom>
          {assignment.name}
        </Typography>
        <Grid container>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Iconify color="gray" width="20px" icon="mingcute:computer-fill" />
            <Typography
              noWrap={true}
              variant="body2"
              sx={{
                width: "100px",
                display: "inline-block",
                color: "gray",
                ml: 1,
              }}
            >
              {assignment.lesson.name}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{ display: "flex", alignItems: "center", ml: { xs: 1, sm: 3 } }}
          >
            <Iconify
              color="gray"
              width="20px"
              icon="material-symbols:nest-clock-farsight-analog-rounded"
            />
            <Typography
              variant="body2"
              sx={{ display: "inline-block", color: "gray", ml: 1 }}
            >
              {convertDuration(assignment.duration) ?? "No Limit"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Link
          href="#"
          sx={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: "#d2f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Iconify
            color="#02D3D7"
            width="20px"
            icon="material-symbols:play-arrow-rounded"
          />
        </Link>
      </Grid>
    </Grid>
  );
}
