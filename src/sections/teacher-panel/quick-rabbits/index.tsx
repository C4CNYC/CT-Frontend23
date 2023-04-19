import { Grid, Stack } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useAtom } from "jotai";
import _ from "lodash";
import { quickRabbitAtom } from "../atoms/quick-rabbit.atom";
import QuickRabbitsItem from "./quick-rabbits-item";
import { QuickRabbitsSideList } from "./quick-rabbits-side-list";

export const QuickRabbits = (): React.ReactElement => {
  const theme = useTheme();
  const [quickRabits, setQuckRabit] = useAtom(quickRabbitAtom);

  const onClose = (userId: string): void => {
    setQuckRabit((prev) => _.omit(prev, [userId]));
  };
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
        {Object.values(quickRabits).map((rabit) => (
          // <Grid item xs={4} key={rabit.id}>
          <QuickRabbitsItem rabit={rabit} key={rabit.id} onClose={onClose} />
          // </Grid>
        ))}
      </Grid>
      <Box width="0px" position="relative">
        <QuickRabbitsSideList />
      </Box>
    </Stack>
  );
};
