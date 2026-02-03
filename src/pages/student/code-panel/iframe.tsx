import { useEffect, useState, useRef } from 'react'

import { useRouter } from 'next/router'

import {
  useGetLessonContentStudentQuery,
  useGetLessonStudentWithoutContentsQuery,
} from '@root/src/redux/services/manager/lesson-student'
import { jsonparse } from '@root/src/utils/jsonparse'

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
  let slide = lessonContent
    ? lessonContent.find((s) => s.id === router.query.slideId) || lessonContent[0]
    : null

  let pageReady = !!slide && !!lesson

  function getIframeContent() {
    let integrationsStyles = (lesson?.integrations || [])
      .map((integration) => integration.head)
      .filter(Boolean)
      .join('\n')
    // eslint-disable-next-line no-console
    console.log('GENERATE IFRAME CONTENT WITH INTEGRATIONS', slide)
    if (!slide || !slide.body) return ''
    return `
      <iframe
      id='lessonFrame'
      style="
        border: 0;
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;
        overflow: hidden;" >
        <link rel="stylesheet" href="/fonts/index.css" />
        <style>*{box-sizing:border-box}body{margin:0;padding:0;height:100%}</style>
        ${integrationsStyles}
        <body> Content Loading ...</body>
      </iframe>
    `
  }

  useEffect(() => {
    if (!pageReady) return
    setDoc(getIframeContent())
  }, [pageReady])

  useEffect(() => {
    if (!containerRef.current || !pageReady || !doc) return
    const iframe = containerRef.current
    const handleLoad = () => {
      ;[...iframe.querySelectorAll('script[data-integration]')].forEach((s) => s.remove())
      let integrationScripts: string[] = []

      let slideContent = jsonparse(slide?.body, {})
      integrationScripts.push(`
        globalThis.CTIFrame = {
          "slideContent":${JSON.stringify(slideContent)},
          "environments":${JSON.stringify(slide?.environments || [])},
          "validate":(t,v,type='checker-validation')=>{
            window.parent.postMessage({type,checkerId: t,valid: v},'*')
          },
          "nextSlide":(skip=false)=>{
            window.parent.postMessage({type:'nextSlide',skip},'*')
          },
          "prevSlide":()=>{
            window.parent.postMessage({type:'prevSlide'},'*')
          },
          "goToSlide":(slideIndex)=>{
            window.parent.postMessage({type:'goToSlide',slideIndex},'*')
          }
        }
      `)

      let slideEntegrations = (slide?.environments || [])
        .map((env) => env.script)
        .filter((e): e is string => !!e)
      integrationScripts = integrationScripts
        .concat(slideEntegrations)
        .concat((lesson?.integrations || []).map((i) => i.scripts).filter(Boolean))

      integrationScripts.push(
        `window.addEventListener("message",
        (e) => {
          let types = ["checker-validation", 'save-progress', 'app-ready', 'nextSlide', 'prevSlide']
          console.log("type", e.data.type)
          if (e.data && types.includes(e.data.type) ){
          console.log(window, window.parent, window == window.parent);
          if(window === window.parent )
            return;
          if(typeof e.data.vanisher == 'undefined')
            e.data.vanisher = 3; //
          e.data.vanisher--;
          if(e.data.vanisher <= 0)
            return; // prevent infinite loop
          console.log("Received validation message in iframe:", e.data);
          window.parent.postMessage(e.data, "*");
          }else if(e.data.type == 'load-progress'){
            document.querySelector('iframe').contentWindow.postMessage(e.data, "*");
          }
        });
        console.log("Integration script loaded in iframe");`
      )

      integrationScripts.forEach((integration) => {
        if (integration) {
          try {
            new Function(integration)()
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e)
          }
          /*
          const script = document.createElement('script')
          script.textContent = integration
          script.setAttribute('data-integration', 'true')
          document.body.appendChild(script)
          */
        }
      })
    }

    handleLoad()
  }, [doc, pageReady])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
      dangerouslySetInnerHTML={{ __html: doc }}
    />
  )
}
