import { ReactElement, useEffect, useRef, useState } from 'react'

import _ from 'lodash'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'

import { isUserLoggedIn } from '@root/src/auth/utils'
import { useSetLastWorkspaceQueryMutation } from '@root/src/redux/services/manager/activity-student'
import CodePanelLayout from '@root/src/sections/code-panel'

const buildQueryFromObject = (query: Record<string, string>) => {
  return Object.keys(_.omitBy(query, (value) => !value))
    .map((key) => `${key}=${query[key]}`)
    .join('&')
}

export default function CodePanelContainer(): ReactElement | null {
  const router = useRouter()
  const workspaceRef = useRef<{ query: string }>({ query: '' })
  const [render, setRender] = useState(false)

  const [updateWorkspaceActivity] = useSetLastWorkspaceQueryMutation()

  const verifyUserAuthenticationStatus = async () => {
    try {
      if (isUserLoggedIn()) return null
    } catch (error: any) {
      enqueueSnackbar(`${error?.message}`, { variant: 'error', autoHideDuration: 1000 })
    } finally {
      setRender(true)
    }
  }

  useEffect(() => {
    const { courseId, unitId, lessonId } = router.query
    const query = `?${buildQueryFromObject({
      courseId: (courseId as string) || '',
      unitId: (unitId as string) || '',
      lessonId: (lessonId as string) || '',
    })}`

    if (workspaceRef.current.query === query || (!lessonId && !unitId && !courseId)) return

    workspaceRef.current.query = query
    updateWorkspaceActivity({ query })
  }, [router])

  useEffect(() => {
    verifyUserAuthenticationStatus()
  }, [])

  if (render) return <CodePanelLayout />
  else return null
}
