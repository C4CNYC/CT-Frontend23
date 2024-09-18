import { useEffect, useState } from 'react'

import { Box } from '@mui/system'
import { Editor } from '@tinymce/tinymce-react'
import { useAtom } from 'jotai/react'

import { ResizerUi } from '@root/src/components'

import { lessonViewAtom } from '../lesson-atoms/lesson-view-atom'

import { EditorSelectorProps } from './EditorSelector'
import { StepPreview } from './StepPreview'

export function StepTinyMce(props: EditorSelectorProps) {
  const [editorContent, editorContentSet] = useState<string>('')
  const [{ isAllColumnsVisible }] = useAtom(lessonViewAtom)
  let content = JSON.parse(props.content)
  let initialValue = content?.content ?? content?.doc ?? ''
  useEffect(() => {
    let content = JSON.parse(props.content)
    editorContentSet(content?.content ?? content?.doc ?? '')
  }, [props.content])

  const integrationStyleRegex = /<style[^>]*?>([\s\S]*?)<\/style>/gms

  const integrationStyles = props.integrations.reduce((acc, curr) => {
    let matches
    while ((matches = integrationStyleRegex.exec(curr.head)) !== null) {
      acc += '\n' + matches[1]
    }
    return acc
  }, '')
  function onSave() {
    editorContentSet((editorContent) => {
      props.onSubmit(JSON.stringify({ content: editorContent }))
      return editorContent
    })
  }
  return (
    <>
      <ResizerUi
        split='vertical'
        defaultSize={isAllColumnsVisible ? '70%' : '100%'}
        allowResize={false}
      >
        <Box>
          <Editor
            apiKey='wjum8aydb5rkk8rllsf0bq34f95asla4z3qjo32ot4xndo9k'
            init={{
              plugins: [
                // Core editing features
                'anchor',
                'autolink',
                'charmap',
                'codesample',
                'emoticons',
                'image',
                'link',
                'lists',
                // 'media',
                'searchreplace',
                'table',
                'visualblocks',
                'wordcount',
                // Your account includes a free trial of TinyMCE premium features
                // Try the most popular premium features until Oct 1, 2024:
                'checklist',
                'mediaembed',
                'casechange',
                'export',
                'formatpainter',
                'pageembed',
                'a11ychecker',
                'tinymcespellchecker',
                'permanentpen',
                'powerpaste',
                'advtable',
                'advcode',
                'editimage',
                'advtemplate',
                'mentions',
                'tinycomments',
                'tableofcontents',
                'footnotes',
                'mergetags',
                'autocorrect',
                'typography',
                'inlinecss',
                'markdown',
                'autoresize',
              ],
              toolbar:
                'customSaveButton | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat ',
              setup: (editor) => {
                editor.ui.registry.addButton('customSaveButton', {
                  text: 'Save',
                  icon: 'save',
                  onAction: onSave,
                })
              },
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              content_style: integrationStyles,
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
            }}
            onEditorChange={(v, _e) => {
              editorContentSet(v)
            }}
            initialValue={initialValue}
          />
        </Box>
        <Box sx={{ bgcolor: props.bgColor, height: '100%' }}>
          <StepPreview
            integrations={props.integrations}
            staticValue={editorContent}
            key={editorContent}
          />
        </Box>
      </ResizerUi>
    </>
  )
}
