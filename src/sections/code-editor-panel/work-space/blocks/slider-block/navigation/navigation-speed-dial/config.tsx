import { Badge } from "@mui/material";
import { voidFunction } from "@utils";
import { type ReactNode } from "react";
import { BiFullscreen, BiMedal } from "react-icons/bi";
import { MdOutlineNoteAlt } from "react-icons/md";
import { TbMessageCircle } from "react-icons/tb";

interface Action {
  icon: ReactNode
  name: string
  action: () => void
}

export const getActions = (onToggleChat: () => void): Action[] => [
  {
    icon: <BiMedal color="#FBDD3F" size="20px" />,
    name: "Info",
    action: voidFunction,
  },
  {
    icon: <MdOutlineNoteAlt color="#FBDD3F" size="20px" />,
    name: "Notes",
    action: voidFunction,
  },
  {
    icon: (
      <Badge
        sx={{ "& .MuiBadge-badge": { top: "-5px" } }}
        color="secondary"
        variant="dot"
      >
        <TbMessageCircle color="#FBDD3F" size="20px" />
      </Badge>
    ),
    name: "Messeges",
    action: onToggleChat,
  },
  {
    icon: <BiFullscreen color="#FBDD3F" size="20px" />,
    name: "Full screen",
    action: voidFunction,
  },
]
