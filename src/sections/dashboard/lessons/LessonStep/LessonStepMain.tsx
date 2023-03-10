import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Box, Dialog, IconButton, Stack, Toolbar } from "@mui/material";
import { useState } from "react";
import SplitPane from "react-split-pane";
import LessonStepContent from "./LessonStepContent/LessonStepContent";
import LessonStepList from "./LessonStepList";

interface Props {
  children: React.ReactElement;
  lessonName: string;
  lessonId: string;
  lessonDescr: string;
}

export default function LessonStepMain({
  children,
  lessonId,
  lessonName,
  lessonDescr,
}: Props): React.ReactElement {
  const [open, setOpen] = useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };
  const handleClickOpen = (): void => {
    setOpen(true);
  };
  return (
    <>
      <style>
        {`
          .Resizer {
            background: #000;
            opacity: 0.2;
            z-index: 1;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -moz-background-clip: padding;
            -webkit-background-clip: padding;
            background-clip: padding-box;
          }
          
          .Resizer:hover {
            -webkit-transition: all 2s ease;
            transition: all 2s ease;
          }
          
          .Resizer.horizontal {
            height: 11px;
            margin: -5px 0;
            border-top: 5px solid rgba(255, 255, 255, 0);
            border-bottom: 5px solid rgba(255, 255, 255, 0);
            cursor: row-resize;
            width: 100%;
          }
          
          .Resizer.horizontal:hover {
            border-top: 5px solid rgba(0, 0, 0, 0.5);
            border-bottom: 5px solid rgba(0, 0, 0, 0.5);
          }
          
          .Resizer.vertical {
            width: 11px;
            margin: 0 -5px;
            border-left: 5px solid rgba(255, 255, 255, 0);
            border-right: 5px solid rgba(255, 255, 255, 0);
            cursor: col-resize;
            position: initial;
          }
          
          .Resizer.vertical:hover {
            border-left: 5px solid rgba(0, 0, 0, 0.5);
            border-right: 5px solid rgba(0, 0, 0, 0.5);
          }
          .Resizer.disabled {
            cursor: not-allowed;
          }
          .Resizer.disabled:hover {
            border-color: transparent;
          }
          .Pane{
            overflow-y: auto;
          } 
          .Pane2 .Pane1{
            overflow-y: hidden;
          } 
          .Pane2 .Pane2{
            overflow-y: hidden;
          }
        `}
      </style>
      <Stack
        onClick={() => {
          handleClickOpen();
        }}
      >
        {children}
      </Stack>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: "absolute",
            zIndex: "10000",
            right: 0,
            top: 0,
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            position: "relative",
            height: "100%",
          }}
        >
          <SplitPane
            split="vertical"
            minSize={300}
            maxSize={750}
            defaultSize={"20%"}
          >
            <LessonStepList />
            <LessonStepContent />
          </SplitPane>
        </Box>
      </Dialog>
    </>
  );
}
