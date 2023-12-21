import { type FC, useEffect } from "react";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SlClose } from "react-icons/sl";
import { useDispatch } from "react-redux";

import { ListItem, Typography } from "@mui/material";

import { setIsActivateCompeated } from "src/redux/slices/checkers-animation";

import { LIST_ITEM_SX } from "./constants";

interface CheckersItemButtonProps {
  active: boolean;
  name: string;
}

const CheckersItemButton: FC<CheckersItemButtonProps> = ({ active, name }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!active) {
      dispatch(setIsActivateCompeated(true));
    }
  }, [active, dispatch]);

  return (
    <ListItem sx={LIST_ITEM_SX}>
      {active ? (
        <SlClose color="#F44336" style={{ minWidth: 16 }} />
      ) : (
        <IoMdCheckmarkCircleOutline color="#75CF6D" style={{ minWidth: 20 }} />
      )}
      <Typography fontSize={12}>{name}</Typography>
    </ListItem>
  );
};

export default CheckersItemButton;
