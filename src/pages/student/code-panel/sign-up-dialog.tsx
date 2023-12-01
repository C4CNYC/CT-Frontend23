import StudentStepper from "@sections/on-boarding-register/student/StudentStepper";
import { Box, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

export default function SignUpDialog({
  isSigned,
}: {
  isSigned: boolean;
}): React.ReactElement | null {
  if (isSigned) return null;

  const [open, setOpen] = useState(false);

  const handleClose = () => { setOpen(false) };
  useEffect(() => {
    setInterval(() => {
      if (!open) setOpen(true);
    }, 5 * 60 * 1000);
  }, []);

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          p: 5,
        }}
      >
        <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
        }}
      >
        <CloseIcon />
      </IconButton>
        <StudentStepper />
      </Box>
    </Dialog>
  )
}
