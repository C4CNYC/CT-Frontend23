import { useAtom } from "jotai";
import { BiFullscreen, BiMedal } from "react-icons/bi";
import { BsLightningCharge } from "react-icons/bs";
import { MdOutlineNoteAlt } from "react-icons/md";
import { TbMessageCircle } from "react-icons/tb";

import { Badge, SpeedDial, SpeedDialAction, useTheme } from "@mui/material";

import { chatHandlerAtom } from "@sections/code-panel/top-bar/nav-bar/options/chatHendlerAtom";
import { voidFunction } from "@utils";

interface Props {
  stepHasValidation: boolean;
}

export default function NavigationSpeedDial({
  stepHasValidation,
}: Props): React.ReactElement {
  const theme = useTheme();
  const [isChatVisible, setChatVisible] = useAtom(chatHandlerAtom);
  const actions = [
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
      action: () => {
        setChatVisible(!isChatVisible);
      },
    },
    {
      icon: <BiFullscreen color="#FBDD3F" size="20px" />,
      name: "Full screen",
      action: voidFunction,
    },
  ];
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      FabProps={{
        sx: {
          justifyContent: "ceter",
          color: "#D9D9D9",
          backgroundColor: !stepHasValidation ? "#fff" : "#364954",
          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
          width: "50px",
          minHeight: "50px",
          "&:hover": {
            backgroundColor: !stepHasValidation ? "#fff" : "#364954",
          },
        },
      }}
      sx={{
        display: "none",
        [theme.breakpoints.down(1000)]: {
          display: "flex",
          ml: "30%",
        },
        [theme.breakpoints.down(450)]: {
          ml: "23%",
        },
        "&  .MuiSpeedDial-actions": {
          flexDirection: "row",
          gap: 2,
          pl: 20,
        },
        background: "#fff",
        borderRadius: "50%",
        ml: "75px",
        width: "50px",
        height: "50px",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 500,
      }}
      icon={
        <Badge
          sx={{ "& .MuiBadge-badge": { top: "-5px" } }}
          color="secondary"
          variant="dot"
        >
          <BsLightningCharge size="30px" />
        </Badge>
      }
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
          tooltipPlacement={"top-start"}
          FabProps={{
            sx: {
              background: "#364954",
            },
          }}
        />
      ))}
    </SpeedDial>
  );
}
