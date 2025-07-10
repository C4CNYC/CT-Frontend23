import { useRef, useState, useEffect } from 'react'

import {
  Box,
  IconButton,
  SxProps,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { FiChevronLeft } from '@react-icons/all-files/fi/FiChevronLeft'
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight'
import { FiInfo } from '@react-icons/all-files/fi/FiInfo'
import { Controller, FieldError, useFormContext } from 'react-hook-form'

import { useTranslate } from '@root/src/utils/translateHelper'

type ToggleButtonOption = {
  key: string
  value: string
  tooltip?: string
  icon?: React.ReactNode
}

type Props = ToggleButtonGroupProps & {
  name: string
  helperText?: string
  sxGroup?: SxProps
  sxButton?: SxProps
  options: Array<ToggleButtonOption>
  error?: FieldError
  tooltip?: boolean
  tooltipSx?: SxProps
}

export function RHFToggleButtonGroup({
  name,
  options,
  helperText,
  sxGroup,
  sxButton,
  error,
  tooltip,
  tooltipSx,
  ...other
}: Props): React.ReactElement | null {
  const { control } = useFormContext()
  const theme = useTheme()
  const translate = useTranslate()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Check scroll state
  const updateScrollState = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth)
  }

  useEffect(() => {
    updateScrollState()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', updateScrollState)
      return () => container.removeEventListener('scroll', updateScrollState)
    }
  }, [options])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const renderToggleButton = (el: ToggleButtonOption, key?: string) => {
    const button = (
      <ToggleButton
        sx={{
          flexShrink: 0,
          minWidth: 'fit-content',
          ...sxButton,
        }}
        value={el.key}
        key={key || el.key}
      >
        {translate(el.value)}
        {tooltip && (el.icon ?? <FiInfo />)}
      </ToggleButton>
    )

    if (tooltip && el.tooltip) {
      return (
        <Tooltip
          sx={tooltipSx}
          key={key || el.key}
          slotProps={{ popper: { disablePortal: true } }}
          title={
            <Typography
              variant='body2'
              p={1}
            >
              {translate(el.tooltip)}
            </Typography>
          }
        >
          {button}
        </Tooltip>
      )
    }

    return button
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <ToggleButtonGroup
          exclusive
          aria-label='level'
          sx={sxGroup}
          {...field}
          {...other}
        >
          {isMobile ? (
            <Box sx={{ position: 'relative', width: '100%' }}>
              {/* Scroll Container */}
              <Box
                ref={scrollContainerRef}
                sx={{
                  display: 'flex',
                  gap: 1,
                  overflowX: 'auto',
                  scrollbarWidth: 'none', // Firefox
                  '&::-webkit-scrollbar': { display: 'none' }, // Chrome/Safari
                  pb: 1,
                  px: canScrollLeft ? 5 : 0,
                }}
              >
                {options.map((el) => renderToggleButton(el))}
              </Box>

              {/* Navigation Arrows */}
              {canScrollLeft && (
                <IconButton
                  onClick={() => scroll('left')}
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'background.paper',
                    boxShadow: 1,
                    zIndex: 1,
                    '&:hover': {
                      backgroundColor: 'background.paper',
                      boxShadow: 2,
                    },
                  }}
                  size='small'
                >
                  <FiChevronLeft />
                </IconButton>
              )}

              {canScrollRight && (
                <IconButton
                  onClick={() => scroll('right')}
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'background.paper',
                    boxShadow: 1,
                    zIndex: 1,
                    '&:hover': {
                      backgroundColor: 'background.paper',
                      boxShadow: 2,
                    },
                  }}
                  size='small'
                >
                  <FiChevronRight />
                </IconButton>
              )}
            </Box>
          ) : (
            options.map((el) => renderToggleButton(el))
          )}
          {other.children}
        </ToggleButtonGroup>
      )}
    />
  )
}
