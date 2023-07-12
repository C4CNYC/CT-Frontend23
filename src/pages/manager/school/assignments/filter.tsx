import { useState } from "react";

import {
  Box,
  Menu,
  Avatar,
  Button,
  Divider,
  MenuItem,
  Typography,
  ListItemIcon,
} from "@mui/material";
import Stack from "@mui/system/Stack";
import Container from "@mui/system/Container";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { 
  MenuPopover, 
  IconButtonAnimate,
} from "@components";

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
              width: { xs: "100%", sm: "100%", md: "260px", lg: "260px" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Box display="flex">
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
              sx={{ padding: "10px", height: "60px", whiteSpace: "nowrap" }}
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
          </Box>
        </Stack>
      </Container>
    </>
  );
}
