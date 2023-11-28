import { type FC, memo, useState, useEffect, useMemo } from "react";

import CodeEditorCollab from "src/components/code-editor-collab";

import { useSelector } from "src/redux/store";
import { voidFunction } from "@utils";
import { createSocket, waitConnectSocket } from "src/components/code-editor-collab/hook/utils/socket";
import { useAuthContext } from "../../../../../auth/useAuthContext";

interface CodeEditorControllerProps {
  onChange?: (value: Record<string, string>) => void
}

const CodeEditorController: FC<CodeEditorControllerProps> = ({
  onChange = voidFunction
}) => {
  const { user } = useAuthContext();

  const [isConnected, setIsConnected] = useState(false);
  const room = useSelector(state => state.codeEditorController.room);
  const socket = useMemo(() => createSocket(user), [user]);

  useEffect(() => {
    const runEffect = async () => {
      const isConnected = await waitConnectSocket(socket);

      if (isConnected) {
        setIsConnected(isConnected)
      } else {
        runEffect()
      }
    }

    void runEffect()
  }, [socket])

  if (room == null || !isConnected) {
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
      socket={socket}
    />
  )
}

export default memo(CodeEditorController);
