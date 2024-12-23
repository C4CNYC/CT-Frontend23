import { useState } from 'react'

import { Typography } from '@mui/material'
import { Stack } from '@mui/system'

import { Iconify, Image } from '@root/src/components'

interface LanguageItemProps {
  imageSrc: string
  langName: string
  description: string
  onSelectLang: (lang: string) => void
  isSelected: boolean
  key: string
}

export const SelectLanguageItem = ({
  imageSrc,
  langName,
  description,
  onSelectLang,
  isSelected,
  key,
}: LanguageItemProps): React.ReactElement => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectLang(key)}
      sx={{
        transition: 'all .3s easy-in-out',
        borderRadius: '16px',
        background: isHovered || isSelected ? '#D4D2CF' : '',
        py: 1,
        px: 1,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Stack
        alignItems='stretch'
        justifyContent='center'
        flex={1}
        maxWidth={60}
        sx={{ background: 'transparent' }}
      >
        <Image
          src={imageSrc}
          alt={langName}
          width={50}
          height={50}
        />
      </Stack>
      <Stack
        sx={{ maxWidth: '340px', pl: 2, pr: 2 }}
        flex={5}
      >
        <Typography variant='h5'>{langName}</Typography>
        <Typography variant='subtitle2'>{description}</Typography>
      </Stack>
      <Iconify
        color={isHovered || isSelected ? '' : '#EAEAEB'}
        icon='fa6-solid:chevron-right'
        width='30px'
      />
    </Stack>
  )
}
