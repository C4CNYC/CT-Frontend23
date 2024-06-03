import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

// import type { EditorMode } from '@/sections/code-editor-panel/code-editor-collab/hook/constants'
enum EditorMode {
  Owner = 'owner',
  Watcher = 'watcher',
  SubOwner = 'subOwner',
}

export interface CodeEditorControllerRoom {
  ownerId?: string
  roomId: string
  cursorText?: string
  preloadedCode?: string
  code?: string
  mode?: EditorMode
}

interface StateControllerProps {
  room: CodeEditorControllerRoom | null
}

const emptyRoom = { roomId: '' }

const initialState: StateControllerProps = { room: null }

export const CodeEditorControllerSlice = createSlice({
  name: 'code-panel-controller',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<CodeEditorControllerRoom | null>) => {
      state.room = action.payload
    },
    resetRoom: (state) => {
      state.room = emptyRoom
    },
  },
})

export const { setRoom, resetRoom } = CodeEditorControllerSlice.actions

export default CodeEditorControllerSlice.reducer
