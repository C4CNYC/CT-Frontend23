import { type FC, useState, useEffect } from "react";

import {
  OutlinedInput,
  Typography,
  Stack,
  Box,
  IconButton,
  Button,
  TextField
} from "@mui/material";
import Close from "@mui/icons-material/Close";

import { validate } from "./validator"
import { styles } from "./styles"

interface FileFormProps {
  isOpen: boolean
  onClose: () => void
  defaultValue?: string
  onSubmit: (fileName: string) => void
}

const FileForm: FC<FileFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValue
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setValue(defaultValue ?? "")
  }, [defaultValue]);

  const _onClose = () => {
    onClose();
    setValue("");
    setError(null);
  }

  const onAdd = () => {
    const error = validate(value);
    console.log(error);
    setError(error);

    if (error != null) {
      return;
    }

    onSubmit(value);
    _onClose()
  }

  return (
    <Stack
      onClick={(e) => {
        _onClose()
      }}
      sx={{
        ...styles.WRAPPER_STACK_SX,
        ...(isOpen ? styles.WRAPPER_STACK_ACTIVE : {})
      }}
    >
      <Box onClick={e => e.stopPropagation()} flexDirection="column" sx={styles.WRAPPER_BOX}>
        <Stack sx={styles.TITLE}>
          <Typography variant="h5">
            Add File
          </Typography>

          <IconButton onClick={_onClose}>
            <Close />
          </IconButton>
        </Stack>

        <TextField
          variant="outlined"
          error={error != null}
          label="File name"
          sx={styles.INPUT}
          value={value}
          onChange={({ target: { value } }) => setValue(value)}
          helperText={error != null ? error : ""}
        />

        <Button
          onClick={onAdd}
          sx={styles.ADD_BUTTON}
          variant="contained"
        >
          Add file
        </Button>
      </Box>
    </Stack>
  )
}

export default FileForm;
