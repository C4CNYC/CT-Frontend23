import Iconify from "@components/iconify/Iconify";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import * as React from "react";
import FilterCoursesAutocomplete from "./filterCourses";
import FilterLessonsAutocomplete from "./filterLessons";
import FilterStudentsAutocomplete from "./filterStudents";

type Anchor = "top" | "left" | "bottom" | "right";

export default function DrawerFilters() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <Iconify icon="material-symbols:filter-alt-outline" />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Stack display="flex" direction="column" spacing={2} m="30px">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h4"> Filters</Typography>
              </Stack>
              <FilterCoursesAutocomplete />
              <FilterLessonsAutocomplete />
              <FilterStudentsAutocomplete />
            </Stack>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
