import { MdOutlineTipsAndUpdates } from "react-icons/md";

import {
  Alert,
  alpha,
  Stack,
  Dialog,
  useTheme,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import { Iconify } from "@components";

interface Props {
  open: boolean;
  onClose: () => void;
}

const list = [
  "The double quotation marks are one character \" and not two single quotation ' marks.",
  "The double quotation marks are one character \" and not two single quotation ' marks.",
  "The double quotation marks are one character \" and not two single quotation ' marks.",
  "The double quotation marks are one character \" and not two single quotation ' marks.",
];

export default function TipsMobileDialog({
  open,
  onClose,
}: Props): React.ReactElement {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      PaperProps={{
        sx: {
          maxWidth: "450px",
          maxHeight: "60vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <MdOutlineTipsAndUpdates size="30px" color="#FBDD3F" />
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, ml: 1, alignSelf: "flex-end" }}
        >
          Tips
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ selfAlign: "flex-end", mr: "-10px" }}
        >
          <Iconify width="20px" icon="ic:round-close" />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          pb: 3,
          "&::-webkit-scrollbar": {
            width: "0.3em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha(theme.palette.grey[600], 0.48),
            borderRadius: "2px",
          },
        }}
      >
        <Stack spacing={2}>
          {list.map((t, i) => (
            <Alert key={i} severity="info">
              {t}
            </Alert>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
