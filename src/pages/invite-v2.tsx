import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useSnackbar } from '@/components'
import { LoadingScreen } from '@/components/loading-screen'
import { InviteStatus } from '@/redux/services/interfaces/inviteSystem.interface'

import { useAcceptInviteMutation } from '../redux/services/manager/invite-system'
import { PATH_AUTH } from '../routes/paths'

export default function InvitePage() {
  const router = useRouter()
  const { code } = router.query
  const { enqueueSnackbar } = useSnackbar()

  const [acceptInvite, { isLoading: isAccepting }] = useAcceptInviteMutation()

  useEffect(() => {
    if (!code) return

    const run = async () => {
      try {
        const res = await acceptInvite({ code: code as string }).unwrap()

        switch (res.status) {
          case InviteStatus.RegistrationNeeded:
            return router.replace(`${PATH_AUTH.onBoardingTeacher.launchCourse}?inviteCode=${code}`)

          case InviteStatus.LoginNeeded:
            return router.replace(`${PATH_AUTH.signIn}?inviteCode=${code}`)

          case InviteStatus.Success:
            if (res.schoolId) {
              localStorage.setItem('x-school-id', res.schoolId)
            }
            return router.replace(res.redirectUrl || '/')

          default:
            enqueueSnackbar('Invalid invite code', { variant: 'error' })
        }
      } catch (error) {
        enqueueSnackbar(
          typeof error === 'string'
            ? error
            : error instanceof Error && error.message
              ? error.message
              : 'Error',
          { variant: 'error' }
        )
      }
    }

    run()
  }, [code])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '100px' }}>
      <LoadingScreen text='Processing invite...' />
    </div>
  )
}
