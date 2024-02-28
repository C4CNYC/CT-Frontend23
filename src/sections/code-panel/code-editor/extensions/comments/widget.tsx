import { WidgetType } from '@uiw/react-codemirror'
import { type Root, createRoot } from 'react-dom/client'

import CommentIcon, { type CommentWidgetProps } from '../../components/comment-icon'

export class CommentWidget extends WidgetType {
  commentWidgetProps: CommentWidgetProps | null = null
  root: Root | null = null
  dom = document.createElement('div')

  constructor(props: CommentWidgetProps) {
    super()
    this.commentWidgetProps = props
  }

  toDOM() {
    this.root = createRoot(this.dom)
    this.dom.className = 'comment-icon'
    this.dom.style.position = 'absolute'
    this.dom.style.right = '0px'
    this.dom.style.bottom = '0px'
    this.dom.style.width = '20px'
    this.dom.style.height = '100%'
    this.dom.style.marginRight = '8px'

    if (this.commentWidgetProps != null) {
      this.root.render(<CommentIcon {...this.commentWidgetProps} />)
    }

    return this.dom
  }

  destroy(): void {
    this.root?.unmount()
  }

  ignoreEvent() {
    return false
  }
}
