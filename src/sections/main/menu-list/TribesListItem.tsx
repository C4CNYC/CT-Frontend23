import NextLink from "next/link";

import {
  Avatar,
  Box,
  Link,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useSettingsContext } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { BaseResponseInterface } from "@utils";
import { IClass } from "src/redux/interfaces/class.interface";

import {
  TRIBE_LINK_SX,
  getSignOfActiveLink,
  getTribeTitleSx,
} from "./constants";

interface Props {
  active: boolean;
  classItem: IClass & BaseResponseInterface;
}

export default function TribeListItem({
  active,
  classItem,
}: Props): React.ReactElement {
  const theme = useTheme();
  const { themeLayout } = useSettingsContext();
  const isMobile = useMediaQuery(theme.breakpoints.down(1200));
  const isNavMini = themeLayout === "mini" && !isMobile;

  return (
    <Tooltip title={isNavMini ? classItem.name : ""}>
      <Link
        component={NextLink}
        underline="none"
        href={STUDENT_PATH_DASHBOARD.class.id(classItem.id)}
        sx={TRIBE_LINK_SX}
      >
        <Box sx={(theme) => ({ ...getSignOfActiveLink(theme, active) })} />
        <Avatar
          variant="rounded"
          src={classItem.avatar ?? ""}
          sx={{
            width: "40px",
            height: "40px",
          }}
        />
        {!isNavMini && (
          <Typography
            sx={(theme) => ({ ...getTribeTitleSx(theme) })}
            variant="body1"
          >
            {classItem.name}
          </Typography>
        )}
      </Link>
    </Tooltip>
  );
}
