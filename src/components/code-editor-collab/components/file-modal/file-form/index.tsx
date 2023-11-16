import { type FC, useState, useEffect, useRef, KeyboardEvent } from "react";

import { Button, TextField } from "@mui/material";

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

const ENTER_KEY = "Enter";

const FileForm: FC<FileFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValue,
  fileList
}) => {
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(defaultValue ?? "");
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
    _onClose();
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER_KEY) {
      onAdd();
    }
  }

  useEffect(() => {
    if (isOpen) {
      textFieldRef.current?.querySelector('input')?.focus();
    }
  }, [isOpen]);

  return (
    <ConfirmModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Add file"
    >
      <TextField
        ref={textFieldRef}
        variant="outlined"
        error={error != null}
        label="File name"
        sx={styles.INPUT}
        value={value}
        onKeyDown={onKeyDown}
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
