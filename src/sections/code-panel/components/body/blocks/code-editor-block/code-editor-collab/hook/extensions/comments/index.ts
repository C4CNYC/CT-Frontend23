import { getCommentField } from './field'
import { cursorBaseTheme } from './theme'
import type { CommentExtensionProps } from './types'

export const commentExtenstion = (props: CommentExtensionProps) => {
  return [getCommentField(props), cursorBaseTheme]
}
