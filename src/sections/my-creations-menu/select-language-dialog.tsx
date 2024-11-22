import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material'
import { Stack } from '@mui/system'

import { Iconify, Image } from '@root/src/components'

import { GO_BTN_SX, LANG_ITEMS_CONT_SX, LANGUAGES_MOCK, OTHER_LANGUAGES_MOCK } from './constants'

interface SelectLanguageModalProps {
  children: React.ReactElement[] | React.ReactElement
  isLoading: boolean
  onSubmit: () => void
}

export default function SelectLanguageModal({
  children,
  isLoading,
  onSubmit,
}: SelectLanguageModalProps): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedLang, setSelectedLang] = useState<string | null>(null)

  const openDialog = () => {
    setOpen(true)
  }
  const closeDialog = () => {
    setOpen(false)
  }

  return (
    <>
      <Box
        onClick={() => {
          openDialog()
        }}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={closeDialog}
      >
        <DialogTitle sx={{ color: '#616161' }}>
          <Typography variant='h4'>Select a Language</Typography>

          <IconButton
            onClick={closeDialog}
            sx={{ position: 'absolute', right: '5px', top: '5px' }}
          >
            <Iconify
              icon='flowbite:close-outline'
              width={20}
              height={20}
            />
          </IconButton>
          <Typography variant='body1'>It may load with a template</Typography>
        </DialogTitle>

        <DialogContent>
          <Stack sx={LANG_ITEMS_CONT_SX}>
            <Typography variant='h6'>Favorites:</Typography>
            {LANGUAGES_MOCK.map((el) => (
              <LanguageItem
                isSelected={el.langName === selectedLang}
                onSelectLang={(lang) => setSelectedLang(lang)}
                imageSrc={el.imageSrc}
                langName={el.langName}
                description={el.description}
                key={el.description}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ gap: 1 }}>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedLang}
            label='languages'
            onChange={(e) => setSelectedLang(e.target.value)}
            input={<OutlinedInput />}
            placeholder='Select Other Language'
            fullWidth
            displayEmpty
            sx={{
              background: '#F0EEEE80',
            }}
          >
            {OTHER_LANGUAGES_MOCK.map((lng) => (
              <MenuItem
                value={lng}
                key={lng}
              >
                {lng}
              </MenuItem>
            ))}
          </Select>
          <LoadingButton
            loading={isLoading}
            disabled={!selectedLang}
            onClick={onSubmit}
            sx={GO_BTN_SX}
          >
            GO
            <Iconify
              icon='fa6-solid:chevron-right'
              width={25}
            />
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

interface LanguageItemProps {
  imageSrc: string
  langName: string
  description: string
  onSelectLang: (lang: string) => void
  isSelected: boolean
}

const LanguageItem = ({
  imageSrc,
  langName,
  description,
  onSelectLang,
  isSelected,
}: LanguageItemProps): React.ReactElement => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectLang(langName)}
      sx={{
        transition: 'all .3s easy-in-out',
        borderRadius: '16px',
        background: isHovered || isSelected ? '#D4D2CF' : '',
        py: 1,
        px: 0.5,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Stack
        alignItems='center'
        justifyContent='center'
        flex={1}
        maxWidth={60}
      >
        <Image
          src={imageSrc}
          alt={langName}
          width={50}
          height={50}
        />
      </Stack>
      <Stack sx={{ maxWidth: '340px', pl: 2, pr: 2 }}>
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
