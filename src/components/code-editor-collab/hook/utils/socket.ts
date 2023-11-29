import { values } from "lodash";
import { Socket, io } from "socket.io-client";

export enum SubscribedEvents {
  Connect = "connect",
  PushResponse = "pushUpdateResponse",
  GetFileInfoResponse = "getFileInfoResponse",
  GetDocResponse = "getDocumentResponse",
  ActiveFileChanged = "activeFileChanged",
  DeleteResponse = "deleteFileResponse",
  AddFile = "addFile",
  RoomExistResponse = "isRoomExistResponse",
  RoomDeleteResponse = "isRoomDeleted",
  DocUpdated = "docUpdated",
  CreateFileResponse = "createFileResponse",
}

export enum EmitSocketEvents {
  Pull = "pullUpdates",
  PullResponse = "pullUpdateResponse",
  Push = "pushUpdates",
  GetDoc = "getDocument",
  DeleteRoom = "deleteRoom",
  SetActiveFile = "setActiveFile",
  DeleteFile = "deleteFile",
  GetFileInfo = "getFileInfo",
  CreateFile = "createFile",
  AddFileResponse = "addFileResponse",
  AddedFileListUpdated = "addedFileListUpdated",
}

export const unsubscribeSocket = (socket: Socket | null): void => {
  values(SubscribedEvents).forEach((event) => {
    socket?.off(event);
  });

  socket?.disconnect();
};

export const createSocket = (userId?: null | string): Socket => {
  return io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", {
    path: "/api",
    auth: userId ? { userId } : {}
  });
};

export const waitConnectSocket = async (socket: Socket): Promise<boolean> => {
  return await new Promise((resolve) => {
    socket.on(SubscribedEvents.Connect, () => {
      resolve(true);
    });
  });
};
