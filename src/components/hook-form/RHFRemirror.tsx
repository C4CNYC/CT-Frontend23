import {
  EditorComponent,
  Remirror,
  useCommands,
  useRemirror,
} from "@remirror/react";
import { Controller, useController, useFormContext } from "react-hook-form";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { IoIosRedo, IoIosUndo } from "react-icons/io";
import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
} from "remirror/extensions";

import "@mui/material";
import { Button, FormHelperText, Stack } from "@mui/material";
import { styled } from "@mui/system";

export const MenuBtn = styled(Button)({
  color: "#43D4DD",
  whiteSpace: "nowrap",
  p: 0,
  minWidth: "auto",
  width: "50px",
});

interface RHFRemirrorProps {
  name: string;
  helperText?: React.ReactNode;
}

export function RHFRemirror({
  name,
  helperText,
}: RHFRemirrorProps): React.ReactElement {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });

  const { manager, state, setState } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
    ],
    content: field.value.doc ?? "",
    stringHandler: "html",
  });

  return (
    <>
      <style>
        {`
          .remirror-editor-wrapper { padding: 0; }
          .remirror-theme .ProseMirror{
              max-height: 100px;
              background: #fff;
          }
        `}
      </style>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="remirror-theme">
            <Remirror
              manager={manager}
              initialContent={state}
              onChange={(parameter) => {
                field.onChange(parameter.state);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                setState(parameter.state);
              }}
            >
              <Menu />
              <EditorComponent />
            </Remirror>
            {(!!error || helperText) && (
              <FormHelperText error={!!error}>
                {error ? error?.message : helperText}
              </FormHelperText>
            )}
          </div>
        )}
      />
    </>
  );
}

const Menu = () => {
  const { toggleBold, toggleItalic, undo, redo, toggleUnderline } =
    useCommands();

  return (
    <Stack direction="row" pb={1}>
      <MenuBtn
        onClick={() => {
          toggleBold();
        }}
      >
        <FaBold size={20} />
      </MenuBtn>
      <MenuBtn
        onClick={() => {
          toggleItalic();
        }}
      >
        <FaItalic size={20} />
      </MenuBtn>
      <MenuBtn
        onClick={() => {
          toggleUnderline();
        }}
      >
        <FaUnderline size={20} />
      </MenuBtn>
      <MenuBtn
        onClick={() => {
          undo();
        }}
      >
        <IoIosUndo size={20} />
      </MenuBtn>
      <MenuBtn
        onClick={() => {
          redo();
        }}
      >
        <IoIosRedo size={20} />
      </MenuBtn>
    </Stack>
  );
};
