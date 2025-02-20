import { ReactElement, useEffect, useRef } from 'react'

import { omitBy } from 'lodash'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { useSelector } from '@/redux/store'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import { useSetLastWorkspaceQueryMutation } from '@root/src/redux/services/manager/activity-student'

const CodePanelLayout = dynamic(async () => await import('@root/src/sections/code-panel'), {
  ssr: false,
})

const buildQueryFromObject = (query: Record<string, string>) => {
  return Object.keys(omitBy(query, (value) => !value))
    .map((key) => `${key}=${query[key]}`)
    .join('&')
}

export default function CodePanelContainer(): ReactElement | null {
  const router = useRouter()
  const { isInitialized } = useAuthContext()
  const workspaceRef = useRef<{ query: string }>({ query: '' })
  const profile = useSelector((state) => state.global.user)

  const [updateWorkspaceActivity] = useSetLastWorkspaceQueryMutation()

  useEffect(() => {
    const { courseId, unitId, lessonId } = router.query
    const query = `?${buildQueryFromObject({
      courseId: (courseId as string) || '',
      unitId: (unitId as string) || '',
      lessonId: (lessonId as string) || '',
    })}`

    if (workspaceRef.current.query === query || (!lessonId && !unitId && !courseId)) return

    workspaceRef.current.query = query
    if (profile) {
      updateWorkspaceActivity({ query })
    }
  }, [router, profile])

  if (!isInitialized) return null
  return <CodePanelLayout />
}
