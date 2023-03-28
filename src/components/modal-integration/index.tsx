import { javascript } from "@codemirror/lang-javascript";
import Iconify from "@components/iconify";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import React, { useState } from "react";

interface Prop {
  value: string;
}

export default function ModalIntegration({ value }: Prop) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    console.log("value:", value);
  }, []);
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
        <Box
          sx={{
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
          }}
        >
          <TextField variant="outlined" label="Name" sx={{ width: "100%" }} />
          <Typography variant="h4" sx={{ margin: "10px 0" }}>
            Links
          </Typography>
          <CodeMirror
            value={value}
            height="180px"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
          />
          <Typography variant="h4" sx={{ margin: "10px 0" }}>
            Scripts
          </Typography>
          <CodeMirror
            value={value}
            height="180px"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
          />{" "}
        </Box>
      </Modal>
    </>
  );
}
