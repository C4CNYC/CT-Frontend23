import { Box, Breadcrumbs, Button, Link, Stack, Typography } from '@mui/material'

import { useTranslate } from '@/utils/translateHelper'

import { LinkItem } from './LinkItem'
import { CustomBreadcrumbsProps } from './types'

export function CustomBreadcrumbs({
  links,
  action,
  heading,
  moreLink,
  activeLast,
  backClick,
  sx,
  ...other
}: CustomBreadcrumbsProps): React.ReactElement | null {
  const lastLink = links[links.length - 1]?.name
  const translate = useTranslate()

  return (
    <Box sx={{ mb: 3, ...sx }}>
      <Stack
        direction='row'
        alignItems='center'
      >
        <Box sx={{ flexGrow: 1 }}>
          {/* HEADING */}
          {heading && (
            <Typography
              variant='h4'
              gutterBottom
            >
              {heading}
            </Typography>
          )}

          {/* BREADCRUMBS */}
          <Box
            display='flex'
            flexDirection='column'
            gap={1}
          >
            {backClick && (
              <Button
                onClick={backClick}
                color='error'
                variant='outlined'
              >
                {translate('btn_group_back')}
              </Button>
            )}
            {!!links.length && (
              <Breadcrumbs
                separator={<Separator />}
                {...other}
              >
                {links.map((link) => (
                  <LinkItem
                    key={link.name ?? ''}
                    link={link}
                    activeLast={activeLast}
                    disabled={link.name === lastLink}
                  />
                ))}
              </Breadcrumbs>
            )}
          </Box>
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
      </Stack>

      {/* MORE LINK */}
      {!!moreLink && (
        <Box sx={{ mt: 2 }}>
          {moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant='body2'
              target='_blank'
              rel='noopener'
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  )
}

function Separator(): React.ReactElement {
  return (
    <Box
      component='span'
      sx={{
        width: 4,
        height: 4,
        borderRadius: '50%',
        bgcolor: 'text.disabled',
      }}
    />
  )
}
