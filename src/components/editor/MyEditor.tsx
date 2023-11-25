import React, { useEffect } from "react";

import { Remirror, ThemeProvider, useRemirror } from "@remirror/react";
import { useS3Upload } from "next-s3-upload";
import { ImageAttributes, ImageExtension } from "remirror/extensions";
import "remirror/styles/all.css";

import { isJson } from "@utils";

import EditorToolbar from "./EditorToolbar";
import { extensions } from "./extensions-template";
import { useCreateMediaMutation } from "src/redux/services/manager/media-manager";

interface FileWithProgress {
  file: File;
  progress: SetProgress;
}
declare type SetProgress = (progress: number) => void;

export declare type DelayedPromiseCreator<Value> = (
  props: unknown
) => Promise<Value>;
declare type DelayedImage = DelayedPromiseCreator<ImageAttributes>;

interface Props {
  editable?: boolean;
  multimediaValue: string;
  setMultimediaValue?: (value: string) => void;
  onSubmit?: () => void;
  locked?: boolean;
}

function Editor({
  editable = true,
  locked,
  onSubmit,
  multimediaValue,
  setMultimediaValue,
}: Props): React.ReactElement {
  const { uploadToS3 } = useS3Upload();
  const [createMedia] = useCreateMediaMutation();
  const uploadHandler = (files: FileWithProgress[]): DelayedImage[] => {
    let completed = 0;
    const promises: Array<DelayedPromiseCreator<ImageAttributes>> = [];

    for (const { file, progress } of files) {
      promises.push(
        async () =>
          await new Promise<ImageAttributes>((resolve, reject) => {
            completed += 1;
            uploadToS3(file, {
              endpoint: {
                request: {
                  body: {},
                  headers: {
                    "x-tenant-id":
                      localStorage.getItem("tenantName") ?? "codetribe"
                  }
                }
              }
            }).then(({ url, key }) => {
              progress(completed / files.length);
              createMedia({
                url,
                name: file.name,
                size: file.size,
                type: 'image',
                acl: 'public',
              }).unwrap().then(() => {
                resolve({ src: url, fileName: key });
              })
            });
          })
      );
    }
    return promises;
  };

  // ToDo find better solution for type
  const newExtentions: any = [
    ...extensions(),
    new ImageExtension({ enableResizing: true, uploadHandler }),
  ];

  const { manager, state, setState, onChange } = useRemirror({
    extensions: newExtentions,
    content: isJson(multimediaValue) ? JSON.parse(multimediaValue)?.doc : "",
    stringHandler: "html",
  });

  useEffect(() => {
    if (!editable) {
      setState(
        isJson(multimediaValue) ? JSON.parse(multimediaValue) : multimediaValue
      );
    }
  }, [multimediaValue]);

  const saveContent = async (): Promise<void> => {
    if (onSubmit) onSubmit();
  };
  return (
    <ThemeProvider>
      <style>
        {`
          .remirror-theme .ProseMirror:active, .remirror-theme .ProseMirror:focus {
            box-shadow: none;
          }
          .remirror-editor-wrapper { padding: 0 }
          .remirror-theme .ProseMirror {
            scrollbar-width: none;
            box-shadow: none;
          }
          .remirror-editor.ProseMirror{
            scrollbar-width: none;
            overflow-y: scroll;
          }
          .ProseMirror.remirror-editor.remirror-a11y-dark{
            overflow: hidden;
          }
          .remirror-menu{
            right: 0;
          }
          .css-19j3oe6-MuiStack-root {
            overflow-x: visible !important;
            overflow-y: visible !important;
          }
          .remirror-theme ul {
            margin-left: 20px;
          }
          .remirror-theme ol {
            padding-left: 20px;
          }
          .remirror-theme [data-task-list] {
            margin-left: 30px;
          }
        `}
      </style>
      <Remirror
        editable={editable}
        placeholder="Start type here ..."
        manager={manager}
        state={state}
        // initialContent={state}
        autoFocus
        autoRender="end"
        onChange={(parameter) => {
          onChange(parameter);
          if (setMultimediaValue) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setMultimediaValue(parameter.state);
          }
        }}
      >
        {typeof locked === "undefined" ? (
          editable ? (
            <EditorToolbar saveContent={saveContent} />
          ) : null
        ) : (
          <EditorToolbar saveContent={saveContent} />
        )}
      </Remirror>
    </ThemeProvider>
  );
}
export const MyEditor = React.memo(Editor);
