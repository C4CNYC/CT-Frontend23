import { type FC, type ReactNode } from "react";

import {
  ListItemButton,
  ListItem,
  ListItemText, 
  ListItemIcon
} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

interface NavItemProps {
  onClick?: () => void
  onToggle: () => void
  name: string
  icon: ReactNode
}

const CustomNavItem: FC<NavItemProps> = ({
  onToggle,
  name,
  icon
}) => {
  return (
    <ListItem>
      <ListItemIcon onClick={onToggle}>
        {icon}
      </ListItemIcon>
      
      <ListItemButton sx={LIST_ITEM_BUTTON_SX}>
        <ListItemText sx={NAME_SX} primary={name} />

        <AddRoundedIcon />
      </ListItemButton>
    </ListItem>
  )
}

const NAME_SX = {
  fontSize: "18px",
  color: "#364954"
}

const LIST_ITEM_BUTTON_SX = {
  paddingLeft: "10px"
}

export default CustomNavItem;
