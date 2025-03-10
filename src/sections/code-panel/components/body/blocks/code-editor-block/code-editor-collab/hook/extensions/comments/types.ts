import type { Update } from '@codemirror/collab'
// import type { Socket } from 'socket.io-client'

import type { CommentGroup } from '../../requests/comments'
import type { CommentPopupProps } from '../../useComments'

export interface CommentEffect extends CommentGroup {
  status?: string
  type: string
  from: number
  to: number
}

export interface CommentExtensionProps {
  updates: Update[]
  fileId: string
  roomId: string
  socket: any
  onCommentIconClick: (props: CommentPopupProps | null) => void
}
