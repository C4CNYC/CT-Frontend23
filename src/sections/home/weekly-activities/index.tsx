import { useState } from "react";
import { Button, Card, Menu, MenuItem, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import { AiFillInfoCircle } from "react-icons/ai";

export default function WeeklyActivities() {
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
      <Card
        sx={{
          maxWidth: "344px",
          borderRadius: "16px",
          boxShadow:
            " 0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        }}
      >
        <Stack display="flex" direction="row" pl="24px" pt="24px">
          <Typography
            variant="h6"
            fontWeight="600"
            fontSize="16px"
            width="221px"
          >
            Weekly Activities
          </Typography>
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
              <Typography
                variant="body2"
                fontWeight="400"
                fontSize="14px"
                pt="4px"
                pb="4px"
                ml="4px"
              >
                Tribe 1
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
        <Card
          sx={{
            border: "1px solid rgba(145, 158, 171, 0.24)",
            borderRadius: "12px",
            width: "296px",
            height: "92px",
            padding: "18px 20px",
            gap: "16px",
            margin: "24px",
            boxShadow: "none",
          }}
        >
          <Stack
            display="flex"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              src="/assets/icons/home/rating.png"
              width="56"
              height="56"
              alt=""
            />
            <Stack>
              <Typography variant="h6" fontWeight="700" fontSize="18px">
                23
              </Typography>
              <Typography
                variant="body2"
                fontWeight="400"
                fontSize="14px"
                color="#637381"
              >
                Total challenges
              </Typography>
            </Stack>
            <AiFillInfoCircle size={30} fill="rgba(145, 158, 171, 0.16)" />
          </Stack>
        </Card>
        <Card
          sx={{
            border: "1px solid rgba(145, 158, 171, 0.24)",
            borderRadius: "12px",
            width: "296px",
            height: "92px",
            padding: "18px 20px",
            gap: "16px",
            margin: "24px",
            boxShadow: "none",
          }}
        >
          <Stack
            display="flex"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              src="/assets/icons/home/viewed.png"
              width="56"
              height="56"
              alt=""
            />
            <Stack>
              <Typography variant="h6" fontWeight="700" fontSize="18px">
                65
              </Typography>
              <Typography
                variant="body2"
                fontWeight="400"
                fontSize="14px"
                color="#637381"
              >
                Total slide viewed
              </Typography>
            </Stack>
            <AiFillInfoCircle size={30} fill="rgba(145, 158, 171, 0.16)" />
          </Stack>
        </Card>
        <Card
          sx={{
            border: "1px solid rgba(145, 158, 171, 0.24)",
            borderRadius: "12px",
            width: "296px",
            height: "92px",
            padding: "18px 20px",
            gap: "16px",
            margin: "24px",
            boxShadow: "none",
          }}
        >
          <Stack
            display="flex"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              src="/assets/icons/home/logged.png"
              width="56"
              height="56"
              alt=""
            />
            <Stack>
              <Typography variant="h6" fontWeight="700" fontSize="18px">
                40
              </Typography>
              <Typography
                variant="body2"
                fontWeight="400"
                fontSize="14px"
                color="#637381"
              >
                User logged in
              </Typography>
            </Stack>
            <AiFillInfoCircle size={30} fill="rgba(145, 158, 171, 0.16)" />
          </Stack>
        </Card>
      </Card>
    </>
  );
}
