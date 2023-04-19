import { Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import  QuickRabbitsItem  from "./quick-rabbits-item";
import { QuickRabbitsSideList } from "./quick-rabbits-side-list";

export const QuickRabbits = (): React.ReactElement => {
  return (
    <Stack direction="row">
      <Grid container spacing={2} p={1}>
        <Grid item xs={4}>
          <QuickRabbitsItem />
        </Grid>
        <Grid item xs={4}>
          <QuickRabbitsItem />
        </Grid>
        <Grid item xs={4}>
          <QuickRabbitsItem />
        </Grid>
        <Grid item xs={4}>
          <QuickRabbitsItem />
        </Grid>
        <Grid item xs={4}>
          <QuickRabbitsItem />
        </Grid>
        <Grid item xs={4}>
          <QuickRabbitsItem />
        </Grid>
      </Grid>
      <Box width="88px" position="relative">
        <QuickRabbitsSideList />
      </Box>
    </Stack>
  );
};
