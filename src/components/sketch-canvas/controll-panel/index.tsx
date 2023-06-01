import Iconify from "@components/iconify";
import {
  Divider,
  IconButton,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import {
  ReactSketchCanvas,
  ReactSketchCanvasProps,
  ReactSketchCanvasRef,
} from "react-sketch-canvas";
import InputField from "./InputField";

export const ControllPanel = (): React.ReactElement => {
  const [canvasProps, setCanvasProps] = useState<
    Partial<ReactSketchCanvasProps>
  >({
    width: "100%",
    height: "100vh",
    strokeWidth: 4,
    eraserWidth: 5,
    strokeColor: "#000000",
    canvasColor: "#FFFFFF",
  });
  const canvasRef = React.createRef<ReactSketchCanvasRef>();

  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const eraserHandler = () => {
    const eraseMode = canvasRef.current?.eraseMode;

    if (eraseMode) {
      eraseMode(true);
    }
  };

  const penHandler = () => {
    const eraseMode = canvasRef.current?.eraseMode;

    if (eraseMode) {
      eraseMode(false);
    }
  };

  const undoHandler = () => {
    const undo = canvasRef.current?.undo;

    if (undo) {
      undo();
    }
  };
  const redoHandler = () => {
    const redo = canvasRef.current?.redo;

    if (redo) {
      redo();
    }
  };

  const clearHandler = () => {
    const clearCanvas = canvasRef.current?.clearCanvas;

    if (clearCanvas) {
      clearCanvas();
    }
  };

  const inputProps: Array<[keyof ReactSketchCanvasProps, "text"]> = [
    ["strokeWidth", "text"],
    ["eraserWidth", "text"],
  ];

  const [, setPaths] = useState<CanvasPath[]>([]);
  const onChange = (updatedPaths: CanvasPath[]): void => {
    setPaths(updatedPaths);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <ToggleButtonGroup
        sx={{
          height: "40px",
          mt: "10px",
          mb: "10px",
          alignItems: "center",
          ml: 1,
        }}
      >
        <IconButton aria-describedby={id} onClick={handleClick}>
          <Iconify
            icon="zondicons:stroke-width"
            sx={{ width: 15, height: 15 }}
          />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {inputProps.map(([fieldName, type]) => (
            <InputField
              key={fieldName as string}
              fieldName={fieldName}
              type={type}
              canvasProps={canvasProps}
              setCanvasProps={setCanvasProps}
            />
          ))}
        </Popover>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        sx={{
          height: "40px",
          mt: "10px",
          mb: "10px",
          alignItems: "center",
          ml: 1,
        }}
      >
        <ToggleButton
          value="undo"
          onClick={undoHandler}
          sx={{
            "&:hover": {
              bgcolor: "white",
            },
          }}
        >
          <Iconify icon="ci:undo" sx={{ width: 15, height: 15 }} />
        </ToggleButton>
        <Divider orientation="vertical" sx={{ bgcolor: "#edeff1" }} />
        <ToggleButton
          value="redo"
          onClick={redoHandler}
          sx={{
            "&:hover": {
              bgcolor: "white",
            },
          }}
        >
          <Iconify icon="ci:redo" sx={{ width: 15, height: 15 }} />
        </ToggleButton>
        <Divider orientation="vertical" sx={{ bgcolor: "#edeff1", ml: "-2px" }} />
        <ToggleButton
          value="clear"
          onClick={clearHandler}
          sx={{
            "&:hover": {
              bgcolor: "white",
            },
          }}
        >
          <Iconify icon="mdi:clear-outline" sx={{ width: 15, height: 15 }} />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        sx={{
          height: "40px",
          mt: "10px",
          mb: "10px",
          alignItems: "center",
          ml: 1,
        }}
        value={alignment}
        exclusive
        onChange={handleAlignment}
      >
        <ToggleButton
          value="eraser"
          onClick={eraserHandler}
          sx={{
            "&:hover": {
              bgcolor: "white",
            },
            margin: "0px 0px 0px 0px",
            padding: 1,
          }}
        >
          <Iconify icon="ph:eraser-fill" sx={{ width: 15, height: 15 }} />
        </ToggleButton>
        <Divider orientation="vertical" sx={{ bgcolor: "#edeff1" }} />
        <ToggleButton
          value="pen"
          onClick={penHandler}
          sx={{
            "&:hover": {
              bgcolor: "white",
            },
            margin: "0px 0px 0px 0px",
            padding: 1,
          }}
        >
          <Iconify
            icon="ph:pen-light"
            sx={{ width: 15, height: 15, margin: "0px 0px 0px 0px" }}
          />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        sx={{
          height: "40px",
          mt: "10px",
          mb: "10px",
          alignItems: "center",
          ml: 1,
        }}
      >
        <Stack display="flex" direction="row" spacing={1}>
          <input
            type="color"
            value={canvasProps.strokeColor}
            onChange={(e) => {
              setCanvasProps(
                (prevCanvasProps: Partial<ReactSketchCanvasProps>) => ({
                  ...prevCanvasProps,
                  strokeColor: e.target.value,
                })
              );
            }}
            style={{
              width: "25px",
              height: "25px",
              background: "none",
              borderRadius: 0,
              borderColor: "white",
              margin: 0,
              padding: 0,
            }}
          />
          <Divider orientation="vertical" sx={{ bgcolor: "#edeff1" }} />
          <input
            type="color"
            value={canvasProps.canvasColor}
            onChange={(e) => {
              setCanvasProps(
                (prevCanvasProps: Partial<ReactSketchCanvasProps>) => ({
                  ...prevCanvasProps,
                  canvasColor: e.target.value,
                })
              );
            }}
            style={{
              width: "25px",
              height: "25px",
              background: "none",
              borderRadius: 0,
              borderColor: "white",
              margin: 0,
              padding: 0,
            }}
          />
        </Stack>
      </ToggleButtonGroup>
      <ReactSketchCanvas
        ref={canvasRef}
        onChange={() => onChange}
        {...canvasProps}
      />
    </Box>
  );
};
