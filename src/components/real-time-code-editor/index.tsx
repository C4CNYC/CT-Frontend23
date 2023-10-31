import React, { useCallback, useEffect, useState } from "react";

import { Socket } from "socket.io-client";

import { CodeEditor } from "./editor";
import { getDocument } from "../../codemirror/extensions/collab";
import { useSocket } from "@hooks";

interface State {
  connected: boolean;
  version?: number;
  doc?: string;
}

interface IRealTimeCodeEditor {
  connectionType?: "connect" | "create";
  onChangeCode: (value: string) => void;
  colabCursonId: string;
  colabCursonText: string;
  roomId: string;
  userId: string;
}

export const RealTimeCodeEditor = ({
  roomId,
  userId,
  colabCursonId,
  colabCursonText,
  connectionType = "connect",
  onChangeCode,
}: IRealTimeCodeEditor): React.ReactElement | null => {
  const socket = useSocket();
  const [state, setState] = useState<State>({
    connected: false,
    version: undefined,
    doc: undefined,
  });

  /**
   * Gets and sets the initial document data.
   */
  async function initializeData() {
    try {
      const { version, doc } = await getDocument(socket, roomId);
      setState((prev) => ({
        ...prev,
        version,
        doc: doc.toString(),
      }));
    } catch (e) {
      // If no data is returned, set up data for offline editing
      setState((prev) => ({
        ...prev,
        version: 0,
        doc: "",
      }));
    }
  }

  const initializeConnection = useCallback(async () => {
    socket.emit(connectionType === "connect" ? "joinRoom" : "create", roomId);
    await initializeData();
  }, [socket, initializeData]);

  useEffect(() => {
    socket.open();

    void initializeConnection();
    if (socket.connected) {
      setState((prev) => ({
        ...prev,
        connected: true,
      }));
    }

    socket.on("connect", () => {
      void initializeConnection();
      setState((prev) => ({
        ...prev,
        connected: true,
      }));
    });

    socket.on("disconnect", () => {
      setState((prev) => ({
        ...prev,
        connected: false,
      }));
    });

    window.addEventListener("beforeunload", () => {
      socket.emit(
        connectionType === "connect" ? "leaveRoom" : "deleteRoom",
        roomId
      );
      socket.off("connect");
      socket.off("disconnect");
      socket.close();
    });

    return () => {
      setState((prev) => ({
        ...prev,
        version: undefined,
        doc: undefined,
      }));
      socket.emit(
        connectionType === "connect" ? "leaveRoom" : "deleteRoom",
        roomId
      );
      socket.off("connect");
      socket.off("disconnect");
      socket.close();
      socket.disconnect();
    };
  }, [roomId]);

  if (
    state?.version === undefined ||
    state?.doc === undefined ||
    !state.connected
  ) {
    return null;
  }

  return (
    <>
      <style>
        {`
          .cm-editor {
            height: 100vh;
          }
        `}
      </style>
      <CodeEditor
        roomId={roomId}
        onChangeCode={onChangeCode}
        state={state}
        cursorId={colabCursonId}
        cursorText={colabCursonText}
        userId={userId}
        socket={socket}
      />
    </>
  );
};

export default React.memo(RealTimeCodeEditor);
