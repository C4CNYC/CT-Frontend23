import { Button, ToggleButton, Tooltip } from '@mui/material'
import { FiSettings } from '@react-icons/all-files/fi/FiSettings'
import { GrTest } from '@react-icons/all-files/gr/GrTest'
import { IoCode } from '@react-icons/all-files/io5/IoCode'
import { LuCheckCircle } from '@react-icons/all-files/lu/LuCheckCircle'
import { MdOutlineTipsAndUpdates } from '@react-icons/all-files/md/MdOutlineTipsAndUpdates'
import { TbPhoto } from '@react-icons/all-files/tb/TbPhoto'

import { MediaModal } from '@/sections/dashboard/medias/MediaModal'
import { useTranslate } from '@/utils/translateHelper'

export const BUTTONS_STYLES = {
  width: '100%',
  maxHeight: '40px',
  color: '#364954',
  gap: 1,
  textTransform: 'capitalize',
  justifyContent: 'start',
  pl: 2,
  fontWeight: 400,
}

export function TipsBtn(): React.ReactElement {
  const translate = useTranslate()

  return (
    <Button sx={BUTTONS_STYLES}>
      <MdOutlineTipsAndUpdates size={20} /> {translate('tips')}
    </Button>
  )
}
export function ChallengeBtn(): React.ReactElement {
  const translate = useTranslate()

  return (
    <Button sx={BUTTONS_STYLES}>
      <GrTest size={20} /> Tests
    </Button>
  )
}
export function SettingsBtn(): React.ReactElement {
  const translate = useTranslate()

  return (
    <Button sx={BUTTONS_STYLES}>
      <FiSettings size={20} />
      {translate('settings')}
    </Button>
  )
}
export function MediaBtn(): React.ReactElement {
  const translate = useTranslate()

  return (
    <MediaModal>
      <Tooltip title='Media'>
        <ToggleButton
          value='left'
          key='left'
          sx={{ py: '4px', px: '10px' }}
        >
          <TbPhoto size={20} />
        </ToggleButton>
      </Tooltip>
    </MediaModal>
  )
}

export function SolutionBtn(): React.ReactElement {
  return (
    <Button sx={BUTTONS_STYLES}>
      <LuCheckCircle size={20} />
      Solution
    </Button>
  )
}

export function PreCodeBtn(): React.ReactElement {
  return (
    <Button sx={BUTTONS_STYLES}>
      <IoCode size={20} />
      Pre-code
    </Button>
  )
}
