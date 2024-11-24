import React, { useState } from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { Stack } from '@mui/system'
import { useRouter } from 'next/router'

import { useSnackbar } from '@root/src/components/snackbar'
import { LessonContentType } from '@root/src/redux/enums/lesson-content-type.enum'
import {
  useCreateLessonContentMutation,
  useGetLessonContentQuery,
} from '@root/src/redux/services/manager/lesson-content-manager'
import { useAskAIMutation } from '@root/src/redux/services/manager/lessons-manager'
import { stripQuotesFromAiResponse } from '@root/src/utils/stripQuotesFromAiResponse'
import { useTranslate } from '@root/src/utils/translateHelper'

import { SlideType } from './CreateSlideTypes'
import { SlideSelectList } from './SlidesSelectList'

type Props = {
  open: boolean
  onClose: () => void
  lessonId: string
  lessonName: string
}

export function WithAIDialog({ open, onClose, lessonId, lessonName }: Props) {
  const { data: aiLessonContentTemplates, isLoading } = useGetLessonContentQuery({
    lessonId: '2e550800-0000-0000-0000-000000000000',
  })
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [askAI, { isLoading: AiLoading }] = useAskAIMutation()
  const translate = useTranslate()
  const [createLessonContent] = useCreateLessonContentMutation()
  const [aiprompt, setAiprompt] = useState('')
  const [selectedSlide, setSelectedSlide] = useState<SlideType | null>(null)

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (!selectedSlide)
      return enqueueSnackbar(translate('messages_select_template'), {
        variant: 'error',
      })

    let content = ''
    let body = JSON.parse(selectedSlide.body).content
    let start = body.match(/Ai\ start/i)
    let end = body.match(/Ai\ end/i)
    if (start && end && start.index && end.index) {
      content = body.slice(start.index + 8, end.index) ?? ''
      let aiResponse = await askAI({
        prompt: `
            change this content:  \`\`\`${content}\`\`\`  
            according to \`${aiprompt}\`
            Return in exact format of content
            `,
        add_response_format: 'false',
      })

      if ('error' in aiResponse && 'data' in aiResponse.error) {
        let newLesson =
          body.slice(0, start.index - 3) +
          stripQuotesFromAiResponse(aiResponse.error.data as string) +
          body.slice(end.index + 7)

        let { id: stepId } = await createLessonContent({
          lessonId,
          draft: false,
          active: true,
          description: aiprompt,
          title: selectedSlide.title,
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='lg'
    >
      <DialogTitle>Create Slide</DialogTitle>
      <DialogContent>
        {aiLessonContentTemplates && (
          <Box
            display='flex'
            flexDirection='column'
            gap={4}
            p={2}
          >
            <div style={{ display: 'block', overflow: 'auto', height: '60vh' }}>
              <SlideSelectList
                lessonContentTemplates={aiLessonContentTemplates}
                selectedSlide={selectedSlide}
                setSelectedSlide={(slide) => setSelectedSlide(slide as SlideType)}
              />
            </div>
            {!selectedSlide ? (
              <p>Select a template</p>
            ) : (
              <Stack
                spacing={2}
                direction='row'
                flexGrow='0'
              >
                <TextField
                  value={aiprompt}
                  onChange={(e) => setAiprompt(e.target.value)}
                  placeholder='Prompt for AI'
                  fullWidth={true}
                />
                <Button
                  variant='contained'
                  onClick={handleSubmit}
                  disabled={!selectedSlide}
                >
                  Create
                </Button>
              </Stack>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}
