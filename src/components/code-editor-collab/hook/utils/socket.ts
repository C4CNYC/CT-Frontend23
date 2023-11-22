export enum SubscribedEvents {
  Connect = "connect",
  PushResponse = "pushUpdateResponse",
  GetFileInfoResponse = "getFileInfoResponse",
  GetDocResponse = "getDocumentResponse",
  ActiveFileChanged = "activeFileChanged",
  DeleteResponse = "deleteFileResponse",
  AddFile = "addFile",
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
  AddedFileListUpdated = "addedFileListUpdated",
}
