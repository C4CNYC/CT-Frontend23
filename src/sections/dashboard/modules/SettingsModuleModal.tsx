import { ReactElement, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";

import { ModuleLessonsAutocomplete } from "@components";

interface Props {
  children: ReactElement;
  id: string;
}

export default function SettingsModuleModal({
  children,
  id,
}: Props): React.ReactElement {
  const [open, setOpenDialog] = useState<boolean>(false);
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
        PaperProps={{
          sx: {
            minWidth: { xs: "90%", sm: "90%", md: "600px" },
            minHeight: "300px",
          },
        }}
      >
        <Box
          sx={{
            pb: 3,
            pt: 2,
            pl: 3,
            pr: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Module Preferences</Typography>
          <IconButton
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <ModuleLessonsAutocomplete id={id} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
