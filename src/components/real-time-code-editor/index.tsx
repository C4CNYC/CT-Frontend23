import React, { useEffect, useState } from "react";

import { Socket } from "socket.io-client";

import { CodeEditor } from "./editor";
import { getDocument } from "./extentions/collab";

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
  socket: Socket;
}

export const RealTimeCodeEditor = ({
  socket,
  roomId,
  colabCursonId,
  colabCursonText,
  connectionType = "connect",
  onChangeCode,
}: IRealTimeCodeEditor): React.ReactElement | null => {
  const [state, setState] = useState<State>({
    connected: false,
    version: undefined,
    doc: undefined,
  });

  const getStartData = (): void => {
    getDocument(socket).then(({ version, doc }) => {
      if (version === undefined || !doc) {
        setTimeout(() => {
          getStartData();
        }, 3000);
        return;
      }

      setState((prev) => ({
        ...prev,
        version,
        connected: true,
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        doc: doc?.toString(),
      }));
    });
  };

  useEffect(() => {
    socket.open();
    socket.emit(connectionType === "connect" ? "joinRoom" : "create", roomId);

    getStartData();

    socket.on("connection", () => {
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
      socket.off("pullUpdateResponse");
      socket.off("pushUpdateResponse");
      socket.off("getDocumentResponse");
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
      socket.off("pullUpdateResponse");
      socket.off("pushUpdateResponse");
      socket.off("getDocumentResponse");
      socket.close();
      socket.disconnect();
    };
  }, []);

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
        onChangeCode={onChangeCode}
        state={state}
        cursorId={colabCursonId}
        cursorText={colabCursonText}
        socket={socket}
      />
    </>
  );
};

export default React.memo(RealTimeCodeEditor);
