import { useEffect, useMemo, useState } from 'react'

import { Button } from '@mui/material'
import { useTheme } from '@mui/system'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { Iconify } from '@/components/iconify'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useTranslate } from '@/utils/translateHelper'
import { setRoom } from '@root/src/redux/slices/code-editor-controller'
import { RootState, useDispatch, useSelector } from '@root/src/redux/store'

import { getLetsCodeBtnSx } from './constants'

interface ILetsCodeBtnProps {
  isMini?: boolean
}

interface StreamFile {
  _id: string
  name: string
  type: string
}

export interface StreamRoomDetailsResponse {
  _id: string
  course_id: string | undefined
  active_file: StreamFile | undefined
  lesson_id: string | undefined
  name: string
  slide_index: number | undefined
  unit_id: string | undefined
}

export default function LetsCodeBtn({ isMini }: ILetsCodeBtnProps) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const translate = useTranslate()
  const { push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const [roomId, setRoomId] = useState<string>()

  const user = useSelector((state: RootState) => state.global.user)

  const letsCodeBtnSx = useMemo(() => getLetsCodeBtnSx(theme, isMini), [theme, isMini])

  useEffect(() => {
    if (!user) return

    fetch(`${process.env.NEXT_PUBLIC_CODE_STREAM_API}/stream_room/details?owner_id=${user.id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data: StreamRoomDetailsResponse) => {
        dispatch(setRoom({ roomId: data._id }))
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
