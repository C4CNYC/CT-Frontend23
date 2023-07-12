import { useEffect, useState } from "react";

import { LazyMotion, domAnimation, m } from "framer-motion";

import { Box } from "@mui/material";

import { IValidationMap } from "src/utils/validationMaping";

import { CheckersItemBtn } from "./checkers-item-btn";

interface Props {
  visible: boolean;
  checkers: IValidationMap[];
}

export function CheckersMenu({ visible, checkers }: Props): React.ReactElement {
  const [visibleText, setVisibleText] = useState(false);
  const [openText, setOpenText] = useState(true);
  const variants = {
    open: {
      height: "100%",
      transition: {
        duration: 0.1,
        delay: 0,
        type: "tween",
      },
    },
    close: {
      height: "0px",
      border: "0",
      transition: {
        duration: 0.4,
        delay: visibleText ? 0.4 : 0,
      },
    },
  };
  const helper = {
    open: {
      marginTop: "0%",
      transition: {
        duration: 0.4,
        type: "tween",
      },
    },
    close: {
      marginTop: "-480%",
      transition: {
        duration: 0.4,
        delay: visibleText ? 0.4 : 0,
      },
    },
  };

  const visibleHandler = (): void => {
    setVisibleText(!visibleText);
  };

  useEffect(() => {
    setOpenText(false);
    setVisibleText(false);
  }, [visible]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        animate={visible ? "open" : "close"}
        initial={visible ? "open" : "close"}
        variants={variants}
        style={{
          overflow: "hidden",
        }}
      >
        <m.div
          animate={visible ? "open" : "close"}
          initial={{ marginTop: "-480%" }}
          variants={helper}
        >
          <Box
            sx={{
              background: "#fff",
              border: "1px solid #648afc",
              display: "flex",
              flexDirection: "row",
              borderRadius: "16px",
              paddingBottom: "38px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                background: "#fff",
                borderRadius: "16px",
              }}
              onClick={visibleHandler}
            >
              {checkers.map((item) => (
                <CheckersItemBtn
                  open={openText}
                  setOpen={setOpenText}
                  key={item.text}
                  active={!item.valid}
                  name={item.text}
                />
              ))}
            </Box>
          </Box>
        </m.div>
      </m.div>
    </LazyMotion>
  );
}
