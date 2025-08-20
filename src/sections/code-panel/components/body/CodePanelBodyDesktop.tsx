import { Stack } from '@mui/system'
import Split from '@uiw/react-split'

import { useSelector } from '@/redux/store'

import ResizeDivider from './blocks/resize-divider'

export function CodePanelBodyDesktop({
  left,
  center,
  right,
}: {
  left: React.ReactNode
  right: React.ReactNode
  center: React.ReactNode
}) {
  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)
  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)
  const isCenterMode = isBrowserHidden && isInstructionsHidden
  const getDisabled = () => {
    if (isCenterMode) return true
    return isInstructionsHidden ? [2] : isBrowserHidden ? [3] : false
  }

  const getVisible = () => {
    if (isCenterMode) return false
    return isInstructionsHidden ? [3] : isBrowserHidden ? [2] : true
  }
  return (
    <Stack
      px={1}
      gap={1}
      direction='row'
      id='view_user_code_block'
    >
      <Split
        lineBar
        disable={getDisabled()}
        style={{
          borderRadius: 3,
          width: '100%',
        }}
        visible={getVisible()}
        renderBar={({ ...props }) => (
          <ResizeDivider
            props={props}
            isBrowserHidden={isCenterMode}
          />
        )}
      >
        <div
          style={{
            width: isCenterMode || isInstructionsHidden ? '34px' : isBrowserHidden ? '44%' : '28%',
            maxWidth: '40%',
            minWidth: !isInstructionsHidden ? '26%' : '34px',
          }}
        >
          {left}
        </div>
        <div
          style={{
            width: isCenterMode ? '100%' : '56%',
            flex: 1,
          }}
        >
          {center}
        </div>
        <div
          style={{
            width: isCenterMode || isBrowserHidden ? '28px' : isInstructionsHidden ? '44%' : '26%',
            maxWidth: '40%',
            minWidth: !isBrowserHidden ? '20%' : '34px',
            paddingLeft: isBrowserHidden ? '5px' : 0,
          }}
        >
          {right}
        </div>
      </Split>
    </Stack>
  )
}
