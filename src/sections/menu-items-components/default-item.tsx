import { ListItemText, Tooltip } from '@mui/material'

import { Image, useSettingsContext } from '@root/src/components'
import { StyledIcon, StyledItem } from '@root/src/components/nav-section/mini/styles'
import {
  StyledIcon as StyledIconVertical,
  StyledItem as StyledItemVertical,
} from '@root/src/components/nav-section/vertical/styles'
import { useResponsive } from '@root/src/hooks'
import { useLocales } from '@root/src/locales'

type IDefaultMenuItemProps = {
  icon: string
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
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: '#000',
            fontSize: '17px',
            fontWeight: 700,
            color: '#fff',
            p: 2,
            borderRadius: 2,
            maxWidth: '280px',
          },
        },
      }}
    >
      {themeLayout === 'vertical' || !isDesktop ? (
        <StyledItemVertical depth={1}>
          <StyledIconVertical>
            <Image
              src={icon}
              alt=''
            />
          </StyledIconVertical>
          <ListItemText
            primary={`${translate(title)}`}
            primaryTypographyProps={{
              noWrap: true,
              component: 'span',
              fontSize: 20,
              color: '#364954',
            }}
            secondaryTypographyProps={{
              noWrap: true,
              variant: 'caption',
            }}
          />
        </StyledItemVertical>
      ) : (
        <StyledItem depth={1}>
          <StyledIcon>
            <Image
              src={icon}
              alt=''
            />
          </StyledIcon>
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
