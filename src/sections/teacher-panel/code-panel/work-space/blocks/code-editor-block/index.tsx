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
  // const { code, onChangeCode } = useWorkSpaceManager();

  const [EditorRef, setEditorRef] = useState(null);
  const [code, setCode] = useState("");

  const handleEditorDidMount = (editor: any): void => {
    setEditorRef(editor);
  };

  useEffect(() => {
    if (EditorRef) {
      const ydoc = new Y.Doc(); // create a ydoc

      let provider: WebrtcProvider | null = null;
      try {
        provider = new WebrtcProvider(
          "324b1163-2569-4193-b3b6-f353ccc6c076",
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

        new CodemirrorBinding(yText, EditorRef, awareness, {
          yUndoManager,
        });
      } catch (err) {
        alert("error in collaborating try refreshing or come back later !");
      }
      return () => {
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
          height: 100%;
        }
        .remote-caret {
          //import this css to your editor , it provides your editor a nice looking caret for each user
          position: absolute;
          border-left: black;
          border-left-style: solid;
          border-left-width: 2px;
        }

        .remote-caret>div {
          position: relative;
          top: -0.4em;
          font-size: 13px;
          background-color: rgb(250, 129, 0);
          font-family: serif;
          font-style: normal;
          font-weight: normal;
          line-height: normal;
          user-select: none;
          color: white;
          padding-left: 2px;
          padding-right: 2px;
          z-index: 3;
          border-radius: 20%;
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
