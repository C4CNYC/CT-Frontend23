import { type FC, type ReactNode } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

interface NavItemProps {
  onClick?: () => void;
  onToggle: () => void;
  name: string;
  icon: ReactNode;
  isDisabled?: boolean;
  children?: React.ReactElement;
}

const CustomNavItem: FC<NavItemProps> = ({
  onToggle,
  name,
  icon,
  isDisabled,
}) => {
  const theme = useTheme();
  const translate = useTranslate();
  return (
    <ListItem sx={{ position: "relative" }}>
      <ListItemIcon onClick={onToggle}>{icon}</ListItemIcon>

      <ListItemButton sx={getListItemBtnSx(isDisabled)}>
        <ListItemText sx={NAME_SX} primary={name} />
        <Box sx={getComingSoonSx(theme)}>
          <Typography variant="subtitle2" whiteSpace="nowrap">
            {translate("coming_soon")}
          </Typography>
        </Box>
        <AddRoundedIcon />
      </ListItemButton>
    </ListItem>
  );
};

const NAME_SX = {
  fontSize: "18px",
  color: "#364954",
};

const getListItemBtnSx = (isDisabled?: boolean) => ({
  paddingLeft: "10px",
  pointerEvents: isDisabled ? "none" : "auto",
});

const getComingSoonSx = (theme: Theme) => ({
  position: "absolute",
  top: "-25%",
  right: "10%",
  background: theme.palette.success.main,
  borderRadius: 2,
  px: 1,
  color: theme.palette.primary.contrastText,
});

export default CustomNavItem;
