import NextLink from "next/link";
import React, { forwardRef } from "react";

import { Link, ListItemText, Tooltip } from "@mui/material";

import { Iconify } from "@components";

import RoleBasedGuard from "../../../auth/RoleBasedGuard";
import { useLocales } from "../../../locales";
import { NavItemProps } from "../types";
import { StyledIcon, StyledItem } from "./styles";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ item, depth, open, active, isExternalLink, ...other }, ref) => {
    const { translate } = useLocales();

    const { title, path, icon, children, disabled, caption, roles, component } =
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
            sx: {
              width: 72,
              fontSize: 10,
              lineHeight: "16px",
              textAlign: "center",
              ...(active && {
                fontWeight: "fontWeightMedium",
              }),
              ...(subItem && {
                fontSize: 14,
                width: "auto",
                textAlign: "left",
              }),
            },
          }}
        />

        {caption && (
          <Tooltip title={`${translate(caption)}`} arrow placement="right">
            <Iconify
              icon="eva:info-outline"
              width={16}
              sx={{
                top: 11,
                left: 6,
                position: "absolute",
              }}
            />
          </Tooltip>
        )}

        {!!children && (
          <Iconify
            width={16}
            icon="eva:chevron-right-fill"
            sx={{
              top: 11,
              right: 6,
              position: "absolute",
            }}
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

      if (component) {
        return component(renderContent);
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
