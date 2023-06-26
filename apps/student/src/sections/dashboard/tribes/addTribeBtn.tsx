import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Divider } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import CreateTribeDialog from "./createTribeDialog";

export default function AddTribeBtn(): React.ReactElement | null {
  const isStudentManager = useSelector(
    (state: RootState) => state.global.isStudentManager
  );

  if (!isStudentManager) return null;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "36px",
          p: "6px 3px",
          backgroundColor: "#EA3569",
          borderRadius: "50px",
          alignItems: "center",
        }}
      >
        <CreateTribeDialog>
          <Button
            sx={{
              p: "0px 16px",
              background: "#EA3569",
              color: "white",
              "&:hover": {
                backgroundColor: "#EA3569",
                boxShadow: "0px 8px 16px 0px #EA35693D",
              },
            }}
          >
            <AddIcon sx={{ width: "18x", height: "18px" }} />
            New Tribe
          </Button>
        </CreateTribeDialog>
        <Divider orientation="vertical" sx={{ ml: "12px" }} flexItem />
      </Box>
    </>
  );
}
