import { type FC, useEffect } from "react";

import { IconButton, ListItem } from "@mui/material";
import { useDispatch } from "react-redux";

import { Iconify } from "@components";

import CheckersItemText from "../checkers-item-text";

import { useSelector } from "src/redux/store";
import {
  setIsActivateCompeated,
  setIsTextOpened
} from "src/redux/slices/checkers-animation";

import {
  GENERIC_ICON_SX,
  ICON_BTN_SX,
  LIST_ITEM_SX,
  SUCCESS_ICON_SX
} from "./constants";

interface CheckersItemButtonProps {
  active: boolean;
  name: string;
}

const CheckersItemButton: FC<CheckersItemButtonProps> = ({
  active,
  name,
}) => {
  const dispatch = useDispatch();
  const isTextOpened = useSelector((state) => state.checkersAnimation.isTextOpened);

  useEffect(() => {
    if (!active) {
      dispatch(setIsActivateCompeated(true))
    }
  }, [active, dispatch]);

  return (
    <ListItem
      sx={LIST_ITEM_SX}
      secondaryAction={
        <IconButton
          onClick={() => {
            dispatch(setIsTextOpened(!isTextOpened))
          }}
          sx={ICON_BTN_SX}
          edge="end"
        >
          {active ? (
            <Iconify
              sx={GENERIC_ICON_SX}
              icon="file-icons:test-generic"
            />
          ) : (
            <Iconify
              sx={SUCCESS_ICON_SX}
              icon="icon-park-solid:success"
            />
          )}
        </IconButton>
      }
    >
      <CheckersItemText text={name} />
    </ListItem>
  );
}

export default CheckersItemButton;
