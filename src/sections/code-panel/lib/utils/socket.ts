import { values as _values } from 'lodash-es'
import { Socket, io } from 'socket.io-client'

export enum SubscribedEvents {
  Connect = 'connect',
  Disconnect = 'disconnect',
  ConnectError = 'connect_error',
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

export const unsubscribeAllSocketEvents = (socket?: Socket): void => {
  if (!socket) return

  _values(SubscribedEvents).forEach((event) => {
    socket?.off(event)
  })

  socket?.disconnect()
}

export const createSocket = ({
  userId,
  onConnect,
}: {
  userId?: string
  onConnect?: (s: Socket) => void
} = {}): Socket => {
  const socket = io(process.env.NEXT_PUBLIC_CODE_STREAM_API_HOST ?? '', {
    path: process.env.NEXT_PUBLIC_CODE_STREAM_API_PATH ?? undefined,
    auth: userId ? { userId } : {},
  })
  socket.on(SubscribedEvents.ConnectError, (error) => {
    // eslint-disable-next-line no-console
    console.error('Socket connection error', error)
  })

  socket.on(SubscribedEvents.Connect, () => {
    // eslint-disable-next-line no-console
    console.log('Connected to socket server')

    // socket.onAnyOutgoing((e) => {
    //   // eslint-disable-next-line no-console
    //   console.log('out:', e)
    // })
    //
    // socket.onAny((e) => {
    //   // eslint-disable-next-line no-console
    //   console.log('in:', e)
    // })

    onConnect?.(socket)
  })

  return socket
}

export const waitForSocketConnection = async (socket: Socket): Promise<boolean> => {
  return await new Promise((resolve) => {
    socket.on(SubscribedEvents.Connect, () => {
      resolve(true)
    })
  })
}
