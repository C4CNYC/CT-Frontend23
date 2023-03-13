import SaveButton from "@components/editor/SaveButton";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { MdOutlinePermMedia } from "react-icons/md";
import StepCode from "./StepCode";
import StepMultimedia from "./StepMultimedia";

type Props = {
  code: string;
  contentValue: string;
  multimediaValue: string;
  setUserCode: Function;
  setContentValue: Function;
  setMultimediaValue: Function;
};

export default function StepContentEditor({
  code,
  setUserCode,
  contentValue,
  setContentValue,
  multimediaValue,
  setMultimediaValue,
}: Props): React.ReactElement {
  // const [currentTab, setCurrentTab] = useState("code");
  const TABS = [
    {
      value: "multimedia",
      label: "multimedia",
      icon: <MdOutlinePermMedia size="20px" />,
      component: (
        <StepMultimedia
          multimediaValue={multimediaValue}
          setMultimediaValue={setMultimediaValue}
        />
      ),
    },
    {
      value: "code",
      label: "Code",
      icon: <BsCodeSlash size="20px" />,
      component: <StepCode code={code} setUserCode={setUserCode} />,
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#f4f5f7",
          px: "15px",
        }}
      >
        <Tabs
          value={contentValue}
          onChange={(event, newValue) => {
            setContentValue(newValue);
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={tab.label as string}
            />
          ))}
        </Tabs>
        {contentValue === "code" ? (
          <SaveButton
            onClick={() => {}}
            sx={{
              color: "#7963d2",
              border: "1px solid rgba(121, 99, 210, 0.5)",
              borderRadius: "4px",
              "&:hover": {
                border: "1px solid rgba(121, 99, 210, 0.5)",
                backgroundColor: " rgba(121, 99, 210, 0.1)",
              },
            }}
          />
        ) : null}
      </Box>

      {TABS.map(
        (tab) =>
          tab.value === contentValue && (
            <Box sx={{ overflowY: "auto" }} key={tab.value}>
              {" "}
              {tab.component}{" "}
            </Box>
          )
      )}
    </>
  );
}
