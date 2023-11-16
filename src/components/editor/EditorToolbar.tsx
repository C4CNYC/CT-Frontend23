import { useContext } from "react";

import {
  BasicFormattingButtonGroup,
  CommandButtonGroup,
  DecreaseFontSizeButton,
  FloatingToolbar,
  IncreaseFontSizeButton,
  TextAlignmentButtonGroup,
  ToggleBoldButton,
  ToggleOrderedListButton,
  ToggleStrikeButton,
  ToggleSubscriptButton,
  ToggleSuperscriptButton,
  ToggleTaskListButton,
  Toolbar,
} from "@remirror/react";

import { Divider, Stack } from "@mui/material";

import { LessonContentContext } from "@sections/dashboard/lessons/LessonStep/LessonStepContent/LessonContent.context";

import { LockButton } from "./LockButton";
import { SaveButton } from "./SaveButton";
import { ChallengeBtn, MediaBtn, SettingsBtn, TemplateBtn } from "./controls-btn";
import {
  FontFamilyButtons,
  FontSizeButtons,
  TextBgColorPicker,
  TextCaseSelect,
  TextColorPicker,
} from "./toolbars";
import EmojiPickerBtn from "./toolbars/EmojiPicker";

interface Props {
  saveContent: () => void;
}

export default function EditorToolbar({
  saveContent,
}: Props): React.ReactElement {
  const { locked } = useContext(LessonContentContext);

  return (
    <>
      <Toolbar
        style={{
          position: "sticky",
          zIndex: 500,
          top: 0,
          padding: "15px",
          overflowX: "scroll",
          overflowY: "scroll",
          scrollbarWidth: "none",
          borderBottom: "1px solid #cbcbcb",
        }}
      >
        {!locked ? (
          <>
            {" "}
            <Stack direction="column" sx={{ width: "100%", gap: 1 }}>
              <Stack direction="row" justifyContent="space-between" gap={1}>
                <Stack
                  flexDirection="row"
                  sx={{ flexWrap: "wrap", gap: 1, alignItems: "center" }}
                >
                  <ToggleBoldButton />
                  <CommandButtonGroup>
                    <ToggleOrderedListButton />
                  </CommandButtonGroup>
                  <TextColorPicker />
                  <TextBgColorPicker />
                  <CommandButtonGroup>
                    <ToggleTaskListButton />
                  </CommandButtonGroup>
                  <EmojiPickerBtn />
                </Stack>

                <LockButton />
              </Stack>

              <Stack
                direction="row"
                sx={{
                  maxWidth: "450px",
                  gap: 1,
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <TemplateBtn />
                <ChallengeBtn />
                <SettingsBtn />
                <MediaBtn />
              </Stack>
            </Stack>
          </>
        ) : (
          <Stack direction="row" gap={2} ml="auto">
            <LockButton />
            <SaveButton onClick={saveContent} />
          </Stack>
        )}
      </Toolbar>
      {!locked ? (
        <FloatingToolbar
          sx={{
            "&>div": {
              borderRadius: "5px",
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
            },
          }}
          style={{
            zIndex: 9999999,
            padding: 10,
          }}
        >
          <Stack
            borderRadius="5px"
            display="flex"
            flexDirection="row"
            p="5px 10px"
            alignItems="center"
            alignContent="center"
          >
            <BasicFormattingButtonGroup />
            <Divider
              sx={{ ml: 1, mr: 1, mt: 0.5, height: "70%" }}
              orientation="vertical"
              flexItem
            />
            <CommandButtonGroup>
              <DecreaseFontSizeButton />
              <FontSizeButtons />
              <IncreaseFontSizeButton />
            </CommandButtonGroup>
            <Divider
              sx={{ ml: 1, mr: 1, mt: 0.5, height: "70%" }}
              orientation="vertical"
              flexItem
            />
            <Toolbar>
              <ToggleSuperscriptButton />
              <ToggleSubscriptButton />
              <TextCaseSelect />
            </Toolbar>
            <Divider
              sx={{ ml: 1, mr: 1, mt: 0.5, height: "70%" }}
              orientation="vertical"
              flexItem
            />
            <ToggleStrikeButton />
            <Divider
              sx={{ ml: 1, mr: 1, mt: 0.5, height: "70%" }}
              orientation="vertical"
              flexItem
            />
            <TextAlignmentButtonGroup />
            <Divider
              sx={{ ml: 1, mr: 1, mt: 0.5, height: "70%" }}
              orientation="vertical"
              flexItem
            />
            <FontFamilyButtons />
          </Stack>
        </FloatingToolbar>
      ) : null}
    </>
  );
}
