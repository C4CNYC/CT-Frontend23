// hook
import { useState } from "react";
// mui
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// icoon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// component
import CardModule from "@components/card-module";
import Menu from "@mui/material/Menu";

export default function MainSectionHome() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack
        width="1100px"
        ml="40px"
        mt="24px"
        mr="40px"
        borderRadius="24px"
        boxShadow="0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)"
      >
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack pl="24px" mt="24px">
            <Typography fontWeight="700" fontSize="32px">
              What are you gonna create today?
            </Typography>
            <Typography variant="body2" color="#637381" fontSize="14px">
              12 Tribes
            </Typography>
          </Stack>
          <Stack mr="24px">
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              disableElevation
              onClick={handleClick}
              sx={{
                color: "#212B36",
                width: "90px",
                height: "30px",
                fontSize: "14px",
                pr: "11px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F4F6F8",
              }}
              endIcon={<KeyboardArrowDownIcon fontSize="inherit" />}
            >
              <Typography variant="body2" pt="4px" pb="4px" ml="4px">
                Weekly
              </Typography>
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
              <MenuItem onClick={handleClose} disableRipple>
                2
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
        <Stack
          display="flex"
          direction="row"
          justifyContent="space-around"
          p="24px"
        >
          <Stack ml="24px">
            <CardModule type="lesson" id="some" image="/assets/images/card-image.png"/>
          </Stack>
          <Stack mr="-17px" ml="-17px">
            <CardModule type="course" id="some" image="/assets/images/card-image.png"/>
          </Stack>
          <Stack mr="24px">
            <CardModule type="module" id="some" image="/assets/images/card-image.png"/>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
