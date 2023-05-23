import { Box } from "@mui/system"
import { ControllPanel } from "./controll-panel"

export const SketchCanvas = (): React.ReactElement => {
  return (
    <Box>
      <ControllPanel/>
      {/* here canvas */}
    </Box>
  )
}
