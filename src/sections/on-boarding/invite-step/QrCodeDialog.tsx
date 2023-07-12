import { useState } from "react";
import { ImQrcode } from "react-icons/im";
import { IoMdClose } from "react-icons/io";

import { 
  Box, 
  Dialog, 
  IconButton,
  DialogContent, 
 } from "@mui/material";

interface Props {
  children: React.ReactElement;
}

export default function QrCodeDialog({ children }: Props): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const openDialog = (): void => {
    setOpen(true);
  };
  const closeDialog = (): void => {
    setOpen(false);
  };
  return (
    <>
      <Box
        onClick={() => {
          openDialog();
        }}
        sx={{ display: "flex" }}
      >
        {children}
      </Box>
      <Dialog open={open} onClose={closeDialog} PaperProps={{ sx: { p: 2 } }}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={closeDialog} sx={{ mt: "-10px", mr: "-10px" }}>
            <IoMdClose size="30px" color="#616161" />
          </IconButton>
        </Box>
        <DialogContent sx={{ m: 2 }}>
          <ImQrcode size="180px" color="#616161" />
        </DialogContent>
      </Dialog>
    </>
  );
}
