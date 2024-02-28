import type { Update } from '@codemirror/collab'
import type { Socket } from 'socket.io-client'

import type { CommentGroup } from '@/sections/code-panel/code-editor/utils/requests/comments'

import type { CommentPopupProps } from '../../hooks/useComments'

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
  socket: Socket
  onCommentIconClick: (props: CommentPopupProps | null) => void
}
