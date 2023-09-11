/* eslint-disable @typescript-eslint/no-base-to-string */
import React, { memo, useEffect, useState } from "react";

import { io } from "socket.io-client";

import EditorSkeleton from "./EditorSkeleton";
import { CodeEditor } from "./editor";
import { getDocument } from "./extentions/collab";

export interface State {
  connected: boolean;
  version?: number;
  doc?: string;
}

interface IRealTimeEditor {
  userId: string;
  email: string;
  preloadedCode: string;
  onChange: (value: string) => void;
  code: string;
}

const socket = io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", { path: "/" });

// eslint-disable-next-line react/display-name
export const RealTimeEditor = memo(
  ({
    userId,
    email,
    onChange,
    preloadedCode,
    code,
  }: IRealTimeEditor): React.ReactElement => {
    const [state, setState] = useState<State>({
      connected: false,
      version: undefined,
      doc: undefined,
    });

    const getStartData = (): void => {
      getDocument(socket).then(({ version, doc }) => {
        if (version === undefined || !doc) {
          setTimeout(() => {
            socket.emit("create", userId);
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
      if (!userId) return;
      socket.open();
      socket.emit("create", userId);
      socket.on("connection", () => {
        setState((prev) => ({
          ...prev,
          connected: true,
        }));
      });

      getStartData();

      socket.on("disconnect", () => {
        setState((prev) => ({
          ...prev,
          connected: false,
        }));
      });

      window.addEventListener("beforeunload", () => {
        socket.emit("deleteRoom", userId);
        socket.off("connect");
        socket.off("disconnect");
        socket.off("pullUpdateResponse");
        socket.off("pushUpdateResponse");
        socket.off("getDocumentResponse");
        socket.close();
      });

      return () => {
        socket.emit("deleteRoom", userId);
        socket.off("connect");
        socket.off("disconnect");
        socket.off("pullUpdateResponse");
        socket.off("pushUpdateResponse");
        socket.off("getDocumentResponse");
        socket.close();
      };
    }, []);

    if (
      state?.version === undefined ||
      state?.doc === undefined ||
      !state.connected
    ) {
      return <EditorSkeleton />;
    }

    return (
      <>
        <style>
          {`
          .cm-editor {
            height: 100vh
          }

        `}
        </style>
        <CodeEditor
          state={state}
          cursorId={userId}
          preloadedCode={preloadedCode}
          onChangeCode={onChange}
          socket={socket}
          code={code}
        />
      </>
    );
  }
);

export * from "./events";
