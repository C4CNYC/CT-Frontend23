import { Stack } from "@mui/material";

import NavList from "./NavList";

import { NavProps } from "../types";

export default function NavDesktop({
  isOffset,
  data,
}: NavProps): React.ReactElement | null {
  return (
    <Stack
      component="nav"
      direction="row"
      spacing={5}
      sx={{ mr: 5, height: 1 }}
    >
      {data.map((link) => (
        <NavList key={link.title} item={link} isOffset={isOffset} />
      ))}
    </Stack>
  );
}
