import _ from "lodash";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { 
  Box, 
  useTheme,
} from "@mui/system";
import { 
  Grid, 
  Stack,
} from "@mui/material";

import QuickRabbitsItem from "./quick-rabbits-item";
import { quickRabbitAtom } from "../atoms/quick-rabbit.atom";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { QuickRabbitsSideList } from "./quick-rabbits-side-list";

export const QuickRabbits = (): React.ReactElement => {
  const theme = useTheme();
  const { query, push } = useRouter();
  const [quickRabits, setQuckRabit] = useAtom(quickRabbitAtom);

  const onClose = (userId: string): void => {
    setQuckRabit((prev) => _.omit(prev, [userId]));
    if (userId === query.studentId) {
      push(MANAGER_PATH_DASHBOARD.school.controller(query.id as string))
    }
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
          // Change if it will be necessary
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
