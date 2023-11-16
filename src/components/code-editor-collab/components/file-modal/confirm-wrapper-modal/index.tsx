import { type FC, type ReactNode } from "react";

import {
  Box,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import Close from "@mui/icons-material/Close";

import { styles } from "./styles"

interface ConfirmModalWrapperProps {
  onClose: () => void
  isOpen: boolean
  children: ReactNode
  title?: ReactNode
}

const ConfirmModalWrapper: FC<ConfirmModalWrapperProps> = ({
  onClose,
  isOpen,
  children,
  title
}) => {
  return (
    <Stack
      onClick={onClose}
      sx={{
        ...styles.WRAPPER_STACK_SX,
        ...(isOpen ? styles.WRAPPER_STACK_ACTIVE : {})
      }}
    >
      <Box
        onClick={e => e.stopPropagation()}
        flexDirection="column"
        sx={styles.WRAPPER_BOX}
      >
        <Stack sx={styles.TITLE}>
          <Typography variant="h5">
            {title}
          </Typography>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>

        {children}
      </Box>
    </Stack>
  )
}

export default ConfirmModalWrapper;
