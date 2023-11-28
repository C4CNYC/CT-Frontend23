/* eslint-disable @typescript-eslint/no-base-to-string */
import React, { memo, useCallback, useEffect, useState } from "react";

import EditorSkeleton from "./EditorSkeleton";
import { CodeEditor } from "./editor";
import { getDocument } from "../../codemirror/extensions/collab";
import { useSocket } from "@hooks";
import { useRouter } from "next/router";

export interface State {
  connected: boolean;
  version?: number;
  doc?: string;
}

interface IRealTimeEditor {
  userId: string;
  email: string;
  cursorText: string;
  preloadedCode: string;
  onChange: (value: string) => void;
  code: string;
}

// eslint-disable-next-line react/display-name
export const RealTimeEditor = memo(
  ({
    userId,
    email,
    cursorText,
    onChange,
    preloadedCode,
    code,
  }: IRealTimeEditor): React.ReactElement => {
    const { query } = useRouter();
    const [state, setState] = useState<State>({
      connected: false,
      version: undefined,
      doc: undefined,
    });

    const socket = useSocket();

    /**
     * Gets and sets the initial document data.
     * If no/invalid data is returned, it tries again every 3 seconds.
     */
    async function initializeData() {
      try {
        const { version, doc } = await getDocument(socket, userId);
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
      socket.emit("create", userId, query.lessonId, window.localStorage?.getItem(`code-${query.id}-${query.lessonId}`) ?? "");
      await initializeData();
    }, [socket, initializeData, query.id, query.lessonId]);

    useEffect(() => {
      if (!userId || !query.lessonId) return;
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
        socket.emit("deleteRoom", userId);
        socket.off("connect");
        socket.off("disconnect");
        socket.close();
      });

      return () => {
        socket.emit("deleteRoom", userId);
        socket.off("connect");
        socket.off("disconnect");
        socket.close();
      };
    }, [userId, query.lessonId]);

    if (
      state?.version === undefined ||
      state?.doc === undefined
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
          roomId={userId}
          state={state}
          cursorId={userId}
          cursorText={cursorText}
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
