import { useEffect, useRef, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { useRouter } from 'next/router'

import { useBoolean } from '../hooks/useBoolean'
import { HomePageType } from '../redux/services/enums/administration.enum'
import { useGetOrgHomePageQuery } from '../redux/services/public/tribe-public'
import { PATH_AUTH } from '../routes/paths'
import { STUDENT_PATH_DASHBOARD } from '../routes/student.paths'
import AIGenerateStepper from '../sections/on-boarding-register/teacher/ai-generete-stepper'

const SLUG_PATTERN = /https?:\/\/([^.:/]+)/

export default function AiGeneratePage(): React.ReactElement {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [prompt, promptSet] = useState('')
  const [open, setOpen, setClose] = useBoolean(false)
  const [slug, setSlug] = useState<null | string>(null)
  const [page, setPage] = useState<string>('')

  const { data } = useGetOrgHomePageQuery({ slug: slug as string }, { skip: !slug })

  useEffect(() => {
    if (containerRef.current) {
      // Query the injected HTML to find the field
      const elPropmt = containerRef.current.querySelector('#prompt') as HTMLInputElement
      const elGenerate = containerRef.current.querySelector('#generate') as HTMLButtonElement
      if (elPropmt && elGenerate) {
        elPropmt.onchange = (e) => {
          let t = e.target as HTMLInputElement
          promptSet(t?.value)
        }
        elGenerate.onclick = setOpen
      }
    }

    const origin =
      typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
    const originSlug = origin.match(SLUG_PATTERN)

    if (originSlug) {
      setSlug(originSlug[1])
    }
  }, [])

  useEffect(() => {
    if (!data?.home_page_type) return

    switch (data.home_page_type) {
      case HomePageType.Authorization: {
        router.push(PATH_AUTH.onBoardingStudent)
        break
      }
      case HomePageType.Default: {
        router.push(PATH_AUTH.onBoardingStudent)
        break
      }
      case HomePageType.Custom: {
        setPage(data.home_page_body ?? '')
        localStorage.setItem('tenantName', slug ?? 'codetribe')
        break
      }
      case HomePageType.Catalog: {
        router.push(STUDENT_PATH_DASHBOARD.courses.root)
        break
      }
      default:
        router.push(PATH_AUTH.onBoardingStudent)
    }
  }, [data])

  if (!page) return <></>

  return (
    <>
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: page }}
      ></div>

      <Dialog
        open={open}
        fullWidth
        maxWidth='md'
        onClose={setClose}
      >
        <DialogContent sx={{ p: 2 }}>
          <AIGenerateStepper
            isModal
            closeModal={setClose}
            passedValues={{ RpromptR: prompt }}
            props={{ activeStep: 1 }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
