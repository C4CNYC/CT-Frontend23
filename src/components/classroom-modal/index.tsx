import { useState } from "react";

import { FcGoogle } from "react-icons/fc";

import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";

import { Iconify } from "../iconify";

interface Prop {
  children: React.ReactElement;
}

export default function ClassroomModal({ children }: Prop) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </Box>
      <Dialog
        fullWidth
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          sx={{
            justifyContent: "end",
            alignItems: "flex-end",
            display: "flex",
            p: 1,
          }}
        >
          <IconButton>
            <Iconify
              icon="ep:close"
              width={24}
              height={24}
              onClick={() => setOpen(false)}
            />
          </IconButton>
        </Box>
        <Box ml="30px" mb="30px" mr="30px">
          <Box display="flex" alignItems="center" ml="-20px">
            <Button
              sx={{
                color: "inherit",
                background: "none",
                p: "0px",
                "&:hover": {
                  background: "none",
                  boxShadow: "none",
                },
              }}
            >
              <Iconify
                icon="iconamoon:arrow-left-2-bold"
                width={28}
                height={28}
                onClick={() => setOpen(false)}
              />
            </Button>
            <Typography variant="h4" ml="-10px">
              Google Classroom
            </Typography>
          </Box>
          <Box mt="32px">
            <Button
              sx={{
                background: "#f0f0f0",
                color: "#4f4f4f",
                height: "54px",
                p: "8px 28px",
                "&:hover": {
                  background: "#e3e3e3",
                  boxShadow: "none",
                },
              }}
            >
              <FcGoogle size="30px" style={{ marginLeft: "10px" }} />
              <Typography variant="h6" ml="10px">
                Continue with Google
              </Typography>
            </Button>
          </Box>
          <Button
            fullWidth
            sx={{
              mt: "32px",
              background: "#f1c1e2",
              color: "white",
              height: "54px",
              fontSize: "20px",
              "&:hover": {
                background: "#f1c1e2",
              },
            }}
          >
            Done
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
