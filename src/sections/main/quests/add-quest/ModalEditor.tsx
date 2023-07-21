import {
  EditorComponent,
  Remirror,
  useCommands,
  useRemirror,
} from "@remirror/react";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { IoIosRedo, IoIosUndo } from "react-icons/io";
import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
} from "remirror/extensions";

import { Button } from "@mui/material";
import { Stack, styled } from "@mui/system";

interface Props {
  editorValue: string;
  setEditorValue: (value: string) => void;
}

export const MenuBtn = styled(Button)({
  color: "#43D4DD",
  whiteSpace: "nowrap",
  p: 0,
  minWidth: "auto",
  width: "50px",
});

const Menu = () => {
  const { toggleBold, toggleItalic, undo, redo, toggleUnderline } =
    useCommands();
  return (
    <Stack direction="row" pb={1}>
      <MenuBtn onClick={() => toggleBold()}>
        <FaBold size={20} />
      </MenuBtn>
      <MenuBtn onClick={() => toggleItalic()}>
        <FaItalic size={20} />
      </MenuBtn>
      <MenuBtn onClick={() => toggleUnderline()}>
        <FaUnderline size={20} />
      </MenuBtn>
      <MenuBtn onClick={() => undo()}>
        <IoIosUndo size={20} />
      </MenuBtn>
      <MenuBtn onClick={() => redo()}>
        <IoIosRedo size={20} />
      </MenuBtn>
    </Stack>
  );
};

export default function ModalEditor({
  editorValue,
  setEditorValue,
}: Props): React.ReactElement {
  const { manager, state } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
    ],
    content: editorValue,
    stringHandler: "html",
  });

  return (
    <>
      <style>{`.remirror-editor-wrapper { padding: 0; }
        .remirror-theme .ProseMirror{
            max-height: 100px
        }
      `}</style>
      <div className="remirror-theme">
        <Remirror
          manager={manager}
          initialContent={state}
          onChange={(parameter) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setEditorValue(parameter.state.doc);
          }}
        >
          <Menu />
          <EditorComponent />
        </Remirror>
      </div>
    </>
  );
}
