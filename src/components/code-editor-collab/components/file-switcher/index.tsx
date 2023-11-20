import { type FC } from "react";

import { Stack, Tabs, Tab } from "@mui/material";

import DevIcon from "../dev-icon";

import {
  type File
} from "../../hook/utils/collab/requests";
import { styles } from "./styles";

 interface FileSwitcherProps {
  activeFile: File | null
  onChange: (fileName: File) => void
  fileList: File[]
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
        value={activeFile?.name}
        onChange={(_, id) => {
          onChange(fileList.find(({ id: _id }) => id === _id) as File)}
        }
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        {fileList.map(({ name, id }) =>
          <Tab
            sx={styles.TAB}
            key={id}
            label={(
              <>
                <DevIcon sx={styles.DEV_ICON} fileName={name} />

                {name}
              </>
            )}
            value={id}
          />)}
      </Tabs>
    </Stack>
  )
}

export default FileSwitcher;
