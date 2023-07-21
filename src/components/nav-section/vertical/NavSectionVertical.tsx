import { List, Stack } from "@mui/material";

import { useLocales } from "../../../locales";
import { NavSectionProps } from "../types";
import NavList from "./NavList";
import { StyledSubheader } from "./styles";

// ----------------------------------------------------------------------

export default function NavSectionVertical({
  data,
  sx,
  ...other
}: NavSectionProps): React.ReactElement | null {
  const { translate } = useLocales();

  if (!data?.length) return null;

  return (
    <Stack sx={sx} {...other}>
      {data?.map((group) => {
        const key = group.subheader || group.items[0].title;

        return (
          <List key={key} disablePadding sx={{ px: 1 }}>
            {group.subheader && (
              <StyledSubheader disableSticky>{`${translate(
                group.subheader
              )}`}</StyledSubheader>
            )}

            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                depth={1}
                hasChild={!!list.children}
              />
            ))}
          </List>
        );
      })}
    </Stack>
  );
}
