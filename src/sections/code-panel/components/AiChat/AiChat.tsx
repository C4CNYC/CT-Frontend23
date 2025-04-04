import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { RootState } from '@/redux/store'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import { useN8nRequest } from '@root/src/redux/services/manager/ai-services'

import { useLessonManager } from '../../lib/LessonManagerContext'

let actions = [
  { type: 'lesson', name: 'Lesson Modify' },
  { type: 'slide', name: 'Translate Slide' },
  { type: 'slide', name: 'Add New Slide' },
  { type: 'slide', name: 'Add Validations to Slide' },
  { type: 'slide', name: 'Add Hints to Slide' },
  { type: 'slide', name: 'Add Solution to Slide' },
]
type OptionsType = {
  type: string
  action: string
  shortTitle: string
  description: string
}

export const AiChat = () => {
  const { user } = useAuthContext()
  const [humanChat, setHumanChat] = useState('')
  const [options, setOptions] = useState<OptionsType[]>([])
  const { slideId, lessonId } = useSelector((state: RootState) => ({
    slideId: state.codePanelGlobal.slideId,
    lessonId: state.codePanelGlobal.lessonId,
  }))
  const { lesson, lessonContent } = useLessonManager()
  const ask = useN8nRequest()
  const askSuggestions = (slide: any) =>
    ask(
      JSON.stringify({
        options: actions,
        slide,
        lesson: {
          id: lesson?.id,
          meta: lesson?.meta,
          name: lesson?.name,
          description: lesson?.description,
        },
      }),
      'slideSuggestions'
    )
  useEffect(() => {
    askSuggestions(lessonContent?.find((c) => c.id === slideId)).then((res) =>
      'data' in res ? setOptions(res?.data as unknown as OptionsType[]) : null
    )
  }, [slideId])

  if (!lesson || !user || lesson.userId !== user.id) return null

  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: '50px',
        left: '100px',
        borderRadius: '.5rem',
      }}
    >
      <h2>AiChat</h2>
      {options ? (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {options.map((o, i) => (
            <button
              style={{ margin: '5px', padding: '5px' }}
              key={i}
              onClick={() => {
                setHumanChat(o.description)
              }}
            >
              {o.shortTitle}
            </button>
          ))}
        </div>
      ) : null}
      <textarea
        style={{ width: '100%', height: '100px' }}
        value={humanChat}
        onChange={(e) => setHumanChat(e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}></div>
    </div>
  )
}
