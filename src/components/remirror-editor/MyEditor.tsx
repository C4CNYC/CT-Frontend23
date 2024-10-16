import React, { useEffect } from 'react'

import { prosemirrorNodeToHtml } from '@remirror/core-utils'
import { Remirror, OnChangeHTML, ThemeProvider, useRemirror } from '@remirror/react'
// import { useS3Upload } from "next-s3-upload";
import { ImageAttributes, ImageExtension } from 'remirror/extensions'
import 'remirror/styles/all.css'

import { useCreateMediaMutation } from '@/redux/services/manager/media-manager'
import { BaseResponseInterface, isJson } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'
import { IIntegration } from '@root/src/redux/services/interfaces/integration.interface'

import { ILessonContent } from '../../redux/services/interfaces/courseUnits.interface'

import EditorToolbar from './EditorToolbar'
import { extensions } from './extensions-template'

interface FileWithProgress {
  file: File
  progress: SetProgress
}
declare type SetProgress = (progress: number) => void

export declare type DelayedPromiseCreator<Value> = (props: unknown) => Promise<Value>
declare type DelayedImage = DelayedPromiseCreator<ImageAttributes>

interface Props {
  editable?: boolean
  multimediaValue: string
  setMultimediaValue: (value: string) => void
  integrations: IIntegration[]
  onSubmit?: () => void
  locked?: boolean
  data: ILessonContent & BaseResponseInterface
  lessonId: string
  bgColor: string
  setBgColor?: (bgColor: string) => void
}

function Editor({
  editable = true,
  locked,
  onSubmit,
  integrations,
  multimediaValue,
  setMultimediaValue,
  data,
  lessonId,
  bgColor,
  setBgColor,
}: Props): React.ReactElement {
  // const { uploadToS3 } = useS3Upload();
  const [createMedia] = useCreateMediaMutation()
  const translate = useTranslate()
  const uploadHandler = (files: FileWithProgress[]): DelayedImage[] => {
    let completed = 0
    const promises: Array<DelayedPromiseCreator<ImageAttributes>> = []

    for (const { file, progress } of files) {
      promises.push(
        async () =>
          await new Promise<ImageAttributes>((resolve, reject) => {
            completed += 1
            // @TODO S3 upload tmp disabled, needs to be moved to server side
            // console.error('S3 upload tmp disabled, needs to be moved to server side')
            alert('S3 upload tmp disabled, needs to be moved to server side')
            // uploadToS3(file, {
            //   endpoint: {
            //     request: {
            //       body: {},
            //       headers: {
            //         "x-tenant-id":
            //           localStorage.getItem("tenantName") ?? "codetribe",
            //       },
            //     },
            //   },
            // }).then(({ url, key }) => {
            //   progress(completed / files.length);
            //   createMedia({
            //     url,
            //     name: file.name,
            //     size: file.size,
            //     type: "image",
            //     acl: "public",
            //   })
            //     .unwrap()
            //     .then(() => {
            //       resolve({ src: url, fileName: key });
            //     });
            // });
          })
      )
    }
    return promises
  }

  // ToDo find better solution for type
  const newExtentions: any = [
    ...extensions(),
    new ImageExtension({ enableResizing: true, uploadHandler }),
  ]
  const integrationStyleRegex = /<style[^>]*?>\s*[^{}]*?\{([^}]*)\}[^<]*?<\/style>/g

  const integrationStyles = integrations.reduce((acc, curr) => {
    let matches
    while ((matches = integrationStyleRegex.exec(curr.head)) !== null) {
      acc += '\n' + matches[1]
    }
    return acc
  }, '')

  const { manager, state, setState, onChange } = useRemirror({
    extensions: newExtentions,
    content: isJson(multimediaValue)
      ? JSON.parse(multimediaValue)?.doc ?? JSON.parse(multimediaValue)?.content ?? ''
      : '',
    stringHandler: 'html',
  })

  useEffect(() => {
    if (!editable) {
      setState(isJson(multimediaValue) ? JSON.parse(multimediaValue) : multimediaValue)
    }
  }, [multimediaValue])

  const saveContent = async (): Promise<void> => {
    if (onSubmit) onSubmit()
  }

  return (
    <ThemeProvider>
      <style>
        {`
          .remirror-theme .ProseMirror:active, .remirror-theme .ProseMirror:focus {
            box-shadow: none;
            background-color: ${bgColor};
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
          .remirror-theme code {
            border: .1rem solid rgba(0, 0, 0, .1);
            border-radius: 0.4rem;
            font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-size: 100%;
            padding: 0.1rem;
            vertical-align: middle;
          }
          ${integrationStyles}
        `}
      </style>
      <Remirror
        editable={editable}
        placeholder={translate('start_type_here')}
        manager={manager}
        state={state}
        // initialContent={state}
        autoFocus={editable}
        autoRender='end'
        onChange={(parameter) => {
          onChange(parameter)
          setMultimediaValue(prosemirrorNodeToHtml(parameter.state.doc))
          // if (setMultimediaValue) {
          //   // @ts-expect-error
          //   setMultimediaValue(parameter.state)
          // }
        }}
      >
        {typeof locked === 'undefined' ? (
          editable ? (
            <EditorToolbar
              saveContent={saveContent}
              data={data}
              lessonId={lessonId}
              bgColor={bgColor}
            />
          ) : null
        ) : (
          <EditorToolbar
            saveContent={saveContent}
            data={data}
            lessonId={lessonId}
            bgColor={bgColor}
            setBgColor={setBgColor}
          />
        )}
        <OnChangeHTML
          onChange={(html) => {
            setMultimediaValue(html)
          }}
        />
      </Remirror>
    </ThemeProvider>
  )
}
export const MyEditor = React.memo(Editor)
