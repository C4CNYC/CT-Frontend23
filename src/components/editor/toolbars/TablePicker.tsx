import React, { MouseEventHandler, useCallback, useState } from "react";

import { useCommands } from "@remirror/react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AiOutlineTable } from "react-icons/ai";

import { Button, Stack } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";

export default function TablePicker(): JSX.Element {
  const [edit, setEdit] = useState<boolean>(false);
  const [cells, setCells] = useState<number>(1);
  const [rows, setRows] = useState<number>(1);

  const { createTable } = useCommands();

  const handleChangeCells = useCallback(
    (e: any) => {
      e.preventDefault();
      setCells(e.target.value);
    },
    [createTable, cells]
  );

  const handleChangeRows = useCallback(
    (e: any) => {
      e.preventDefault();
      setRows(e.target.value);
    },
    [createTable, rows]
  );

  const closeMenu = (): void => {
    setEdit(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeMenu });

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e: any) => {
      e.preventDefault();
    },
    []
  );

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    createTable({ rowsCount: rows, columnsCount: cells, withHeaderRow: false });
  };

  return (
    <Stack
      direction="row"
      style={{ marginLeft: "10px", marginRight: "10px" }}
      ref={ref}
    >
      {edit && (
        <div
          style={{
            position: "absolute",
            top: "44px",
            width: "200px",
            display: "flex",
            alignItems: "flex-end",
            backgroundColor: "white",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: "4px",
            padding: "10px",
            zIndex: 2,
          }}
        >
          <Stack style={{ width: "120px" }}>
            <label htmlFor="cells" style={{ fontSize: "12px" }}>
              Columns:
            </label>
            <input
              type="number"
              name="cells"
              id="cells"
              value={cells}
              onChange={handleChangeCells}
              style={{ width: "40px", padding: "5px" }}
            />
          </Stack>
          <Stack style={{ width: "80px" }}>
            <label htmlFor="rows" style={{ fontSize: "12px" }}>
              Rows:
            </label>
            <input
              type="number"
              name="rows"
              id="rows"
              value={rows}
              onChange={handleChangeRows}
              style={{ width: "40px", padding: "5px" }}
            />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 1, mb: "-2px" }}
            onMouseDown={(event) => {
              event.preventDefault();
            }}
            onClick={handleSubmit}
          >
            Insert
          </Button>
        </div>
      )}
      <ToggleButton
        value="left"
        key="left"
        onMouseDown={handleMouseDown}
        onClick={() => {
          setEdit(!edit);
        }}
      >
        <AiOutlineTable size={22} />
      </ToggleButton>
    </Stack>
  );
}
