import { memo } from "react";

import { Box, Stack } from "@mui/material";

//
import { NavListProps, NavSectionProps } from "../types";
import NavList from "./NavList";

// ----------------------------------------------------------------------

function NavSectionMini({
  data,
  sx,
  ...other
}: NavSectionProps): React.ReactElement | null {
  return (
    <Stack
      spacing={0.5}
      alignItems="center"
      sx={{
        px: 0.75,
        ...sx,
      }}
      {...other}
    >
      {data.map((group, index) => (
        <Items
          key={group.subheader}
          items={group.items}
          isLastGroup={index + 1 === data.length}
        />
      ))}
    </Stack>
  );
}

export default memo(NavSectionMini);

// ----------------------------------------------------------------------

interface ItemsProps {
  items: NavListProps[];
  isLastGroup: boolean;
}

function Items({ items, isLastGroup }: ItemsProps): React.ReactElement | null {
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

      {!isLastGroup && (
        <Box
          sx={{
            width: 24,
            height: "1px",
            bgcolor: "divider",
            my: "8px !important",
          }}
        />
      )}
    </>
  );
}
