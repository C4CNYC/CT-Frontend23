import NextLink from "next/link";
import { forwardRef } from "react";

import { Box, Link, ListItemText, Tooltip } from "@mui/material";

import { Iconify } from "@components";

import RoleBasedGuard from "../../../auth/RoleBasedGuard";
import { useLocales } from "../../../locales";
import { NavItemProps } from "../types";
import { StyledIcon, StyledItem } from "./styles";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  (
    { item, depth, open, active, isExternalLink, ...other },
    ref
  ): React.ReactElement => {
    const { translate } = useLocales();

    const { title, path, icon, info, children, disabled, caption, roles } =
      item;

    const subItem = depth !== 1;

    const renderContent = (
      <StyledItem
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...other}
      >
        {icon && <StyledIcon>{icon}</StyledIcon>}

        <ListItemText
          primary={`${translate(title)}`}
          primaryTypographyProps={{
            noWrap: true,
            component: "span",
            variant: active ? "subtitle2" : "body2",
          }}
        />

        {info && (
          <Box component="span" sx={{ ml: 1, lineHeight: 0 }}>
            {info}
          </Box>
        )}

        {caption && (
          <Tooltip title={`${translate(caption)}`} arrow>
            <Box component="span" sx={{ ml: 0.5, lineHeight: 0 }}>
              <Iconify icon="eva:info-outline" width={16} />
            </Box>
          </Tooltip>
        )}

        {!!children && (
          <Iconify
            icon={subItem ? "eva:chevron-right-fill" : "eva:chevron-down-fill"}
            width={16}
            sx={{ ml: 0.5, flexShrink: 0 }}
          />
        )}
      </StyledItem>
    );

    const renderItem = (): React.ReactElement => {
      // ExternalLink
      if (isExternalLink) {
        return (
          <Link href={path} target="_blank" rel="noopener" underline="none">
            {renderContent}
          </Link>
        );
      }

      // Default
      return (
        <Link component={NextLink} href={path} underline="none">
          {renderContent}
        </Link>
      );
    };

    return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>;
  }
);

export default NavItem;
