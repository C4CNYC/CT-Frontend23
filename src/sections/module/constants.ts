import { alpha, Theme } from '@mui/material'

import { ISkill } from '@root/src/redux/interfaces/content.interface'

export const getPageContainerSx = (
  isMobile: boolean,
  light: boolean,
  theme: Theme,
  headerBg?: string | null
) => {
  const getBg = () => {
    if (isMobile) return ''
    if (!light)
      return `top left / contain url(${headerBg || '/assets/projects/header_bg.png'}) no-repeat`
    return `linear-gradient(249.57deg, rgba(255, 255, 255, 0.8) 27.55%, 
                          rgba(255, 255, 255, 0.6) 44.53%, 
                          rgba(255, 255, 255, 0.24) 63.57%), 
        top left / contain url(${headerBg || '/assets/projects/header_bg.png'}) no-repeat`
  }

  return {
    borderRadius: '8px',
    pb: 2,
    background: getBg(),
    boxShadow: `inset 0px -6px 12px ${theme.palette.background.default}, 
                inset -6px 0px 12px ${theme.palette.background.default},   
                inset 6px 0px 12px ${theme.palette.background.default}`,
    '-webkit-mask': light
      ? `linear-gradient(to top,  transparent 3%, ${theme.palette.background.default} 6% 94%, transparent 96%),
        linear-gradient(to left, transparent 3%, ${theme.palette.background.default} 5% 94%, transparent 98%)`
      : '',
    '-webkit-mask-size': '110% 110%',
    '-webkit-mask-position': 'center',
    '-webkit-mask-repeat': 'no-repeat',
    '-webkit-mask-composite': 'source-in',
    mask: light
      ? `linear-gradient(to top,  transparent 3%, ${theme.palette.background.default} 6% 94%, transparent 96%),
        linear-gradient(to left, transparent 3%, ${theme.palette.background.default} 5% 94%, transparent 98%)`
      : '',
    'mask-size': '110% 110%',
    'mask-position': 'center',
    'mask-repeat': 'no-repeat',
    'mask-composite': 'intersect',
  }
}

export const getBreadcrumbsSx = (theme: Theme, isMobile: boolean) =>
  !isMobile
    ? {
        background: alpha(theme.palette.background.default, 0.5),
        color:
          theme.palette.mode === 'light'
            ? theme.palette.text.primary
            : theme.palette.text.secondary,
        width: 'fit-content',
        px: 2,
        pl: 3,
        pb: 0.5,
        ml: -3,
        borderRadius: '0 0 24px 0',
        boxShadow:
          theme.palette.mode === 'light'
            ? '0px 2px 5px rgba(0, 0, 0, 0.1)'
            : '0px 2px 5px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
      }
    : {}

export const getHeaderContainerSx = (isMobile: boolean, theme: Theme) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: isMobile ? 'wrap' : 'no-wrap',
  background: theme.palette.mode === 'light' ? '#FFEDF2' : theme.palette.background.paper,
  borderRadius: 3,
  px: 2,
  py: 1,
})
export const CHIP_SX = {
  border: '1px solid #919EAB52',
  borderRadius: 2,
  textTransform: 'uppercase',
}
export const HEADER_IMG_SX = {
  flexShrink: 0,
  width: '150px',
  height: '150px',
  m: '0 auto',
  borderRadius: '25px',
}
export const getLessonListSx = (isMobile: boolean, theme: Theme) => ({
  gap: isMobile ? 2 : 4,
  mt: isMobile ? 2 : 4,
  background: theme.palette.mode === 'light' ? '#FFEDF2' : 'none',
  px: 2,
  pb: isMobile ? 4 : 8,
  pt: 2,
  borderRadius: 3,
})

export const SWITCH_BTN_SX = {
  minWidth: 'auto',
  background: '#fff',
}

export const _mochSkills: ISkill[] = [
  {
    id: 'HTML',
    name: 'HTML',
    description: 'HTML',
  },
  {
    id: 'CSS',
    name: 'CSS',
    description: 'CSS',
  },
  {
    id: 'Basics',
    name: 'Basics',
    description: 'Basics',
  },
  {
    id: 'auto-checked',
    name: 'auto-checked',
    description: 'auto-checked',
  },
]
