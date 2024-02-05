import { Button } from '@mui/material'
import { FiSettings } from '@react-icons/all-files/fi/FiSettings'
import { IoCheckmarkDoneCircleOutline } from '@react-icons/all-files/io5/IoCheckmarkDoneCircleOutline'
import { MdOutlineTipsAndUpdates } from '@react-icons/all-files/md/MdOutlineTipsAndUpdates'
import { TbPhoto } from '@react-icons/all-files/tb/TbPhoto'

import { MediaModal } from '@/sections/dashboard/medias/MediaModal'
import { useTranslate } from '@/utils/translateHelper'

export function TipsBtn(): React.ReactElement {
  const translate = useTranslate()

  return (
    <Button
      sx={{
        maxHeight: '40px',
        borderRadius: '20px',
        border: '2px solid #364954',
        color: '#364954',
        gap: 1,
        textTransform: 'capitalize',
        '&:hover': {
          border: '2px solid #364954',
        },
      }}
    >
      {translate('tips')} <MdOutlineTipsAndUpdates size={20} />
    </Button>
  )
}
export function ChallengeBtn(): React.ReactElement {
  const translate = useTranslate()

  return (
    <Button
      sx={{
        maxHeight: '40px',
        borderRadius: '20px',
        border: '2px solid #364954',
        color: '#364954',
        textTransform: 'capitalize',
        gap: 1,
        '&:hover': {
          border: '2px solid #364954',
        },
      }}
    >
      {translate('challenge')} <IoCheckmarkDoneCircleOutline size={20} />
    </Button>
  )
}
export function SettingsBtn(): React.ReactElement {
  const translate = useTranslate()

  return (
    <Button
      sx={{
        maxHeight: '40px',
        borderRadius: '20px',
        border: '2px solid #364954',
        color: '#364954',
        textTransform: 'capitalize',
        gap: 1,
        '&:hover': {
          border: '2px solid #364954',
        },
      }}
    >
      {translate('settings')} <FiSettings size={20} />
    </Button>
  )
}
export function MediaBtn(): React.ReactElement {
  const translate = useTranslate()

  return (
    <MediaModal>
      <Button
        sx={{
          maxHeight: '40px',
          borderRadius: '20px',
          border: '2px solid #364954',
          color: '#364954',
          textTransform: 'capitalize',
          gap: 1,
          '&:hover': {
            border: '2px solid #364954',
          },
        }}
      >
        {translate('media')} <TbPhoto size={20} />
      </Button>
    </MediaModal>
  )
}
