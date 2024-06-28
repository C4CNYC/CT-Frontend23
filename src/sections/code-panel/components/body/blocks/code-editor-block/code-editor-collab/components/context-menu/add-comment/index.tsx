import { useState, type FC } from 'react'

import { Button, TextareaAutosize } from '@mui/material'

import { CodeEditorBlockWrapper } from './styles'

interface AddCommentProps {
  isDisabled: boolean
  onAddComment: (comment: string) => void
  onClose: () => void
}

const AddComment: FC<AddCommentProps> = ({ isDisabled, onAddComment }) => {
  const [comment, setComment] = useState('')

  const onAdd = () => {
    onAddComment(comment)
    setComment('')
  }

  return (
    <CodeEditorBlockWrapper>
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
    </CodeEditorBlockWrapper>
  )
}

export default AddComment
