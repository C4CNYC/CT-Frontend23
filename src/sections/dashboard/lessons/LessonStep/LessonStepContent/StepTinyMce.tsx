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
  let content = props.content?.length ? JSON.parse(props.content) : ''
  let initialValue = content?.content ?? content?.doc ?? ''
  useEffect(() => {
    if (props.content?.length) {
      let content = JSON.parse(props.content)
      editorContentSet(content?.content ?? content?.doc)
    } else {
      editorContentSet('')
    }
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
          <style>{`.tox-promotion{filter:opacity(0)}`}</style>
          <Editor
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
                // 'checklist',
                // 'mediaembed',
                // 'casechange',
                // 'export',
                // 'formatpainter',
                // 'pageembed',
                // 'a11ychecker',
                // 'tinymcespellchecker',
                // 'permanentpen',
                // 'powerpaste',
                // 'advtable',
                // 'advcode',
                // 'editimage',
                // 'advtemplate',
                // 'mentions',
                // 'tinycomments',
                // 'tableofcontents',
                // 'footnotes',
                // 'mergetags',
                // 'autocorrect',
                // 'typography',
                // 'inlinecss',
                // 'markdown',
                'autoresize',
              ],
              toolbar:
                'customSaveButton | addClassPopup |  undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat ',
              setup: (editor) => {
                editor.ui.registry.addButton('customSaveButton', {
                  text: 'Save',
                  icon: 'save',
                  onAction: onSave,
                })

                editor.ui.registry.addButton('addClassPopup', {
                  text: 'Add Class',
                  onAction: function () {
                    const selectedNode = editor.selection.getNode()
                    const existingClasses = selectedNode ? selectedNode.className.split(/\s+/) : []

                    // Map existing classes to dialog defaults
                    const dialogDefaults = {
                      fontSize: existingClasses.find((c) => c.startsWith('font-')) || '',
                      color: existingClasses.find((c) => c.startsWith('text-')) || '',
                      borderWidth:
                        existingClasses.find(
                          (c) =>
                            c.startsWith('border-') &&
                            !c.includes('round') &&
                            !c.includes('pointy') &&
                            !c.includes('circle')
                        ) || '',
                      borderStyle:
                        existingClasses.find(
                          (c) =>
                            c.startsWith('border-') &&
                            (c.includes('round') || c.includes('pointy') || c.includes('circle'))
                        ) || '',
                      backgroundColor: existingClasses.find((c) => c.startsWith('bg-')) || '',
                      custom: '',
                      padding: existingClasses.find((c) => c.startsWith('padding-')) || '',
                      margin: existingClasses.find((c) => c.startsWith('margin-')) || '',
                    }
                    dialogDefaults.custom = existingClasses
                      .filter((existing) =>
                        Object.keys(dialogDefaults).every(
                          (dialogDefaultKeys) =>
                            existing !==
                            dialogDefaults[dialogDefaultKeys as keyof typeof dialogDefaults]
                        )
                      )
                      .join(' ')
                    // Create the dialog
                    editor.windowManager.open({
                      title: 'Insert Class',
                      body: {
                        type: 'panel',
                        items: [
                          {
                            type: 'selectbox',
                            name: 'fontSize',
                            label: 'Font Size',
                            items: [
                              { text: 'Default', value: '' },
                              { text: 'Small', value: 'font-small' },
                              { text: 'Normal', value: 'font-normal' },
                              { text: 'Large', value: 'font-large' },
                              { text: 'XX-Large', value: 'font-xxlarge' },
                            ],
                          },
                          {
                            type: 'selectbox',
                            name: 'color',
                            label: 'Text Color',
                            items: [
                              { text: 'Default', value: '' },
                              { text: 'Red', value: 'text-red' },
                              { text: 'Blue', value: 'text-blue' },
                              { text: 'Green', value: 'text-green' },
                              { text: 'Yellow', value: 'text-yellow' },
                              { text: 'Purple', value: 'text-purple' },
                              { text: 'Black', value: 'text-black' },
                              { text: 'White', value: 'text-white' },
                              { text: 'Orange', value: 'text-orange' },
                              { text: 'Gray', value: 'text-gray' },
                              { text: 'Brown', value: 'text-brown' },
                            ],
                          },
                          {
                            type: 'selectbox',
                            name: 'borderWidth',
                            label: 'Border Width',
                            items: [
                              { text: 'None', value: '' },
                              { text: 'Thin', value: 'border-thin' },
                              { text: 'Bold', value: 'border-bold' },
                            ],
                          },
                          {
                            type: 'selectbox',
                            name: 'borderStyle',
                            label: 'Border Style',
                            items: [
                              { text: 'None', value: '' },
                              { text: 'Pointy', value: 'border-pointy' },
                              { text: 'Round', value: 'border-round' },
                              { text: 'Circle', value: 'border-circle' },
                            ],
                          },
                          {
                            type: 'selectbox',
                            name: 'backgroundColor',
                            label: 'Background Color',
                            items: [
                              { text: 'None', value: '' },
                              { text: 'Red', value: 'bg-red' },
                              { text: 'Blue', value: 'bg-blue' },
                              { text: 'Green', value: 'bg-green' },
                              { text: 'Yellow', value: 'bg-yellow' },
                              { text: 'Purple', value: 'bg-purple' },
                              { text: 'Black', value: 'bg-black' },
                              { text: 'White', value: 'bg-white' },
                              { text: 'Orange', value: 'bg-orange' },
                              { text: 'Gray', value: 'bg-gray' },
                              { text: 'Brown', value: 'bg-brown' },
                            ],
                          },
                          {
                            type: 'selectbox',
                            name: 'padding',
                            label: 'Padding',
                            items: [
                              { text: 'None', value: '' },
                              { text: 'Small', value: 'padding-small' },
                              { text: 'Normal', value: 'padding-normal' },
                              { text: 'Large', value: 'padding-large' },
                              { text: 'XX-Large', value: 'padding-xxlarge' },
                            ],
                          },
                          {
                            type: 'selectbox',
                            name: 'margin',
                            label: 'Margin',
                            items: [
                              { text: 'None', value: '' },
                              { text: 'Small', value: 'margin-small' },
                              { text: 'Normal', value: 'margin-normal' },
                              { text: 'Large', value: 'margin-large' },
                              { text: 'XX-Large', value: 'margin-xxlarge' },
                            ],
                          },
                          {
                            type: 'input',
                            name: 'custom',
                            label: 'Custom',
                          },
                        ],
                      },
                      initialData: dialogDefaults,
                      buttons: [
                        {
                          type: 'cancel',
                          text: 'Cancel',
                        },
                        {
                          type: 'submit',
                          text: 'Insert',
                          primary: true,
                        },
                      ],
                      onSubmit: function (api) {
                        const data = api.getData()

                        // Construct class string based on user selection
                        const classes = [
                          data.fontSize,
                          data.color,
                          data.borderWidth,
                          data.borderStyle,
                          data.backgroundColor,
                        ]
                          .filter(Boolean)
                          .join(' ')

                        // Apply the classes to the selected element
                        const selectedNode = editor.selection.getNode()
                        if (selectedNode && selectedNode.nodeName === 'DIV') {
                          selectedNode.className = classes // Update the class attribute
                        }

                        // Close the dialog
                        api.close()
                      },
                    })
                  },
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
            licenseKey='gpl'
            //tinymceScriptSrc='https://cdn.jsdelivr.net/npm/tinymce@7.3.0/tinymce.min.js'
            tinymceScriptSrc='/tinymce/tinymce.min.js'
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
