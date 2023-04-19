import { Grid, Stack } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import QuickRabbitsItem from "./quick-rabbits-item";
import { QuickRabbitsSideList } from "./quick-rabbits-side-list";

export const QuickRabbits = (): React.ReactElement => {
  const theme = useTheme();
  return (
    <Stack direction="row">
      <Grid
        container
        gap={2}
        display="grid"
        p={2}
        pr={9}
        sx={{
          [theme.breakpoints.up(940)]: {
            gridTemplateColumns: "repeat(1, 1fr)",
          },
          [theme.breakpoints.up(940)]: {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          [theme.breakpoints.up(1400)]: {
            gridTemplateColumns: "repeat(3, 1fr)",
          },
          [theme.breakpoints.up(1800)]: {
            gridTemplateColumns: "repeat(4, 1fr)",
          },
          [theme.breakpoints.up(2200)]: {
            gridTemplateColumns: "repeat(5, 1fr)",
          },
        }}
      >
        <QuickRabbitsItem />
        <QuickRabbitsItem />
        <QuickRabbitsItem />
        <QuickRabbitsItem />
        <QuickRabbitsItem />
        <QuickRabbitsItem />
      </Grid>
      <Box width="0px" position="relative">
        <QuickRabbitsSideList />
      </Box>
    </Stack>
  );
};
