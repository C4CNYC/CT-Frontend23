import { IconButton } from "@mui/material";
import { HiDesktopComputer } from "react-icons/hi";

interface ViewToomblerProps {
  allColumnsVisible: boolean;
  onChangeColumnVisability: (value: boolean) => void;
}
const BrowserTab = ({
  onChangeColumnVisability,
  allColumnsVisible,
}: ViewToomblerProps): React.ReactElement => {
  return (
    <>
      {allColumnsVisible ? (
        ""
      ) : (
        <IconButton
          onClick={() => {
            onChangeColumnVisability(!allColumnsVisible);
          }}
          sx={{
            backgroundColor: "#ffe559",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "10px",
            "&: hover": {
              backgroundColor: "#FBDD3F",
            },
          }}
        >
          <HiDesktopComputer size="24" />
        </IconButton>
      )}
    </>
  );
};
export default BrowserTab;
