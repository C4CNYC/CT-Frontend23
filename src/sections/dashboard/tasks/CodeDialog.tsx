import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CodeMirror from "@uiw/react-codemirror";
import * as React from "react";
import { useState } from "react";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import { loadLanguage, langs } from "@uiw/codemirror-extensions-langs";
import { CustomSmallSelect } from "@components/custom-input";
import { Box } from "@mui/system";

interface Prop {
  children: React.ReactElement;
  lessonName: string;
  lessonId: string;
}

export default function CreateCodeDialog({
                                           children,
                                           lessonId,
                                           lessonName
                                         }: Prop): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [lang, setLang] = useState<string>("html");
  const [theme, setTheme] = useState<string>("dracula");
  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const onChange = React.useCallback((value: any) => {
    setValue(value);
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
            <Typography sx={{ ml: 0, flex: 1 }} variant="h6" component="div">
              Code
            </Typography>
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
                zIndex: 2
              }}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ mr: 2 }}
              >
                <Box sx={{ color: theme === "dracula" ? "grey.400" : "grey.800", mr: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: "10px", fontWeight: "600" }}>
                    Theme:
                  </Typography>
                </Box>
                <CustomSmallSelect
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: theme === "dracula" ? "grey.400" : "grey.800"
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "11px"
                    }
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
                <Box sx={{ color: theme === "dracula" ? "grey.400" : "grey.800", mr: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: "10px", fontWeight: "600" }}>
                    Language:
                  </Typography>
                </Box>
                <CustomSmallSelect
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: theme === "dracula" ? "grey.400" : "grey.800"
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "11px"
                    }
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
              value={value}
              height="80vh"
              extensions={[loadLanguage(lang)]}
              onChange={onChange}
            />
          </div>

        </DialogContent>
      </Dialog>
    </>
  )
    ;
}
