import { useState } from "react";
import SplitPane from "react-split-pane";
import LessonContentBrowser from "./LessonContentBrowser";
import LessonContentMultimedia from "./LessonContentMultimedia";
import StepContentEditor from "./StepContentEditor/StepContentEditor";

export default function LessonStepContent(): React.ReactElement {
  const [userCode, setUserCode] = useState("");
  const [contentValue, setContentValue] = useState("multimedia");
  const [multimediaValue, setMultimediaValue] = useState("");

  return (
    <>
      <style>
        {`
          .Resizer {
            background: #000;
            opacity: 0.2;
            z-index: 1;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -moz-background-clip: padding;
            -webkit-background-clip: padding;
            background-clip: padding-box;
          }
          
          .Resizer:hover {
            -webkit-transition: all 2s ease;
            transition: all 2s ease;
          }
          
          .Resizer.horizontal {
            height: 11px;
            margin: -5px 0;
            border-top: 5px solid rgba(255, 255, 255, 0);
            border-bottom: 5px solid rgba(255, 255, 255, 0);
            cursor: row-resize;
            width: 100%;
          }
          
          .Resizer.horizontal:hover {
            border-top: 5px solid rgba(0, 0, 0, 0.5);
            border-bottom: 5px solid rgba(0, 0, 0, 0.5);
          }
          
          .Resizer.vertical {
            width: 11px;
            margin: 0 -5px;
            border-left: 5px solid rgba(255, 255, 255, 0);
            border-right: 5px solid rgba(255, 255, 255, 0);
            cursor: col-resize;
            position: initial;
          }
          
          .Resizer.vertical:hover {
            border-left: 5px solid rgba(0, 0, 0, 0.5);
            border-right: 5px solid rgba(0, 0, 0, 0.5);
          }
          .Resizer.disabled {
            cursor: not-allowed;
          }
          .Resizer.disabled:hover {
            border-color: transparent;
          }
        `}
      </style>
      <SplitPane
        split="vertical"
        minSize={500}
        maxSize={-100}
        defaultSize={"50%"}
      >
        <StepContentEditor
          code={userCode}
          setUserCode={setUserCode}
          contentValue={contentValue}
          setContentValue={setContentValue}
          multimediaValue={multimediaValue}
          setMultimediaValue={setMultimediaValue}
        />
        {contentValue === "multimedia" ? (
          <LessonContentMultimedia multimediaValue={multimediaValue} />
        ) : (
          <LessonContentBrowser code={userCode} />
        )}
      </SplitPane>
    </>
  );
}
