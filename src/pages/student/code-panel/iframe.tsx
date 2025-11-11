import { useEffect, useState, useRef } from 'react'

import { useRouter } from 'next/router'

import {
  useGetLessonContentStudentQuery,
  useGetLessonStudentWithoutContentsQuery,
} from '@root/src/redux/services/manager/lesson-student'

export default function Iframe() {
  const containerRef = useRef<HTMLIFrameElement>(null)
  const router = useRouter()
  const [doc, setDoc] = useState<string>('')

  const { data: lessonContent } = useGetLessonContentStudentQuery(
    { id: router.query.lessonId as string },
    { skip: !router.query.lessonId }
  )
  const { data: lesson } = useGetLessonStudentWithoutContentsQuery(
    { id: router.query.lessonId as string },
    { skip: !router.query.lessonId }
  )
  let slide = lessonContent ? lessonContent[0] : null

  function getIframeContent() {
    let integrationsStyles = (lesson?.integrations || [])
      .map((integration) => integration.head)
      .filter(Boolean)
      .join('\n')

    if (!slide || !slide.body) return ''
    let slideContent = JSON.parse(slide.body)
    return `
      <div>
        <link rel="stylesheet" href="/fonts/index.css" />
        <style>*{box-sizing:border-box}body{margin:0;padding:0;height:100%}</style>
        ${integrationsStyles}
        <script>let slideContent=${JSON.stringify(slideContent.content)}</script>
        <body>Empty IFrame</body>
      </div>
    `
  }

  useEffect(() => {
    if (!slide || slide.body == null) return
    setDoc(getIframeContent())
  }, [slide, lesson?.integrations])

  useEffect(() => {
    if (!containerRef.current) return
    // Remove old scripts
    Array.from(containerRef.current.querySelectorAll('script[data-integration]')).forEach((s) =>
      s.remove()
    )
    let integrationScripts = (lesson?.integrations || []).map((i) => i)
    integrationScripts.push({
      scripts: `window.addEventListener("message", 
      (e) => {   window.parent.postMessage(e.data, "*");}); `,
      name: 'iframe-communication',
      head: '',
      id: '1',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    })
    integrationScripts.forEach((integration) => {
      if (integration.scripts) {
        const script = document.createElement('script')
        script.textContent = integration.scripts
        script.setAttribute('data-integration', 'true')
        containerRef.current?.appendChild(script)
      }
    })
  }, [doc, lesson?.integrations])

  return (
    <iframe
      ref={containerRef}
      id='lessonFrame'
      style={{
        border: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
      dangerouslySetInnerHTML={{ __html: doc }}
    />
  )
}
