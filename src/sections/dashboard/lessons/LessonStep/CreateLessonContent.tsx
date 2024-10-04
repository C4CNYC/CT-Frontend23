import React, { useRef, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import { useRouter } from 'next/router'

import { useSnackbar } from '@root/src/components/snackbar'
import { LessonContentType } from '@root/src/redux/enums/lesson-content-type.enum'
import {
  useCreateLessonContentMutation,
  useGetLessonContentQuery,
} from '@root/src/redux/services/manager/lesson-content-manager'
import { useAskAIMutation } from '@root/src/redux/services/manager/lessons-manager'
import { useTranslate } from '@root/src/utils/translateHelper'

type Props = {
  open: boolean
  onClose: () => void
  lessonId: string
  lessonName: string
}

export function CreateLessonContent({ open, onClose, lessonId, lessonName }: Props) {
  const { data: aiLessonContentTemplates, isLoading } = useGetLessonContentQuery({
    lessonId: '2e550800-0000-0000-0000-000000000000',
  })
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [askAI, { isLoading: AiLoading }] = useAskAIMutation()
  const translate = useTranslate()
  const [createLessonContent] = useCreateLessonContentMutation()
  const formRef = useRef<HTMLFormElement>(null)
  const [aiprompt, setAiprompt] = useState('')
  const [activeTab, setActiveTab] = useState(0)

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (formRef.current?.template.value === undefined) return
    let template = aiLessonContentTemplates?.find(
      (content) => content.id === formRef.current?.template.value
    )

    let content = ''
    let body = JSON.parse(template?.body ?? '').content
    let start = body.match(/Ai\ start/i)
    let end = body.match(/Ai\ end/i)
    if (start && end && start.index && end.index) {
      content = body.slice(start.index + 7, end.index) ?? ''
      let aiResponse = await askAI({
        prompt: `            
            change this \`\`\`${content}\`\`\`  according to ${aiprompt}
            Only code, no markup.
            `,
      })
      if ('error' in aiResponse && 'data' in aiResponse.error) {
        let newLesson =
          body.slice(0, start.index) +
          (aiResponse.error.data as string).slice(0, -3) +
          body.slice(end.index + 7)
        let { id: stepId } = await createLessonContent({
          lessonId,
          draft: false,
          active: true,
          title: 'AI Generated',
          body: JSON.stringify({ content: newLesson }),
          type: LessonContentType.Code,
        }).unwrap()
        router.push(
          `${router.pathname}?${new URLSearchParams({
            ...router.query,
            stepId,
          })}`,
          undefined,
          { shallow: true }
        )
        onClose()
      }
    }
  }

  const handleTabChange = (_event: any, newValue: number) => {
    setActiveTab(newValue)
  }
  function getLessonOptions() {
    if (!aiLessonContentTemplates || aiLessonContentTemplates.length === 0) {
      return []
    }
    return aiLessonContentTemplates.map((content) => (
      <option
        value={content.id}
        key={content.id}
      >
        {content.title}
      </option>
    ))
  }

  const createNewContent = async (): Promise<void> => {
    try {
      const { id: stepId } = await createLessonContent({
        lessonId,
        draft: false,
        active: true,
        title: translate('slide'),
        meta: { order: new Date().getTime() },
      }).unwrap()
      enqueueSnackbar(translate('messages_step_created'))
      if (false)
        router.push(
          `${router.pathname}?${new URLSearchParams({
            ...router.query,
            stepId: stepId,
          })}`,
          undefined,
          { shallow: true }
        )
    } catch (e: any) {
      enqueueSnackbar(translate('messages_cant_create_slide'), {
        variant: 'error',
      })
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Create Slide</DialogTitle>
      <DialogContent>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tab label='Normal Create' />
          <Tab label='Create with AI' />
        </Tabs>
        {activeTab === 0 && (
          <Button
            variant='contained'
            onClick={createNewContent}
          >
            Create Empty Slide
          </Button>
        )}
        {activeTab === 1 && aiLessonContentTemplates && (
          <div>
            <form ref={formRef}>
              <p>Create with AI content</p>
              <Select name='template'>
                {aiLessonContentTemplates.map((content, index) => (
                  <MenuItem
                    key={content.id}
                    value={content.id}
                  >
                    {content.title}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                value={aiprompt}
                onChange={(e) => setAiprompt(e.target.value)}
                placeholder='Prompt for AI'
              />
              <Button
                variant='contained'
                onClick={handleSubmit}
              >
                Create
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}
