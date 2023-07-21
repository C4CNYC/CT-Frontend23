// Icons
// Hooks
import { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
// Mui
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Container from "@mui/system/Container";
import Stack from "@mui/system/Stack";

// commponents
import { IconButtonAnimate, MenuPopover } from "@components";

export default function FilterAssignments(): React.ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };
  return (
    <>
      <Container maxWidth={false}>
        <Stack
          spacing={2}
          alignItems="center"
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <TextField
            sx={{
              width: "260px",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <IconButtonAnimate onClick={handleOpenPopover}>
            <Avatar />
          </IconButtonAnimate>
          <MenuPopover
            open={openPopover}
            onClose={handleClosePopover}
            sx={{ width: 200, p: 0 }}
          >
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                Profile
              </Typography>
            </Box>
            <Divider sx={{ borderStyle: "dashed" }} />
          </MenuPopover>
          <Button
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color="inherit"
            sx={{ padding: "10px", height: "60px" }}
          >
            Quick filters
            <ListItemIcon>
              <KeyboardArrowDownIcon fontSize="small" />
            </ListItemIcon>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Low priority</MenuItem>
            <MenuItem onClick={handleClose}>Medium priority</MenuItem>
            <MenuItem onClick={handleClose}>Hight priority</MenuItem>
          </Menu>
        </Stack>
      </Container>
    </>
  );
}
