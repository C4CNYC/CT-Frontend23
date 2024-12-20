import { useState } from 'react'

import { MenuItem, menuItemClasses, MenuList, useTheme } from '@mui/material'

import { IconButtonAnimate } from '@/components/animate'
import { Image } from '@/components/image'
import { MenuPopover } from '@/components/menu-popover'

import { useLocales } from '../../../locales'

export default function LanguagePopover(): React.ReactElement {
  const theme = useTheme()
  const { allLangs, currentLang, onChangeLang } = useLocales()

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  const handleChangeLang = (newLang: string): void => {
    onChangeLang(newLang)
    handleClosePopover()
  }

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <Image
          disabledEffect
          src={currentLang?.icon}
          alt={currentLang?.label}
          sx={{ borderRadius: '6px' }}
        />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
      >
        <MenuList
          sx={{
            width: 160,
            minHeight: 72,
            ...theme.typography.body2,
            padding: theme.spacing(0, 0),
            borderRadius: theme.shape.borderRadius * 0.75,
            '&:not(:last-of-type)': { marginBottom: 4 },
            [`&.${menuItemClasses.selected}`]: {
              fontWeight: theme.typography.fontWeightMedium,
              backgroundColor: theme.palette.action.selected,
              '&:hover': { backgroundColor: theme.palette.action.hover },
            },
          }}
        >
          {allLangs.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={() => {
                handleChangeLang(option.value)
              }}
              sx={{
                py: 0.7,
                my: 0.1,
              }}
            >
              <Image
                disabledEffect
                alt={option.label}
                src={option.icon}
                sx={{
                  width: 28,
                  mr: 2,
                }}
              />
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </>
  )
}
