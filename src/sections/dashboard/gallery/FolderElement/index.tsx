import { Grid, Paper, Stack, Typography } from "@mui/material";

import { Image } from "@components";
import TribesCounter from "@sections/dashboard/tribes/tribesCounter";

interface Props {
  title: string;
  subtitle: string;
  projectCout: number;
}

export default function FolderElement({
  title,
  subtitle,
  projectCout,
}: Props): React.ReactElement {
  return (
    <Paper elevation={5}>
      <Grid container spacing={2} sx={{ p: 1, pb: 2 }}>
        <Grid item xs={8}>
          <Stack sx={{ pl: 3, gap: 1 }}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle2" gutterBottom>
              {subtitle}
            </Typography>
            <Stack direction="row" gap={1}>
              <TribesCounter
                sx={{ background: "rgba(255, 171, 0, 0.16)", ml: 0 }}
                sxText={{ color: "rgb(183, 110, 0)" }}
                count={projectCout}
              />
              <Typography variant="body2">projects inside</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack>
            <Image
              sx={{ ">svg": { fill: "red" } }}
              src="/assets/icons/files/ic_folder.svg"
              alt=""
            />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
