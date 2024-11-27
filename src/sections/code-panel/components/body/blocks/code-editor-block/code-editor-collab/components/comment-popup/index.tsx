import type { FC } from 'react'

import Close from '@mui/icons-material/Close'
import { type PopoverProps, Popover, Box, ClickAwayListener, Button } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'

import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'

import { WidgetPosition } from '../../hook/requests/comments'
import type { CommentPopupProps } from '../../hook/useComments'
import { language } from '../../hook/utils'

import { useStyles } from './styles'

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
  activeFile: StudentFile
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
  const styles = useStyles()

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
        <Box className={styles.content}>
          <Close
            onClick={onClose}
            className={styles.closeIcon}
          />

          {comments.map(({ id, name, doc, body }, i) => {
            return (
              <div
                className={`${styles.commentWrapper} ${comments.length - 1 === i ? styles.lastCommentWrapper : ''}`}
                key={id}
              >
                <CodeMirror
                  value={doc}
                  extensions={[...language(activeFile)]}
                  maxHeight='68px'
                  theme='dark'
                  readOnly
                />

                <div className={styles.commentItem}>
                  <span className={styles.commentTitle}>Commented by</span>{' '}
                  <span className={styles.commentName}>{name}</span> <br />
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
                </div>
              </div>
            )
          })}

          <Button
            className={styles.clearAll}
            onClick={() => {
              if (groupId == null) {
                return
              }

              void onRemoveCommentGroup(groupId)
            }}
          >
            Clear all
          </Button>
        </Box>
      </ClickAwayListener>
    </Popover>
  )
}

export default CommentPopup
