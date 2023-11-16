import { Socket, io } from "socket.io-client";
import { values } from "lodash";

export enum SubscribedEvents {
  Connect = "connect",
  PushResponse = "pushUpdateResponse",
  GetFileInfoResponse = "getFileInfoResponse",
  GetDocResponse = "getDocumentResponse",
  ActiveFileChanged = "activeFileChanged",
  DeleteResponse = "deleteFileResponse",
  AddFile = "addFile"
}

export enum EmitSocketEvents {
  Pull = "pullUpdates",
  PullResponse = "pullUpdateResponse",
  Push = "pushUpdates",
  GetDoc = "getDocument",
  DeleteRoom = "deleteRoom",
  SetActiveFile = "setActiveFile",
  DeleteFile = "deleteFile",
  GetActiveFile = "getActiveFile",
  GetActiveFileResponse = "getActiveFileResponce",
  GetFileInfo = "getFileInfo",
  AddFileResponse = "addFileResponse",
  AddedFileListUpdated = "addedFileListUpdated"
}

export const unsubscribeSocket = (socket: Socket | null): void => {
  values(SubscribedEvents).forEach((event) => {
    socket?.off(event)
  });

  socket?.disconnect();
}

export const createSocket = (): Socket => {
	return io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", {
    path: "/api",
  });
}

export const waitConnectSocket = async (socket: Socket): Promise<boolean> => {
  return new Promise((resolve) => {
    socket.on(SubscribedEvents.Connect, () => {
      resolve(true)
    })
  })
}
