import { Box } from "@mui/system";
import { memo, useState } from "react";
import SmallScreenTabs from "./tabs";
import MyEditor from "@components/editor/MyEditor";
import { SketchCanvas } from "@components/sketch-canvas";

const ContentSpace = (): React.ReactElement | null => {
  const [index, setIndex] = useState(0);
  return <Box>
    <Box width="225px" margin="auto">
      <SmallScreenTabs
        index={index}
        onChangeIndex={(index) => { setIndex(index) }}
      />
    </Box>
    {index === 0 && <MyEditor multimediaValue={""} realtime/>}
    {index === 0 && <SketchCanvas/>}
  </Box>;
}

export default memo(ContentSpace);
