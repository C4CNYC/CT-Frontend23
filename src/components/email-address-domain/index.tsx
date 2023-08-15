import { useState } from "react";

import { AiFillPlusCircle } from "react-icons/ai";

import {
  Box,
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { Iconify } from "../iconify";

interface Prop {
  children: React.ReactElement;
}

export default function EmailAddressModal({ children }: Prop) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box onClick={() => { setOpen(true); }}>{children}</Box>
      <Dialog
        open={open}
        onClose={() => { setOpen(false); }}
        sx={{ minWidth: "70wh" }}
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
              onClick={() => { setOpen(false); }}
            />
          </IconButton>
        </Box>
        <Box ml="30px" mb="30px" mr="30px" mt="-20px">
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
                onClick={() => { setOpen(false); }}
              />
            </Button>
            <Typography variant="h4" ml="-10px">
              Email address
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            placeholder="Type email"
            multiline
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AiFillPlusCircle size={30}/>
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: "8px",
              background: "#f0f0f0",
              fontSize: "16px",
              mt: "40px",
            }}
          />
          <Button
            fullWidth
            sx={{
              mt: 5,
              background: "#d1329e",
              color: "white",
              "&:hover": {
                background: "#d1329e",
              },
              height: "54px",
              fontSize: "20px",
            }}
          >
            Confirm
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
