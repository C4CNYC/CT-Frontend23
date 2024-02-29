import { getCommentField } from './field'
import { cursorBaseTheme } from './theme'
import type { CommentExtensionProps } from './types'

export const commentExtension = (props: CommentExtensionProps) => {
  return [getCommentField(props), cursorBaseTheme]
}
