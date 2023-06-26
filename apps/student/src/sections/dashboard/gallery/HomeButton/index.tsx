import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";

export default function HomeButton(): React.ReactElement {
  return (
    <IconButton
      sx={{
        position: "absolute",
        zIndex: 10,
        top: "-23px",
        left: "11px",
        width: "46px",
        height: "46px",
        background: "white",
        border: "3px solid #FBDD3F",
        transition: "box-shadow 0.2s ease-in-out",
        "&:hover": {
          background: "#FFF",
          boxShadow:
            "0px 3px 5px -1px rgba(145, 158, 171, 0.2), 0px 5px 8px 0px rgba(145, 158, 171, 0.14), 0px 1px 14px 0px rgba(145, 158, 171, 0.12)",
        },
      }}
    >
      <HomeIcon />
    </IconButton>
  );
}
