import Iconify from "@components/iconify";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ReactCodeMirror from "./codemirror/react-codemirror";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  borderRadius: "16px",
  p: 4,
  height: "600px",
  width: "50%",
};

export default function ModalIntegration() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Add Integration
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField variant="outlined" label="Name" sx={{ width: "100%" }} />
          <Typography variant="h4" sx={{ margin: "10px 0" }}>
            Links
          </Typography>
          <ReactCodeMirror value={"//Links"} />
          <Typography variant="h4" sx={{ margin: "10px 0" }}>
            Scripts
          </Typography>
          <ReactCodeMirror value={"//Scripts"} />
        </Box>
      </Modal>
    </>
  );
}
