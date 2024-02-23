import { Socket } from 'socket.io-client'

import { SubscribedCommentsEvents, EmitCommentsEvents } from '../utils/socket'

export const getCommentGroup = async (
  socket: Socket,
  props: CommentGroupProps
): Promise<CommentGroup | null> => {
  return new Promise((resolve, reject) => {
    socket.emit(EmitCommentsEvents.GetComments, props)

    socket.once(
      `${SubscribedCommentsEvents.GetCommentResponse}${props.roomId}${props.fileId}${props.groupId}`,
      (chatInfo: CommentGroup | null) => {
        if (chatInfo == null) {
          reject('Cannot create comment.')
        } else {
          resolve(chatInfo)
        }
      }
    )
  })
}

export const createCommentGroup = async (
  socket: Socket,
  props: CreateCommentGroupProps
): Promise<CommentGroup | null> => {
  return new Promise((resolve, reject) => {
    socket.emit(EmitCommentsEvents.CreateChat, props)

    socket.once(
      `${SubscribedCommentsEvents.CreateChatResponse}${props.roomId}`,
      (chatInfo: CommentGroup | null) => {
        if (chatInfo == null) {
          reject('Cannot create comment.')
        } else {
          resolve(chatInfo)
        }
      }
    )
  })
}

export const addCommentToGroup = async (
  socket: Socket,
  props: AddCommentToGroup
): Promise<CommentGroup | null> => {
  return new Promise((resolve, reject) => {
    socket.emit(EmitCommentsEvents.AddCommentToGroup, props)

    socket.once(
      `${SubscribedCommentsEvents.AddCommentToGroupResponse}${props.roomId}${props.fileId}${props.groupId}`,
      (commentGroup: CommentGroup | null) => {
        if (commentGroup == null) {
          reject('Cannot update comment.')
        } else {
          resolve(commentGroup)
        }
      }
    )
  })
}

export const removeCommentGroup = async (
  socket: Socket,
  props: CommentGroupProps
): Promise<boolean> => {
  return new Promise((resolve) => {
    socket.emit(EmitCommentsEvents.RemoveCommentGroup, props)

    socket.once(
      `${SubscribedCommentsEvents.RemoveCommentGroupResponse}${props.roomId}${props.fileId}${props.groupId}`,
      (isDeleted) => {
        resolve(isDeleted)
      }
    )
  })
}

export const removeCommentFromGroup = async (
  socket: Socket,
  props: RemoveCommentFromGroupProps
): Promise<CommentGroup> => {
  return new Promise((resolve) => {
    socket.emit(EmitCommentsEvents.RemoveCommentFromGroup, props)

    socket.once(
      `${SubscribedCommentsEvents.RemoveCommentFromGroupResponse}${props.roomId}${props.fileId}${props.groupId}`,
      (isDeleted) => {
        resolve(isDeleted)
      }
    )
  })
}

export const updateCommentPosition = async (
  socket: Socket,
  props: UpdateCommentGroupPosition
): Promise<CommentGroup> => {
  return new Promise((resolve) => {
    socket.emit(EmitCommentsEvents.UpdateCommentGroupPosition, props)

    socket.once(
      `${SubscribedCommentsEvents.UpdateCommentGroupPositionResponse}${props.roomId}${props.groupId}`,
      (isDeleted) => {
        resolve(isDeleted)
      }
    )
  })
}

interface BaseProps {
  roomId: string
  fileId: string
}

export interface WidgetPosition {
  x: number
  y: number
}

export interface Comment {
  id: string
  body: string
  doc: string
  name: string
}

export interface CommentGroup {
  id: string
  comments: Comment[]
  position: number | null
}

export interface CreateCommentGroupProps extends BaseProps {
  body: string
  name: string
  doc: string
}

export interface AddCommentToGroup extends CreateCommentGroupProps {
  groupId: string
}

export interface CommentGroupProps extends BaseProps {
  groupId: string
}

export interface RemoveCommentFromGroupProps extends CommentGroupProps {
  commentId: string
}

export interface UpdateCommentGroupPosition extends BaseProps {
  groupId: string
  position: number | null
}
