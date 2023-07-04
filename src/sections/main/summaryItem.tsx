import { Iconify } from "@components";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

interface Props {
  title: string;
  subTitle: string;
  color: string;
  icon: string;
  iconColor: string;
  updated: boolean;
}
export default function SummaryItem({
  title,
  subTitle,
  color,
  icon,
  updated,
  iconColor,
}: Props): React.ReactElement {
  return (
    <Grid container>
      <Grid item alignSelf="center" sx={{ ml: 2 }}>
        <Box sx={{ position: "relative", display: "inline-flex", mr: 2 }}>
          <CircularProgress
            size="55px"
            variant="determinate"
            value={100}
            sx={{ position: "absolute", color: "#dedfe0" }}
          />
          <CircularProgress size="55px" variant="determinate" value={75} />
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
          >
            <Iconify color={iconColor} width="25px" icon={icon} />
          </Box>
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">
          {subTitle}
          <Typography
            variant="body2"
            sx={{
              display: "inline-block",
              color: "green",
              fontSize: "11px",
              ml: "5px",
            }}
          >
            {updated ? "+5%" : null}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
}
