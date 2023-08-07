import { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { MenuPopover } from "@components";

export default function TribesFillter(): React.ReactElement {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };
  return (
    <Box
      sx={{
        mt: {
          xs: "25px",
          sm: "25px",
          md: "45px",
        },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: {
          xs: "wrap",
          sm: "wrap",
          md: "nowrap",
        },
        gap: {
          xs: 2,
          sm: 2,
          md: 0,
        },
      }}
    >
      <TextField
        placeholder="Search tribe..."
        type="text"
        id="search"
        sx={{ "& .MuiInputBase-root": { height: "40px" } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box>
        <Button
          onClick={handleOpenPopover}
          sx={{ color: "#212B36", ml: "30px" }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Sort by
        </Button>
        <MenuPopover
          open={openPopover}
          onClose={handleClosePopover}
          sx={{
            width: 200,
            p: 2,
            background: { xs: "#fff", sm: "#fff" },
          }}
        >
          <Typography>Popover option</Typography>
        </MenuPopover>
      </Box>
    </Box>
  );
}
