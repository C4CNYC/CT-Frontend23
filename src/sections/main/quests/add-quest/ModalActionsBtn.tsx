import { LoadingButton } from "@mui/lab";
import { Button, DialogActions } from "@mui/material";

interface Props {
  handleCloseDialog: () => void;
}

export default function ModalActionsBtn({
  handleCloseDialog,
}: Props): React.ReactElement {
  return (
    <DialogActions
      sx={{
        mb: 3,
        gap: 3,
      }}
    >
      <Button
        onClick={handleCloseDialog}
        variant="contained"
        sx={{
          fontSize: "1.1rem",
          background: "#EAEAEB",
          border: "2px solid #EAEAEB",
          textTransform: "uppercase",
          color: "#364954",
          width: "240px",
          py: 0,
          "&:hover": {
            background: "#fff",
            border: "2px solid #EAEAEB",
            color: "#364954",
            boxShadow: 0,
          },
        }}
      >
        cancel
      </Button>
      <LoadingButton
        type="submit"
        variant="contained"
        sx={{
          fontSize: "1.1rem",
          background: "#EE467A",
          border: "2px solid #EE467A",
          textTransform: "uppercase",
          width: "240px",
          py: 0,
          ml: 0,
          "&:hover": {
            background: "#fff",
            border: "2px solid #EE467A",
            color: "#EE467A",
            boxShadow: 0,
          },
        }}
        loading={false}
      >
        launch
      </LoadingButton>
    </DialogActions>
  );
}
