import { useState } from "react";
// @mui
import {
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
// utils
import { fToNow } from "../../../utils/formatTime";
// _mock_
import { _contacts } from "../../../_mock/arrays";
// components
import { IconButtonAnimate } from "@components/animate";
import BadgeStatus from "@components/badge-status";
import { CustomAvatar } from "@components/custom-avatar";
import Iconify from "@components/iconify";
import MenuPopover from "@components/menu-popover";
import Scrollbar from "@components/scrollbar";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

export default function ContactsPopover(): React.ReactElement {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? "primary" : "default"}
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Iconify icon="eva:people-fill" />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 320 }}
      >
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Contacts{" "}
          <Typography component="span">({_contacts.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          {_contacts.map((contact) => (
            <MenuItem key={contact.id} sx={{ height: ITEM_HEIGHT }}>
              <ListItemAvatar>
                <CustomAvatar
                  src={contact.avatar}
                  BadgeProps={{
                    badgeContent: <BadgeStatus status={contact.status} />,
                  }}
                />
              </ListItemAvatar>

              <ListItemText
                primary={contact.name}
                secondary={
                  contact.status === "offline"
                    ? fToNow(contact.lastActivity)
                    : ""
                }
                primaryTypographyProps={{
                  typography: "subtitle2",
                  sx: { mb: 0.25 },
                }}
                secondaryTypographyProps={{ typography: "caption" }}
              />
            </MenuItem>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
