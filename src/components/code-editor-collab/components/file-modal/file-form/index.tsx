import { type FC, useState, useEffect } from "react";

import {
  Typography,
  Stack,
  Box,
  IconButton,
  Button,
  TextField
} from "@mui/material";
import Close from "@mui/icons-material/Close";

import ConfirmModalWrapper from "../confirm-wrapper-modal";

import { validate } from "./validator"
import { styles } from "./styles"

interface FileFormProps {
  isOpen: boolean
  onClose: () => void
  defaultValue?: string
  onSubmit: (fileName: string) => void
  fileList: string[]
}

const FileForm: FC<FileFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValue,
  fileList
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
    const error = validate(value, fileList);
    setError(error);

    if (error != null) {
      return;
    }

    onSubmit(value);
    _onClose()
  }

  return (
    <ConfirmModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Add file"
    >
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
    </ConfirmModalWrapper>
  )
}

export default FileForm;
