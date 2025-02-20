import { useRef } from 'react'

import {
  Card,
  SxProps,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import Carousel from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useTranslate } from '@root/src/utils/translateHelper'

import CarouselArrows from '../slider/CarouselArrows'

type Props = ToggleButtonGroupProps & {
  name: string
  helperText?: string
  sxGroup?: SxProps
  sxButton?: SxProps
  options: Array<{ key: string; value: string; tooltip?: string; icon?: React.ReactNode }>
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

  const carouselRef = useRef<Carousel>(null)
  const carouselSettings = {
    arrows: false,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 2,
    variableWidth: true,
    rtl: Boolean(theme.direction === 'rtl'),
  }

  const handlePrev = (): void => {
    carouselRef.current?.slickPrev()
  }
  const handleNext = (): void => {
    carouselRef.current?.slickNext()
  }

  return (
    <>
      <style>
        {`
              .slick-track
        {
            display: flex !important;
        }

        .slick-slide
        {
            height: inherit !important;
        }
      `}
      </style>
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
              <Card
                elevation={0}
                sx={{
                  boxShadow: 'none',
                  borderRadius: '8px',
                  position: 'relative',
                  background: 'transparent ',
                }}
              >
                <Carousel
                  ref={carouselRef}
                  {...carouselSettings}
                >
                  {options.map((el) => (
                    <ToggleButton
                      sx={sxButton}
                      value={el.key}
                      key={el.key}
                    >
                      {translate(el.value)}
                    </ToggleButton>
                  ))}
                </Carousel>
                <CarouselArrows
                  onNext={handleNext}
                  onPrevious={handlePrev}
                  sx={{
                    gap: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    pt: 1,
                  }}
                />
              </Card>
            ) : (
              options.map((el) =>
                tooltip ? (
                  <Tooltip
                    sx={tooltipSx}
                    key={el.key}
                    slotProps={{ popper: { disablePortal: true } }}
                    title={
                      el.tooltip ? (
                        <Typography
                          variant='body2'
                          p={1}
                        >
                          {translate(el.tooltip)}
                        </Typography>
                      ) : null
                    }
                  >
                    <ToggleButton
                      sx={sxButton}
                      value={el.key}
                    >
                      {translate(el.value)}
                      {el.icon}
                    </ToggleButton>
                  </Tooltip>
                ) : (
                  <ToggleButton
                    sx={sxButton}
                    value={el.key}
                    key={el.key}
                  >
                    {translate(el.value)}
                  </ToggleButton>
                )
              )
            )}
            {other.children}
          </ToggleButtonGroup>
        )}
      />
    </>
  )
}
