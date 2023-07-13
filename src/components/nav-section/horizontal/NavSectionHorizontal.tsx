import { memo } from "react";

import { Stack } from "@mui/material";

import { hideScrollbarY } from "@utils";

import { NavListProps, NavSectionProps } from "../types";
import NavList from "./NavList";

// ----------------------------------------------------------------------

function NavSectionHorizontal({
  data,
  sx,
  ...other
}: NavSectionProps): React.ReactElement | null {
  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mx: "auto",
          ...hideScrollbarY,
          ...sx,
        }}
        {...other}
      >
        {data.map((group) => (
          <Items key={group.subheader} items={group.items} />
        ))}
      </Stack>
    </>
  );
}

export default memo(NavSectionHorizontal);

// ----------------------------------------------------------------------

interface ItemsProps {
  items: NavListProps[];
}

function Items({ items }: ItemsProps): React.ReactElement | null {
  return (
    <>
      {items.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={1}
          hasChild={!!list.children}
        />
      ))}
    </>
  );
}
