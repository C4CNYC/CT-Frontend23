/* eslint-disable no-new */
import RandomColor from "randomcolor";
import { useEffect, useState } from "react";
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";
import { ILessonContentValidation } from "src/redux/services/interfaces/lessonContentValidation.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { mapValidations } from "src/utils/validationMaping";
import { CodemirrorBinding } from "y-codemirror";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import BaseBlock from "../BaseBlock";
import Checkers from "./Checkers";
import "./EditorAddons";
import { useRouter } from "next/router";

interface ICodeEditorBlock {
  columns?: 1 | 2;
  validations: Array<ILessonContentValidation & BaseResponseInterface>;
  preloadedCode: string;
}

const CodeEditorBlock = ({
  columns = 1,
  validations,
  preloadedCode,
}: ICodeEditorBlock): React.ReactElement => {
  const { query } = useRouter();
  // const { code, onChangeCode } = useWorkSpaceManager();

  const [EditorRef, setEditorRef] = useState(null);
  const [code, setCode] = useState("");

  const handleEditorDidMount = (editor: any): void => {
    setEditorRef(editor);
  };

  useEffect(() => {
    console.log("roomId", query.studentId)
    if (EditorRef) {
      const ydoc = new Y.Doc(); // create a ydoc

      let provider: WebrtcProvider | null = null;
      try {
        provider = new WebrtcProvider(
          query.studentId as string,
          ydoc,
          {
            // Remember the other tab or
            // other user should be in same room for seeing real-time changes
            signaling: [
              "wss://signaling.yjs.dev",
              "wss://y-webrtc-signaling-eu.herokuapp.com",
              "wss://y-webrtc-signaling-us.herokuapp.com",
            ],
          }
        );

        const yText = ydoc.getText("codemirror");

        const yUndoManager = new Y.UndoManager(yText);

        const awareness = provider.awareness; // awareness is what makes other user aware about your actions

        const color = RandomColor(); // Provied any random color to be used for each user

        awareness.setLocalStateField("user", {
          name: "PASHA",
          color,
        });

        const test = new CodemirrorBinding(yText, EditorRef, awareness, {
          yUndoManager,
        });

        setInterval(() => {
          console.log({ test, provider });
        }, 120000);
      } catch (err) {
        alert("error in collaborating try refreshing or come back later !");
      }
      return () => {
        console.log("start disconection");
        if (provider) {
          provider.disconnect(); // We destroy doc we created and disconnect
          ydoc.destroy(); // the provider to stop propagting changes if user leaves editor
        }
      };
    }
  }, [EditorRef]);

  return (
    <BaseBlock columns={columns}>
      <style>
        {`
        .react-codemirror2 {
          height: 100%!important;
        }
        .remote-caret {
          top: 0;
          position: absolute!important;
          border-left: black!important;
          border-left-style: solid!important;
          border-left-width: 2px!important;
        }

        .remote-caret>div {
          position: relative!important;
          top: -0.4em!important;
          font-size: 13px!important;
          background-color: rgb(250, 129, 0)!important;
          font-family: serif!important;
          font-style: normal!important;
          font-weight: normal!important;
          line-height: normal!important;
          user-select: none!important;
          color: white!important;
          padding-left: 2px!important;
          padding-right: 2px!important;
          z-index: 3!important;
          border-radius: 20%!important;
        }`}
      </style>
      {validations?.length ? (
        <Checkers checkers={mapValidations(code, validations)} />
      ) : null}
      <CodeMirrorEditor
        onChange={(editor: any, data: any, value: any) => {
          setCode(value);
        }}
        autoScroll
        options={{
          mode: "text/javascript",
          theme: "monokai",
          lineWrapping: true,
          smartIndent: true,
          lineNumbers: true,
          foldGutter: true,
          tabSize: 2,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          autoCloseTags: true,
          // matchBrackets: true,
          autoCloseBrackets: true,
          extraKeys: {
            "Ctrl-Space": "autocomplete",
          },
        }}
        editorDidMount={(editor) => {
          console.log(editor);
          handleEditorDidMount(editor);
          editor.setSize("100vw", "100%");
        }}
      />
    </BaseBlock>
  );
};

export default CodeEditorBlock;
