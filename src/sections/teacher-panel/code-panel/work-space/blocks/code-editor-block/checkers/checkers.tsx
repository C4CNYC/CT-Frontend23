import { useEffect, useState } from "react";

import { useAtom } from "jotai";

import { Box } from "@mui/material";
import { Stack } from "@mui/system";

import { Iconify } from "@components";
import { globalCodePanelAtom } from "@sections/teacher-panel/code-panel/atoms/global-code-panel.atom";
import { IValidationMap } from "src/utils/validationMaping";

import { CheckersMenu } from "./checkers-menu";

interface ICheckers {
  checkers: IValidationMap[];
}

const Checkers = ({ checkers }: ICheckers): React.ReactElement => {
  const [{ nextStepAble }, setGlobalAtom] = useAtom(globalCodePanelAtom);
  const [visible, setVisible] = useState(true);

  const handleCollaps = (): void => {
    setVisible(!visible);
  };

  useEffect(() => {
    const allPased = checkers.reduce((prev, curr) => prev && curr.valid, true);
    if (allPased === nextStepAble) return;
    setGlobalAtom((prev) => ({
      ...prev,
      nextStepAble: allPased,
    }));
  }, [checkers]);

  return (
    <Stack zIndex={999} position="absolute" bottom="17px" right="17px">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <CheckersMenu checkers={checkers} visible={visible} />
        <Box
          sx={{
            position: "absolute",
            bottom: "0",
            left: "0",
            zIndex: 1,
            background: "transparent",
            width: "100%",
            height: "31px",
            display: "flex",
            justifyContent: "flex-end",
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Iconify
            sx={{ "& path": { fill: "#648afc" } }}
            icon={visible ? "ic:baseline-remove-red-eye" : "mdi:eye-off"}
            width="20px"
            px="8"
            marginRight="9px"
            marginTop="4px"
            onClick={handleCollaps}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default Checkers;
