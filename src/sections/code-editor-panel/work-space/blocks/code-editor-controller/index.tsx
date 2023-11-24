import { type FC, memo } from "react";

import { voidFunction } from "@utils";
import CodeEditorCollab from "src/components/code-editor-collab";
import { useSelector } from "src/redux/store";

interface CodeEditorControllerProps {
  onChange?: (value: string) => void;
  userId: string;
}

const CodeEditorController: FC<CodeEditorControllerProps> = ({
  onChange = voidFunction,
  userId,
}) => {
  const room = useSelector((state) => state.codeEditorController.room);

  if (room == null) {
    return null;
  }

  return (
    <CodeEditorCollab
      roomId={room.roomId}
      userId={userId}
      cursorText={room.cursorText}
      preloadedCode={room.preloadedCode}
      onChange={onChange}
      code={room.code}
      mode={room.mode}
    />
  );
};

export default memo(CodeEditorController);
