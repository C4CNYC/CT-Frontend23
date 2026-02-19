import { useEffect } from 'react'

import { useRouter } from 'next/router'

import GuestGuard from '@/auth/GuestGuard'
import { useAuthContext } from '@/auth/useAuthContext'
import { LoadingScreen } from '@/components'
import { useGetPublicTribeQuery } from '@/redux/services/public/tribe-public'
import JoinTribeModal from '@/sections/join-tribe/JoinTribeModal'

export default function JoinTribe(): React.ReactElement {
  const { isAuthenticated, isInitialized } = useAuthContext()
  const { query } = useRouter()
  const { data, isLoading } = useGetPublicTribeQuery(
    {
      joinCode: query.id as string,
    },
    { skip: !query.id }
  )

  useEffect(() => {
    if (query.id && data) {
      localStorage.setItem('JOIN_TRIBE', JSON.stringify({ joinCode: query.id, classId: data.id }))
    }
  }, [query.id, data])

  if (isLoading || !data || !isInitialized) {
    return <LoadingScreen />
  }

  if (isAuthenticated) {
    return (
      <JoinTribeModal
        classInfo={data}
        isSignIn={true}
      />
    )
  }

  return (
    <GuestGuard>
      <JoinTribeModal classInfo={data} />
    </GuestGuard>
  )
}
