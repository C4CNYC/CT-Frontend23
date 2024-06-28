import type { FC } from 'react'

import { type PopoverProps, Popover, ClickAwayListener, Button } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'

import type { File } from '../../hook/requests'
import { WidgetPosition } from '../../hook/requests/comments'
import type { CommentPopupProps } from '../../hook/useComments'
import { language } from '../../hook/utils'

import {
  CloseIcon,
  CommentItem,
  CommentName,
  CommentPopupWrapper,
  CommentTitle,
  CommentWrapper,
} from './styles'

interface OnRemoveComment {
  groupId: string
  commentId: string
}

interface CommentComponentPopupProps extends Partial<Omit<CommentPopupProps, 'position'>> {
  isOpen: boolean
  onClose: () => void
  onRemoveComment: (props: OnRemoveComment) => Promise<void>
  onRemoveCommentGroup: (groupId: string) => Promise<void>
  position?: WidgetPosition
  activeFile: File
}

const ANCHOR_ORIGIN: PopoverProps['anchorOrigin'] = {
  vertical: 'bottom',
  horizontal: 'left',
}

const TRANSFORM_ORIGIN: PopoverProps['transformOrigin'] = {
  vertical: -30,
  horizontal: 370,
}

const CommentPopup: FC<CommentComponentPopupProps> = ({
  isOpen,
  onClose,
  position,
  comments = [],
  id: groupId,
  onRemoveCommentGroup,
  onRemoveComment,
  activeFile,
}) => {
  return (
    <Popover
      onClose={onClose}
      open={isOpen}
      anchorReference='anchorPosition'
      anchorPosition={{
        left: position?.x ?? 0,
        top: position?.y ?? 0,
      }}
      anchorOrigin={ANCHOR_ORIGIN}
      transformOrigin={TRANSFORM_ORIGIN}
    >
      <ClickAwayListener onClickAway={onClose}>
        <CommentPopupWrapper>
          <CloseIcon onClick={onClose} />

          {comments.map(({ id, name, doc, body }, i) => {
            return (
              <CommentWrapper
                lastItem={comments.length - 1 === i}
                key={id}
              >
                <CodeMirror
                  value={doc}
                  extensions={[...language(activeFile.extension)]}
                  maxHeight='68px'
                  theme='dark'
                  readOnly
                />

                <CommentItem>
                  <CommentTitle>Commented by</CommentTitle> <CommentName>{name}</CommentName> <br />
                  {body} <br />
                  <Button
                    onClick={() => {
                      if (groupId == null) {
                        return
                      }

                      void onRemoveComment({ groupId, commentId: id })
                    }}
                  >
                    Remove
                  </Button>
                </CommentItem>
              </CommentWrapper>
            )
          })}

          <Button
            style={{ float: 'right' }}
            onClick={() => {
              if (groupId == null) {
                return
              }

              void onRemoveCommentGroup(groupId)
            }}
          >
            Clear all
          </Button>
        </CommentPopupWrapper>
      </ClickAwayListener>
    </Popover>
  )
}

export default CommentPopup
