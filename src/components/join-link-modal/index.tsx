import { useState } from "react";

import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { Iconify } from "../iconify";

interface Prop {
  children: React.ReactElement;
}

export default function JoinLinkModal({ children }: Prop) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box onClick={() => { setOpen(true); }}>{children}</Box>
      <Dialog
        open={open}
        onClose={() => { setOpen(false); }}
        fullWidth
        sx={{ minHeight: "40vh" }}
      >
        <Box
          sx={{
            background: "#244adeba",
            maxHeight: "250px",
            position: "relative",
            borderEndEndRadius: "20px",
            borderBottomLeftRadius: "20px",
            color: "white",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            pt="13px"
            pr="34px"
          >
            <Iconify icon="octicon:people-16" />
            <Typography fontSize="16px" ml="13px" fontWeight="700">
              22
            </Typography>
          </Box>
          <Box sx={{ ml: "40px", mt: "10vh", mb: "10px" }}>
            <Typography variant="h3">CreativeLalaby23</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            ml="36px"
            mr="20px"
            mb="30px"
          >
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: 24, height: 24, mr: "12px" }} />
              <Typography variant="h6"> Jonathan T.</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Iconify icon="bytesize:location" />
              <Typography variant="h6" ml="8px">
                Bali, Indonesia
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box mt="20px" p="0px 80px">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography variant="h4" sx={{ color: "#364954" }}>
              Join this tribe
            </Typography>
            <Typography variant="body1" sx={{ color: "#364954" }}>
              You’ve been invited to join this tribe.
            </Typography>
          </Box>
          <Button
            fullWidth
            sx={{
              background: "#D9F6F8",
              color: "#43D4DD",
              borderRadius: "15px",
              fontSize: "28px",
              mt: "20px",
              "&:hover": {
                background: "#D9F6F8",
              },
            }}
          >
            Join
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: "20px",
              mb: "60px",
              fontSize: "32px",
            }}
          >
            <Button
              sx={{
                color: "#5D6C75",
                "&:hover": {
                  background: "none",
                },
              }}
              variant="text"
            >
              Not now
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
