import { type FC, memo, useState } from 'react'

import { AuthUserType } from '@/auth/types'
import { useSelector } from '@/redux/store'
import CodeEditorCollab from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab'
import { voidFunction } from '@/utils'

interface CodeEditorControllerProps {
  onChangeStreamingDocInfo?: (value: Record<string, string>) => void
  user?: AuthUserType
  preloadedCode?: string
}

const CodeEditorController: FC<CodeEditorControllerProps> = ({
  onChangeStreamingDocInfo = voidFunction,
  user,
  preloadedCode,
}) => {
  const [randomRoom] = useState(`${Math.random()}${Date.now()}`)

  const room = useSelector((state) => state.codeEditorController.room)

  return (
    <CodeEditorCollab
      roomId={room?.roomId ?? randomRoom}
      cursorText={room?.cursorText}
      preloadedCode={preloadedCode}
      onChangeStreamingDocInfo={onChangeStreamingDocInfo}
      code={room?.code}
      mode={room?.mode}
      user={user}
    />
  )
}

export default memo(CodeEditorController)
