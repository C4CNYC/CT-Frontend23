import { Theme, type SxProps } from '@mui/system'

export const getBoxSx = (isDesktop: boolean, isOpenHeader: boolean): SxProps => ({
  overflowY: 'scroll',
  scrollbarWidth: 'none',
  height: isDesktop && isOpenHeader ? 'calc(100vh - 86px)' : '100vh',
  '&::-webkit-scrollbar': {
    width: 0,
  },
  '& .slick-slider': {
    height: '100%',
  },
  '& .slick-list': {
    height: '100%',
  },
  '& .slick-track': {
    height: '100%',
    '& .slick-slide': {
      '&  div:first-of-type': {
        height: '100%',
      },
    },
  },
})

export const getCarouselSettings = (onBeforeChange: (_: number, next: number) => void) => ({
  speed: 50,
  dots: false,
  arrows: false,
  slidesToShow: 1,
  draggable: false,
  slidesToScroll: 1,
  className: 'innerDiv',
  beforeChange: onBeforeChange,
})

export const LOADER_SCREEN_SX = {
  position: 'absolute',
  zIndex: 1,
  animation: '1.5s hide 2.5s forwards',
  '@keyframes hide': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
}

export const getProgressWrapperSx = (theme: Theme): SxProps => ({
  width: '100%',
  bgcolor: theme.palette.background.default,
  display: 'flex',
  gap: '2px',
  py: '4px',
  px: '10px',
})

export const PROGRESS_ITEM_SX = {
  height: 4,
  flex: 1,
  borderRadius: 16,
}
