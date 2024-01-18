import { type FC, memo, useState, useEffect, useMemo } from "react";

import CodeEditorCollab from "src/components/code-editor-collab";

import { useSelector } from "src/redux/store";
import { voidFunction } from "@utils";
import { createSocket, waitConnectSocket } from "src/components/code-editor-collab/hook/utils/socket";
import { useAuthContext } from "../../../../../auth/useAuthContext";

// dec2hex :: Integer -> String
// i.e. 0-255 -> '00'-'ff'
function dec2hex (dec: number) {
  return dec.toString(16).padStart(2, "0")
}

// generateId :: Integer -> String
function generateId (len: number) {
  const arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join("")
}

interface CodeEditorControllerProps {
  onChange?: (value: Record<string, string>) => void
}

const CodeEditorController: FC<CodeEditorControllerProps> = ({
  onChange = voidFunction
}) => {
  const { user } = useAuthContext();

  const [isConnected, setIsConnected] = useState(false);
  const room = useSelector(state => state.codeEditorController.room);
  console.log("roomId:", room?.roomId);

  const socket = useMemo(() => createSocket(user?.id || generateId(20)), [user]);

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
