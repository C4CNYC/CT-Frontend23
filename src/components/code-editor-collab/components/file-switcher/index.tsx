import { type FC } from "react";

import { Stack, Tabs, Tab } from "@mui/material";

import { styles } from "./styles";

 interface FileSwitcherProps {
  activeFile: string | null
  onChange: (fileName: string) => void
  fileList: string[]
 }

const FileSwitcher: FC<FileSwitcherProps> = ({
  onChange,
  activeFile,
  fileList
}) => {
  return (
    <Stack sx={styles.WRAPPER_STACK_SX}>
      <Tabs
        sx={styles.TABS}
        value={activeFile}
        onChange={(_, fileName) => onChange(fileName)}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        {fileList.map((fileName) =>
          <Tab sx={styles.TAB} key={fileName} label={fileName} value={fileName} />)}
      </Tabs>
    </Stack>
  )
}

export default FileSwitcher;
