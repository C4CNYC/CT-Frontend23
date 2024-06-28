import { type FC, type MouseEventHandler, useState, useRef, useEffect } from 'react'

import ChatIcon from '@mui/icons-material/Chat'
import { Socket } from 'socket.io-client'

import { type CommentGroup, getCommentGroup } from '../../hook/requests/comments'
import type { Comment } from '../../hook/requests/comments'
import type { CommentPopupProps } from '../../hook/useComments'
import { SubscribedCommentsEvents } from '../../hook/utils/socket'

import { CodeEditorBlockWrapper, CommentIconWrapper } from './styles'

export interface CommentWidgetProps extends CommentGroup {
  socket?: Socket
  fileId: string
  roomId: string
  onCommentIconClick: (props: CommentPopupProps | null) => void
}

const EMPTY_RECT = { x: 0, y: 0 }

const CommentIcon: FC<CommentWidgetProps> = ({
  id,
  fileId,
  socket,
  roomId,
  onCommentIconClick,
}) => {
  const anchorElRef = useRef<HTMLDivElement | null>(null)
  const [comments, setComments] = useState<Comment[]>([])

  const onClick: MouseEventHandler<SVGSVGElement> = async (e) => {
    e.stopPropagation()

    if (socket == null) {
      return
    }

    const res = await getCommentGroup(socket, {
      roomId,
      fileId,
      groupId: id,
    })

    if (res == null) {
      return
    }

    const { x, y } = anchorElRef.current?.getBoundingClientRect() ?? EMPTY_RECT

    onCommentIconClick({ ...res, position: { x, y } })
  }

  useEffect(() => {
    if (socket == null) {
      return
    }

    const runEffect = async () => {
      const res = await getCommentGroup(socket, {
        roomId,
        fileId,
        groupId: id,
      })

      if (res?.comments == null) {
        return
      }

      setComments(res.comments)
    }

    void runEffect()

    const event = `${SubscribedCommentsEvents.CommentGroupUpdated}${roomId}${fileId}${id}`

    socket.on(event, (group: CommentGroup | null) => {
      if (group?.comments == null) {
        return
      }

      setComments(group.comments)
    })

    return () => {
      socket.off(event)
    }
  }, [socket, fileId, id, roomId])

  return (
    <CodeEditorBlockWrapper ref={anchorElRef}>
      <ChatIcon
        color='info'
        onClick={onClick}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
      />

      {comments.length > 0 && <CommentIconWrapper>{comments.length}</CommentIconWrapper>}
    </CodeEditorBlockWrapper>
  )
}

export default CommentIcon
