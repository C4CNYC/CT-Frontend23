import nextLink from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiArrowNarrowRight } from "react-icons/hi";
import { MdOutlineWifiTethering } from "react-icons/md";

import { 
  Link, 
  Stack, 
  Collapse, 
  IconButton, 
  Typography,
 } from "@mui/material";

export default function ClassInfoHeader(): React.ReactElement {
  const [openJoin, setOpenJoin] = useState<boolean>(true);
  return (
    <Collapse in={openJoin}>
      <Stack
        direction="row"
        sx={{
          background: "#22A64733",
          color: "#75CF6D",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 0.5,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <MdOutlineWifiTethering size="20px" color="#75CF6D" />
          <Typography variant="subtitle2" sx={{ mx: 1 }}>
            Group HappyDog-Vermont
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            is live |
          </Typography>
          <Link
            sx={{ display: "flex", alignItems: "center", color: "#75CF6D" }}
            href=""
            component={nextLink}
          >
            <Typography
              variant="body2"
              sx={{ ml: { xs: "28px", sm: 0.7 }, mr: 1 }}
            >
              Join now
            </Typography>
            <HiArrowNarrowRight size="18px" color="#75CF6D" />
          </Link>
        </Stack>
        <IconButton
          onClick={() => {
            setOpenJoin(false);
          }}
          sx={{ p: 0.5 }}
          edge="end"
        >
          <IoClose size="20px" color="#75CF6D" />
        </IconButton>
      </Stack>
    </Collapse>
  );
}
