import { useState, type FC } from 'react'

import { Button, Tooltip, Box, TextareaAutosize } from '@mui/material'

import { useStyles } from './styles'

interface AddCommentProps {
  isDisabled: boolean
  onAddComment: (comment: string) => void
  onClose: () => void
}

const AddComment: FC<AddCommentProps> = ({ isDisabled, onAddComment, onClose }) => {
  const [comment, setComment] = useState('')
  const [isInputVisible, setIsInputVisible] = useState(false)
  const styles = useStyles()

  const onAdd = () => {
    onAddComment(comment)
    setComment('')
    onClose()
  }

  return isInputVisible ? (
    <Box className={styles.wrapper}>
      <TextareaAutosize
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxRows={4}
        minRows={1}
        placeholder='Your comment'
      />

      <Button
        onClick={onAdd}
        color='info'
        variant='text'
      >
        Add
      </Button>
    </Box>
  ) : (
    <Tooltip
      open={isDisabled ? undefined : false}
      title={'Select code to add comment.'}
    >
      <Box>
        <Button
          color='info'
          onClick={() => setIsInputVisible(true)}
          disabled={isDisabled}
          variant='text'
        >
          Add Comment
        </Button>
      </Box>
    </Tooltip>
  )
}

export default AddComment
