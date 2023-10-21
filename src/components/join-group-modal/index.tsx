import { useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";

import { ClassMembersAutocomplete } from "../class-members-autocomplete";
import { Iconify } from "../iconify";

interface Props {
  children: React.ReactElement;
  rowId: string;
}
export default function JoinGroupModal({ children, rowId }: Props) {
  const [open, setOpenDialog] = useState(false);
  return (
    <>
      <Box
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpenDialog(false);
        }}
        fullWidth
        scroll="body"
      >
        <Box sx={{ width: "100%" }}>
          <Box mb={2}>
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
                  onClick={() => {
                    setOpenDialog(false);
                  }}
                />
              </IconButton>
            </Box>
            <Box ml="32px">
              <Typography variant="h4">Join your group</Typography>
              <Typography variant="body1" sx={{ color: "#4f4f4f", mb: "16px" }}>
                Enter your Join Code to find your group
              </Typography>
              <ClassMembersAutocomplete classId={rowId} />
            </Box>
            <DialogActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button
                  onClick={() => {
                    setOpenDialog(false);
                  }}
                  variant="contained"
                  sx={{
                    background: "#f0f0f0",
                    color: "#292929",
                    p: "8px 28px",
                    width: "auto",
                    fontSize: "16px",
                    "&:hover": {
                      background: "#bebebe",
                      boxShadow: "none",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    p: "8px 28px",
                    width: "auto",
                    fontSize: "16px",
                    backgroundColor: "#f1c1e2",
                    "&:hover": {
                      background: "#f1c1e2",
                      boxShadow: "none",
                    },
                  }}
                >
                  Let`s go
                </Button>
              </Box>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
