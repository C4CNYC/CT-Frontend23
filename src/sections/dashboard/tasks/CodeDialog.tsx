import * as React from "react";
import { useEffect, useState } from "react";

import { langs, loadLanguage } from "@uiw/codemirror-extensions-langs";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import CodeMirror from "@uiw/react-codemirror";

import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/system";

import { CustomSmallSelect, useSnackbar } from "@components";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "src/redux/services/manager/tasks-manager";

import TasksInput from "./TasksInput";

interface Prop {
  children: React.ReactElement;
  taskId?: string;
  taskName?: string;
  isEdit?: boolean;
  code?: string;
  language?: string;
}

export default function CreateCodeDialog({
  children,
  taskId,
  taskName,
  isEdit,
  code,
  language,
}: Prop): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [codeValue, setCodeValue] = useState<string>("");
  const [lang, setLang] = useState<string>("html");
  const [updatedName, setUpdatedName] = useState<string>("");
  const [theme, setTheme] = useState<string>("dracula");
  const [loading, setLoading] = useState<boolean>(false);
  const [updateTask] = useUpdateTaskMutation();
  const [createTask] = useCreateTaskMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  useEffect(() => {
    if (code) {
      setCodeValue(code);
    }
    if (language) {
      setLang(language);
    }
  }, []);
  const onChange = React.useCallback((value: any) => {
    setCodeValue(value);
  }, []);

  const handleLangChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setLang(event.target.value);
  };

  const handleThemeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value === "xcodeLight") {
      setTheme("xcodeLight");
    } else {
      setTheme("dracula");
    }
  };
  const onSubmit = async (): Promise<void> => {
    setLoading(true);
    const data = JSON.stringify({
      body: {
        code: codeValue,
      },
    });
    try {
      if (isEdit && taskId) {
        await updateTask({
          id: taskId,
          name: (updatedName || taskName) ?? "No name",
          language: lang,
          body: data,
        }).unwrap();
      } else {
        await createTask({
          name: updatedName,
          language: lang,
          body: data,
        }).unwrap();
      }
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      setCodeValue("");
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: "error",
      });
    }
    setLoading(false);
    // eslint-disable-next-line no-eval
    handleClose();
  };
  return (
    <>
      <Stack
        onClick={() => {
          handleClickOpen();
        }}
      >
        {children}
      </Stack>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
        <AppBar color="inherit" sx={{ position: "relative", padding: 0 }}>
          <Toolbar sx={{ paddingLeft: 0, ml: 0 }} variant="dense">
            <TasksInput
              placeholder="Task name"
              defaultValue={taskName}
              onChange={(e: any) => {
                setUpdatedName(e.target.value);
              }}
              onBlur={() => {
                if (!updatedName) {
                  setUpdatedName("Task Name");
                }
              }}
            />
            <LoadingButton loading={loading} onClick={onSubmit}>
              <SaveIcon />
            </LoadingButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: 0, scrollbarWidth: "none" }}>
          <div style={{ position: "relative" }}>
            <Stack
              flexDirection="row"
              justifyContent="flex-end"
              sx={{
                width: "100%",
                padding: "5px 10px",
                backgroundColor: theme === "dracula" ? "grey.800" : "grey.200",
                position: "absolute",
                right: "0",
                bottom: 0,
                zIndex: 2,
              }}
            >
              <Stack direction="row" alignItems="center" sx={{ mr: 2 }}>
                <Box
                  sx={{
                    color: theme === "dracula" ? "grey.400" : "grey.800",
                    mr: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "10px", fontWeight: "600" }}
                  >
                    Theme:
                  </Typography>
                </Box>
                <CustomSmallSelect
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: theme === "dracula" ? "grey.400" : "grey.800",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "11px",
                    },
                  }}
                  value={theme}
                  size="small"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleThemeChange(event);
                  }}
                >
                  <option key="dark" value="dark">
                    Darcula
                  </option>
                  <option key="xcodeLight" value="xcodeLight">
                    Xcode light
                  </option>
                </CustomSmallSelect>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Box
                  sx={{
                    color: theme === "dracula" ? "grey.400" : "grey.800",
                    mr: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "10px", fontWeight: "600" }}
                  >
                    Language:
                  </Typography>
                </Box>
                <CustomSmallSelect
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: theme === "dracula" ? "grey.400" : "grey.800",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "11px",
                    },
                  }}
                  value={lang}
                  size="small"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleLangChange(event);
                  }}
                >
                  {Object.values(langs).map((lang, index) => (
                    <option key={index} value={lang.name}>
                      {lang.name}
                    </option>
                  ))}
                </CustomSmallSelect>
              </Stack>
            </Stack>

            <CodeMirror
              theme={theme === "dracula" ? dracula : xcodeLight}
              value={codeValue}
              height="80vh"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              extensions={[loadLanguage(lang)]}
              onChange={(value) => {
                onChange(value);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
