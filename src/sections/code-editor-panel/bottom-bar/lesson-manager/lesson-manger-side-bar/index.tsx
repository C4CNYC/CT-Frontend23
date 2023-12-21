import NextLink from "next/link";
import { type FC, type ReactNode, useMemo } from "react";

import { IoMdClose } from "react-icons/io";
import { RxExternalLink } from "react-icons/rx";

import {
  Drawer,
  IconButton,
  Link,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

import { ICON_BTN_SX, LINK_SX, STACK_SX, getBaseStackSx } from "./constants";

interface LessonManagerSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  linkHref: string;
  children: ReactNode;
}

const LessonManagerSideBar: FC<LessonManagerSideBarProps> = ({
  isOpen,
  onClose,
  linkHref,
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1000));
  const baseStackSx = useMemo(() => getBaseStackSx(isMobile), [isMobile]);
  const translate = useTranslate();

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <Stack sx={baseStackSx} p="0 0 30px">
        <Stack direction="row" sx={STACK_SX}>
          <Link
            href={linkHref}
            component={NextLink}
            underline="none"
            sx={LINK_SX}
          >
            {translate("open_full_catalog")} <RxExternalLink size={18} />
          </Link>
          {isMobile && (
            <IconButton onClick={onClose} sx={ICON_BTN_SX}>
              <IoMdClose size="20px" />
            </IconButton>
          )}
        </Stack>

        {children}
      </Stack>
    </Drawer>
  );
};

export default LessonManagerSideBar;
