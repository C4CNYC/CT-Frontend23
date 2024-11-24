import * as _ from 'lodash-es'
import { Socket, io } from 'socket.io-client'

export enum SubscribedEvents {
  Connect = 'connect',
  PushResponse = 'pushUpdateResponse',
  GetFileInfoResponse = 'getFileInfoResponse',
  GetDocResponse = 'getDocumentResponse',
  ActiveFileChanged = 'activeFileChanged',
  DeleteResponse = 'deleteFileResponse',
  AddFile = 'addFile',
  RoomExistResponse = 'isRoomExistResponse',
  RoomDeleteResponse = 'isRoomDeleted',
  DocUpdated = 'docUpdated',
  CreateFileResponse = 'createFileResponse',
}

export enum EmitSocketEvents {
  Pull = 'pullUpdates',
  PullResponse = 'pullUpdateResponse',
  Push = 'pushUpdates',
  GetDoc = 'getDocument',
  DeleteRoom = 'deleteRoom',
  SetActiveFile = 'setActiveFile',
  DeleteFile = 'deleteFile',
  GetFileInfo = 'getFileInfo',
  CreateFile = 'createFile',
  AddFileResponse = 'addFileResponse',
  AddedFileListUpdated = 'addedFileListUpdated',
}

export enum SubscribedCommentsEvents {
  CreateChatResponse = 'createChatResponse',
  UpdateChatResponse = 'updateChatResponse',
  RemoveCommentGroupResponse = 'removeCommentGroupResponse',
  AddCommentToGroupResponse = 'addCommentToGroupResponse',
  GetCommentResponse = 'getCommentResponse',
  CommentGroupRemovedResponse = 'commentGroupRemovedResponse',
  UpdateCommentGroupPositionResponse = 'updateCommentGroupPositionResponse',
  RemoveCommentFromGroupResponse = 'removeCommentFromGroupResponse',
  CommentGroupUpdated = 'commentGroupUpdated',
}

export enum EmitCommentsEvents {
  CreateChat = 'createChat',
  UpdateChat = 'udpateChat',
  RemoveCommentGroup = 'removeCommentGroup',
  UpdateCommentGroupPosition = 'updateCommentGroupPosition',
  AddCommentToGroup = 'addCommentToGroup',
  GetComments = 'getComments',
  RemoveCommentFromGroup = 'removeCommentFromGroup',
}

export const unsubscribeSocket = (socket?: Socket): void => {
  if (!socket) return

  _.values(SubscribedEvents).forEach((event) => {
    socket?.off(event)
  })
}

export const createSocket = (userId?: null | string): Socket => {
  return io(process.env.NEXT_PUBLIC_CODE_STREAM_API_HOST ?? '', {
    path: process.env.NEXT_PUBLIC_CODE_STREAM_API_PATH ?? undefined,
    auth: userId ? { userId } : {},
    transports: ['websocket'],
  })
}

export const waitConnectSocket = async (socket: Socket): Promise<boolean> => {
  return await new Promise((resolve) => {
    socket.on(SubscribedEvents.Connect, () => {
      resolve(true)
    })
  })
}
