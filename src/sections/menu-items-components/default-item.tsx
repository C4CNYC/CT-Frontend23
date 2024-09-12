import { ReactElement } from 'react'

import { ListItemText, Tooltip } from '@mui/material'

import { useSettingsContext } from '@root/src/components'
import { StyledIcon, StyledItem } from '@root/src/components/nav-section/mini/styles'
import {
  StyledIcon as StyledIconVertical,
  StyledItem as StyledItemVertical,
} from '@root/src/components/nav-section/vertical/styles'
import { useResponsive } from '@root/src/hooks'
import { useLocales } from '@root/src/locales'

type IDefaultMenuItemProps = {
  icon: ReactElement
  title: string
  tooltip: string
}

export default function DefaultMenuItem({
  icon,
  title,
  tooltip,
}: IDefaultMenuItemProps): React.ReactElement {
  const { translate } = useLocales()
  const { themeLayout } = useSettingsContext()
  const isDesktop = useResponsive('up', 'md')

  return (
    <Tooltip
      title={`${translate(tooltip)}`}
      placement='right'
      enterDelay={1500}
      enterNextDelay={1500}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'rgba(0, 0, 0, .8)',
            fontSize: '14px',
            fontWeight: 700,
            color: '#fff',
            borderRadius: 2,
            p: 1,
            maxWidth: '250px',
          },
        },
      }}
    >
      {themeLayout === 'vertical' || !isDesktop ? (
        <StyledItemVertical depth={1}>
          <StyledIconVertical>
            {' '}
            <StyledIcon>{icon}</StyledIcon>
          </StyledIconVertical>
          <ListItemText
            primary={`${translate(title)}`}
            primaryTypographyProps={{
              noWrap: true,
              component: 'span',
              fontSize: 18,
            }}
            secondaryTypographyProps={{
              noWrap: true,
              variant: 'caption',
            }}
          />
        </StyledItemVertical>
      ) : (
        <StyledItem depth={1}>
          <StyledIcon>{icon}</StyledIcon>
          <ListItemText
            primary={`${translate(title)}`}
            primaryTypographyProps={{
              noWrap: true,
              sx: {
                width: 72,
                fontSize: 10,
                lineHeight: '16px',
                textAlign: 'center',
                fontWeight: 700,
              },
            }}
          />
        </StyledItem>
      )}
    </Tooltip>
  )
}
