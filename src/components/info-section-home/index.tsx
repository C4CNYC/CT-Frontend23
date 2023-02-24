// hook
import { useState } from "react";
// mui
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// icon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CardInfo from "@components/card-info";

export default function InfoSectionHome() {
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
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack mt="24px" ml="24px">
            <Typography fontWeight="700" fontSize="14px">
              How Slides Work: Choose your format
            </Typography>
            <Typography
              variant="body2"
              fontWeight="400"
              color="#637381"
              mt="4px"
            >
              12 Tribes
            </Typography>
          </Stack>

          <Stack mr="24px">
            <Button
              id="demo-customized-button"
              aria-controle={open ? "demo-customized-menu" : undefined}
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
                1
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <Stack
          display="flex"
          direction="row"
          justifyContent="space-between"
          p="24px"
        >
          <CardInfo />
        </Stack>
      </Stack>
    </>
  );
}
