import Image from "next/image";
import { useState } from "react";

import { AiFillInfoCircle } from "react-icons/ai";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Card, Menu, MenuItem, Stack, Typography } from "@mui/material";

export default function WeeklyActivities(): React.ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        maxWidth: "344px",
        borderRadius: "16px",
        gap: 2,
        boxShadow:
          " 0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
      }}
    >
      <Stack display="flex" direction="row">
        <Typography variant="h6" fontWeight="600" fontSize="16px" width="221px">
          Weekly Activities
        </Typography>
        <Stack mr="24px">
          <Button
            id="customized-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disableElevation
            onClick={handleClick}
            sx={{
              color: "#212B36",
              minWidth: "90px",
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
              "aria-labelledby": "customized-button",
            }}
            sx={{
              "& .MuiPaper-root": { minWidth: "90px" },
            }}
          >
            <MenuItem onClick={handleClose} disableRipple>
              Tribe
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
      <Card
        sx={{
          border: "1px solid rgba(145, 158, 171, 0.24)",
          borderRadius: "12px",
          maxWidth: "296px",
          padding: "18px 20px",
          width: "100%",
          gap: "16px",
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
          maxWidth: "296px",
          height: "92px",
          padding: "18px 20px",
          gap: "16px",
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
          maxWidth: "296px",

          height: "92px",
          padding: "18px 20px",
          gap: "16px",

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
  );
}
