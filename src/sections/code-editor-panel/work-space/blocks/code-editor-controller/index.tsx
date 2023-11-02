import { type FC, memo } from "react";

import CodeEditorCollab from "src/components/code-editor-collab";

import { useSelector } from "src/redux/store";
import { voidFunction } from "@utils";

interface CodeEditorControllerProps {
  onChange?: (value: string) => void
}

const CodeEditorController: FC<CodeEditorControllerProps> = ({
  onChange = voidFunction
}) => {
  const room = useSelector(state => state.codeEditorController.room);

  if (room == null) {
    return null
  }

  return (
    <CodeEditorCollab
      roomId={room.roomId}
      cursorText={room.cursorText}
      preloadedCode={room.preloadedCode}
      onChange={onChange}
      code={room.code}
      mode={room.mode}
    />
  )
}

export default memo(CodeEditorController);
