import { Box } from "@mui/system"
import WorkSpace from "./work-space"
import { mobileTabManager } from "./atoms/mobile-tab-manager.atom";
import { useAtom } from "jotai";
import SmallScreenTabs from "./work-space/tabs";

export const CodePanel = (): React.ReactElement => {
  const [{ activeTab }, setTab] = useAtom(mobileTabManager);
  return (
    <Box>
      <Box display="flex" justifyContent="center" p="10px" bgcolor="#EAFEFC">
        <SmallScreenTabs
        index={activeTab}
        onChangeIndex={(value) => {
          setTab({ activeTab: value });
        }}
      />
      </Box>
      <WorkSpace
        data={[]}
      />
    </Box>
  )
}
