import { useEffect, useState } from 'react'

import { Divider, MenuItem, Popover, Typography } from '@mui/material'
import { IoMdCopy } from '@react-icons/all-files/io/IoMdCopy'
import { IoMdCut } from '@react-icons/all-files/io/IoMdCut'
import { MdChatBubbleOutline } from '@react-icons/all-files/md/MdChatBubbleOutline'
import { MdContentPaste } from '@react-icons/all-files/md/MdContentPaste'

import { MenuPopover } from '@root/src/components'

import AddComment from './add-comment'

interface ColabContextMenuProps {
  isAddCommentOpen: boolean
  setIsAddCommentOpen: (value: boolean) => void
  position: { top: number; left: number }
  onAddComment: (comment: string) => void
}

enum SubAction {
  ADD_COMMENT = 'ADD_COMMENT',
}

export const ColabContextMenu: React.FC<ColabContextMenuProps> = ({
  isAddCommentOpen,
  setIsAddCommentOpen,
  onAddComment,
  position,
}) => {
  const [subAction, setSubAction] = useState<SubAction | null>(null)

  useEffect(() => {
    if (isAddCommentOpen) {
      setSubAction(null)
    }
  }, [isAddCommentOpen])

  switch (subAction) {
    case SubAction.ADD_COMMENT:
      return (
        <Popover
          anchorEl={null}
          anchorReference='anchorPosition'
          anchorPosition={position}
          onClose={() => setIsAddCommentOpen(false)}
          sx={{ width: '100%', p: 0 }}
          open={isAddCommentOpen}
        >
          {SubActionComponents[SubAction.ADD_COMMENT]({
            onAddComment,
            onClose: () => {
              setIsAddCommentOpen(false)
            },
          })}
        </Popover>
      )
    default: {
      return (
        <MenuPopover
          anchorEl={null}
          disabledArrow
          anchorReference='anchorPosition'
          anchorPosition={position}
          onClose={() => setIsAddCommentOpen(false)}
          sx={{ width: 200, p: 0 }}
          open={isAddCommentOpen}
        >
          <Typography
            variant='caption'
            sx={{ p: 1 }}
          >
            Social
          </Typography>

          <MenuItem
            onClick={(e) => {
              setSubAction(SubAction.ADD_COMMENT)
              e.stopPropagation()
            }}
            sx={{ m: 1 }}
          >
            <MdChatBubbleOutline /> Start Thread
          </MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Typography
            variant='caption'
            sx={{ p: 1 }}
          >
            Clipboard
          </Typography>
          <MenuItem
            onClick={() => setIsAddCommentOpen(false)}
            sx={{ m: 1 }}
          >
            <IoMdCopy />
            Copy
          </MenuItem>
          <MenuItem
            onClick={() => setIsAddCommentOpen(false)}
            sx={{ m: 1 }}
          >
            <MdContentPaste /> Past
          </MenuItem>
          <MenuItem
            onClick={() => setIsAddCommentOpen(false)}
            sx={{ m: 1 }}
          >
            <IoMdCut /> Cut
          </MenuItem>
        </MenuPopover>
      )
    }
  }
}

const SubActionComponents = {
  [SubAction.ADD_COMMENT]: ({
    onAddComment,
    onClose,
  }: {
    onAddComment: (comment: string) => void
    onClose: () => void
  }) => (
    <AddComment
      onAddComment={onAddComment}
      onClose={onClose}
      isDisabled={false}
    />
  ),
}
