import { Box, IconButton, Stack } from '@mui/material'
import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

import { Logo } from '@/components/logo'
import AccountPopover from '@/layouts/dashboard/header/AccountPopover'

import { lessonViewAtom } from '../lesson-atoms/lesson-view-atom'

import ViewTumbler from './ViewTumbler'

export default function LessonTopBar({
  closeThis,
}: {
  closeThis?: () => void
}): React.ReactElement {
  const [
    { isAllColumnsVisible, isFullScreenView, fullScreenClose, fullScreenOpen },
    setGlobalCodePanel,
  ] = useAtom(lessonViewAtom)

  const { push, pathname } = useRouter()

  const onClose = () => {
    closeThis ? closeThis() : push(`${pathname}?lessonId=`, undefined, { shallow: true })
  }

  return (
    <Stack
      direction='row'
      sx={{
        py: 1,
        px: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        maxHeight: '48px',
        boxShadow: 2,
        zIndex: 1,
        position: 'relative',
      }}
    >
      <Logo />
      <Stack
        direction='row'
        gap={2}
      >
        <Box
          display='flex'
          alignItems='center'
        >
          <AccountPopover />
        </Box>
        <ViewTumbler
          fullScreenOpen={fullScreenOpen}
          fullScreenClose={fullScreenClose}
          fullScreenView={isFullScreenView}
          allColumnsVisible={isAllColumnsVisible}
          onChangeColumnVisability={(value) => {
            setGlobalCodePanel((prev) => ({
              ...prev,
              isAllColumnsVisible: value,
            }))
          }}
          onChangeSreenView={(value) => {
            setGlobalCodePanel((prev) => ({
              ...prev,
              isFullScreenView: value,
            }))
          }}
        />

        <Box
          display='flex'
          alignItems='center'
        >
          <IconButton
            onClick={onClose}
            sx={{ p: 0, width: 40, height: 40 }}
          >
            <IoCloseOutline
              size={40}
              color='#A6A6A6'
            />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  )
}
