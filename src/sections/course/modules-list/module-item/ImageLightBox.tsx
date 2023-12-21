import { useState } from "react";

import { BiShowAlt } from "react-icons/bi";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  SxProps,
} from "@mui/material";

import { Image } from "@components";
import { useTranslate } from "src/utils/translateHelper";

interface IImageLightBoxProps {
  children: React.ReactElement;
  image: string;
  sx?: SxProps;
}

export default function ImageLightBox({
  children,
  image,
  sx,
}: IImageLightBoxProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const translate = useTranslate();

  const handleOpenDialog = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };
  const handleCloseDialog = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Box
        onClick={(e) => {
          handleOpenDialog(e);
        }}
        sx={{
          width: "fit-content",
          position: "relative",
          zIndex: 1,
          "&:hover": {
            "> div": { opacity: 1 },
            cursor: "pointer",
          },
          ...sx,
        }}
      >
        {children}
        <Box
          sx={{
            opacity: 0,
            position: "absolute",
            width: "50px",
            height: "50px",
            top: "calc(50% - 25px)",
            left: "calc(50% - 25px)",
            zIndex: 2,
            background: "rgba(225, 225, 225, 0.6)",
            color: "#fff",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "all .2s linear",
          }}
        >
          <BiShowAlt size={40} />
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogContent sx={{ pt: 3 }}>
          <Image src={image} alt="module image" />
        </DialogContent>
        <DialogActions>
          <Button
            variant="soft"
            color="error"
            sx={{ alignSelf: "flex-end" }}
            onClick={handleCloseDialog}
          >
            {translate("actions_close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
