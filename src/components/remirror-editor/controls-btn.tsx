import { Button, ToggleButton, Tooltip } from '@mui/material'
import { FiSettings } from '@react-icons/all-files/fi/FiSettings'
import { GrTest } from '@react-icons/all-files/gr/GrTest'
import { IoCode } from '@react-icons/all-files/io5/IoCode'
import { LuCheckCircle } from '@react-icons/all-files/lu/LuCheckCircle'
import { MdOutlineTipsAndUpdates } from '@react-icons/all-files/md/MdOutlineTipsAndUpdates'
import { TbPhoto } from '@react-icons/all-files/tb/TbPhoto'
import { useCommands } from '@remirror/react'

import { MediaModal } from '@/sections/dashboard/medias/MediaModal'
import { useTranslate } from '@/utils/translateHelper'

export const BUTTONS_STYLES = {
  color: '#364954',
  gap: 0.8,
  fontWeight: 400,
}

export function TipsBtn(): React.ReactElement {
  const translate = useTranslate()

  return (
    <Button sx={BUTTONS_STYLES}>
      <MdOutlineTipsAndUpdates size={18} /> {translate('tips')}
    </Button>
  )
}
export function ChallengeBtn(): React.ReactElement {
  const translate = useTranslate()

  return (
    <Button sx={BUTTONS_STYLES}>
      <GrTest size={17} /> Tests
    </Button>
  )
}
export function SettingsBtn(): React.ReactElement {
  const translate = useTranslate()

  return (
    <Button sx={BUTTONS_STYLES}>
      <FiSettings size={18} />
      {translate('settings')}
    </Button>
  )
}
export function MediaBtn(): React.ReactElement {
  const translate = useTranslate()
  const commands = useCommands()
  return (
    <MediaModal insertImage={commands.insertImage}>
      <Tooltip title='Media'>
        <ToggleButton
          value='left'
          key='left'
          sx={{ py: '4px', px: '10px' }}
        >
          <TbPhoto size={18} />
        </ToggleButton>
      </Tooltip>
    </MediaModal>
  )
}

export function SolutionBtn(): React.ReactElement {
  return (
    <Button sx={BUTTONS_STYLES}>
      <LuCheckCircle size={18} />
      Solution
    </Button>
  )
}

export function PreCodeBtn(): React.ReactElement {
  return (
    <Button sx={BUTTONS_STYLES}>
      <IoCode size={18} />
      Pre-code
    </Button>
  )
}
