import { useEffect, useMemo, useState } from 'react'

import { Button } from '@mui/material'
import { useTheme } from '@mui/system'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { Iconify } from '@/components/iconify'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useTranslate } from '@/utils/translateHelper'
import { RootState, useSelector } from '@root/src/redux/store'

import { getLetsCodeBtnSx } from './constants'

interface ILetsCodeBtnProps {
  isMini?: boolean
}

export default function LetsCodeBtn({ isMini }: ILetsCodeBtnProps) {
  const user = useSelector((state: RootState) => state.global.user)
  const [roomId, setRoomId] = useState<string>()
  const translate = useTranslate()
  const { push, query } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const letsCodeBtnSx = useMemo(() => getLetsCodeBtnSx(theme, isMini), [theme, isMini])

  useEffect(() => {
    if (!user) return

    fetch(`${process.env.NEXT_PUBLIC_CODE_STREAM_API}/stream_room/details?owner_id=${user.id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setRoomId(data._id)
      })
  }, [user])

  return (
    <Button
      onClick={() => {
        // Now go to first quest
        if (!roomId) {
          enqueueSnackbar('No lesson to code', { variant: 'warning' })
        } else {
          push(STUDENT_PATH_DASHBOARD.codeStream.workSpace(roomId))
        }
      }}
      variant='contained'
      sx={letsCodeBtnSx}
    >
      {!isMini ? `👩‍💻 ${translate('sidebar_menu_code_btn')}` : ''}

      {isMini ? (
        <Iconify
          icon='mingcute:code-fill'
          width={25}
          height={25}
        />
      ) : (
        <Iconify
          icon='octicon:chevron-right-12'
          width={25}
          height={25}
        />
      )}
    </Button>
  )
}
