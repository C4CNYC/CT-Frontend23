import { EditorView, WidgetType } from '@uiw/react-codemirror'
import debounce from 'lodash-es/debounce'

interface TooltipWidgetProps {
  id: string
  name: string
  color: number
  pos: number
  withTooltip: boolean
  userId?: string
}

const TOOLTIP_IN_VIEW_TIME = 5000
const debouncedHideTooltip = debounce((dom: HTMLDivElement) => {
  dom.style.display = 'none'
}, TOOLTIP_IN_VIEW_TIME)

export class TooltipWidget extends WidgetType {
  private id = ''
  private name = ''
  private suffix = ''
  private pos: number = 1
  private withTooltip: boolean = true
  private userId?: string = ''

  constructor({ id, color, name, pos, withTooltip, userId }: TooltipWidgetProps) {
    super()
    this.id = id
    this.suffix = `${(color % 8) + 1}`
    this.name = name
    this.pos = pos
    this.withTooltip = withTooltip
    this.userId = userId
  }

  toDOM(view: EditorView) {
    const dom = document.createElement('div')

    if (!this.withTooltip) {
      dom.style.display = 'none'

      return dom
    }

    const docLength = view.state.doc.length >= this.pos ? this.pos : view.state.doc.length
    const lineNumber = view.state.doc.lineAt(docLength).number
    const isOnTheFirstLine = lineNumber === 1

    dom.className = 'cm-tooltip-none'
    dom.style.display = 'inline-block'

    const cursorTooltip = document.createElement('div')
    const positionClassName = isOnTheFirstLine ? 'cm-tooltip-below' : 'cm-tooltip-above'
    const rotateClassName = isOnTheFirstLine ? 'cm-tooltip-rotate' : ''

    cursorTooltip.className = `cm-tooltip-cursor cm-tooltip ${positionClassName} ${rotateClassName} cm-tooltip-${this.suffix}`
    cursorTooltip.textContent = this.name

    const cursorCaret = document.createElement('div')
    cursorCaret.className = 'cm-cursor-caret'

    const tooltipArrow = document.createElement('div')
    tooltipArrow.className = 'cm-tooltip-arrow'

    cursorTooltip.appendChild(tooltipArrow)
    dom.appendChild(cursorTooltip)
    if (this.id.split('_')[0] === this.userId) dom.appendChild(cursorCaret)

    debouncedHideTooltip(dom)

    return dom
  }

  ignoreEvent() {
    return false
  }
}
