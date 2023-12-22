import { AiOutlineCode } from "react-icons/ai";
import { BsChatText } from "react-icons/bs";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

export enum IActionDialogType {
  tips = "Tips",
  solution = "Solution",
  stuck = "Stuck",
}

export const actions = [
  {
    icon: <MdOutlineTipsAndUpdates size="25px" color="#FBDD3F" />,
    name: "tips",
    color: "#FBDD3F",
    type: IActionDialogType.tips,
  },
  {
    icon: <AiOutlineCode size="25px" color="#EE467A" />,
    name: "solution",
    color: "#EE467A",
    type: IActionDialogType.solution,
  },
  {
    icon: <BsChatText size="20px" color="#43D4DD" />,
    name: "i_um_stuck",
    color: "#43D4DD",
    type: IActionDialogType.stuck,
  },
];

export const actionsTips = [
  {
    icon: <MdOutlineTipsAndUpdates size="25px" color="#FBDD3F" />,
    name: "tips",
    color: "#FBDD3F",
    type: IActionDialogType.tips,
  },
];
