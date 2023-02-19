//Icons
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//Mui
import {
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Container from "@mui/system/Container";
import Stack from "@mui/system/Stack";
//Hooks
import { useState } from "react";
//commponents
import IconButtonAnimate from "src/components/animate/IconButtonAnimate";
import MenuPopover from "src/components/menu-popover/MenuPopover";

export default function FilterAssignments() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
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
