import {
  type ReactNode,
  type FC,
  useMemo
} from "react";
import NextLink from "next/link";
import { RxExternalLink } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

import {
  Drawer,
  IconButton,
  Link,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ICON_BTN_SX, LINK_SX, STACK_SX, getBaseStackSx } from "./constants";

interface LessonManagerSideBarProps {
  isOpen: boolean
  onClose: () => void
  linkHref: string
  children: ReactNode
}

const LessonManagerSideBar: FC<LessonManagerSideBarProps> = ({
  isOpen,
  onClose,
  linkHref,
  children
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1000));
  const baseStackSx = useMemo(() => getBaseStackSx(isMobile), [isMobile])
  
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
    >
    <Stack sx={baseStackSx} p="0 0 30px">
      <Stack
        direction="row"
        sx={STACK_SX}
      >
        <Link
          href={linkHref}
          component={NextLink}
          underline="none"
          sx={LINK_SX}
        >
          Open Full Catalog <RxExternalLink size={18} />
        </Link>
        {isMobile && (
          <IconButton
            onClick={onClose}
            sx={ICON_BTN_SX}
          >
            <IoMdClose size="20px" />
          </IconButton>
        )}
      </Stack>

      {children}
    </Stack>
  </Drawer>
  )
}

export default LessonManagerSideBar