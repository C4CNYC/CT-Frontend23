import { JSX, HTMLAttributes, CSSProperties, ReactNode, RefAttributes } from 'react'

import {
  ImperativePanelGroupHandle,
  ImperativePanelHandle,
  Panel as PanelComponent,
  PanelGroup as PanelGroupComponent,
  PanelGroupOnLayout,
  PanelGroupStorage,
  PanelOnCollapse,
  PanelOnExpand,
  PanelOnResize,
  PanelResizeHandle as PanelResizeHandleComponent,
  PanelResizeHandleOnDragging,
} from 'react-resizable-panels'
import { PointerHitAreaMargins } from 'react-resizable-panels/dist/declarations/src/PanelResizeHandleRegistry'
import { Direction } from 'react-resizable-panels/dist/declarations/src/types'

export const PanelGroup = (
  props: JSX.IntrinsicAttributes &
    Omit<HTMLAttributes<keyof HTMLElementTagNameMap>, 'id'> & {
      autoSaveId?: string | null | undefined
      className?: string | undefined
      direction: Direction
      id?: string | null | undefined
      keyboardResizeBy?: number | null | undefined
      onLayout?: PanelGroupOnLayout | null | undefined
      storage?: PanelGroupStorage | undefined
      style?: CSSProperties | undefined
      tagName?: keyof HTMLElementTagNameMap | undefined
    } & { children?: ReactNode } & RefAttributes<ImperativePanelGroupHandle>
) => <PanelGroupComponent {...props} />

export const PanelResizeHandle = (
  props: JSX.IntrinsicAttributes &
    Omit<HTMLAttributes<keyof HTMLElementTagNameMap>, 'id'> & {
      className?: string | undefined
      disabled?: boolean | undefined
      hitAreaMargins?: PointerHitAreaMargins | undefined
      id?: string | null | undefined
      onDragging?: PanelResizeHandleOnDragging | undefined
      style?: CSSProperties | undefined
      tabIndex?: number | undefined
      tagName?: keyof HTMLElementTagNameMap | undefined
    } & { children?: ReactNode }
) => (
  <PanelResizeHandleComponent
    {...props}
    style={{ width: 1, background: '#e4e4e4' }}
  />
)

export const Panel = (
  props: JSX.IntrinsicAttributes &
    Omit<HTMLAttributes<keyof HTMLElementTagNameMap>, 'id' | 'onResize'> & {
      className?: string | undefined
      collapsedSize?: number | undefined
      collapsible?: boolean | undefined
      defaultSize?: number | undefined
      id?: string | undefined
      maxSize?: number | undefined
      minSize?: number | undefined
      onCollapse?: PanelOnCollapse | undefined
      onExpand?: PanelOnExpand | undefined
      onResize?: PanelOnResize | undefined
      order?: number | undefined
      style?: object | undefined
      tagName?: keyof HTMLElementTagNameMap | undefined
    } & { children?: ReactNode } & RefAttributes<ImperativePanelHandle>
) => <PanelComponent {...props} />
