import { useEffect } from 'react'

import { useRouter } from 'next/router'

import GuestGuard from '@/auth/GuestGuard'
import { useGetPublicTribeQuery } from '@/redux/services/public/tribe-public'
import { useSelector } from '@/redux/store'
import JoinTribeModal from '@/sections/join-tribe/JoinTribeModal'
import { LoadingScreen } from '@root/src/components'

export default function JoinTribe(): React.ReactElement {
  const user = useSelector((state) => state.global.user)
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

  if (isLoading || !data) {
    return <LoadingScreen />
  }

  if (user) {
    ;<JoinTribeModal
      classInfo={data}
      isSignIn={true}
    />
  }

  return (
    <GuestGuard>
      <JoinTribeModal classInfo={data} />
    </GuestGuard>
  )
}
