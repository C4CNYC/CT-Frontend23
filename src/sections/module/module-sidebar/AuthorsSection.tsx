import { Avatar, Link, Paper, Stack, Typography, useTheme } from '@mui/material'
import NextLink from 'next/link'

import { IAuthor } from '@/redux/services/interfaces/author.interface'

import SocialActivity from './SocialActivity'

export default function AuthorsSection({
  authors,
  certificate,
  likes,
  rated,
}: {
  authors: IAuthor[]
  certificate: number
  likes: number
  rated: number
}): React.ReactElement {
  const theme = useTheme()
  return (
    <Stack
      sx={{
        background: theme.palette.mode === 'light' ? '#FFF0F3' : theme.palette.background.paper,
        borderRadius: 3,
      }}
    >
      {authors?.map((author) => (
        <Paper
          key={author.id}
          elevation={8}
          sx={{
            background:
              theme.palette.mode === 'light' ? '#F8F8F8' : theme.palette.background.neutral,
            borderRadius: 3,
            px: 3,
            py: 2,
            mb: 2,
            minWidth: '250px',
            [theme.breakpoints.down(1400)]: {
              ml: '0',
            },
          }}
        >
          <Stack
            direction='row'
            gap={3}
          >
            <Avatar
              alt={author?.name || 'Author'}
              src={author?.avatar || ''}
              variant='rounded'
              sx={{
                width: '60px',
                height: '60px',
                border: '2px solid #EE467A',
                mr: 2,
              }}
            />
            <Stack>
              <Typography
                noWrap
                variant='body1'
                maxWidth='150px'
                sx={{
                  whiteSpace: 'nowrap',
                }}
              >
                {author?.name || 'Author Name'}
              </Typography>
              <Link
                component={NextLink}
                href={author?.linkedin || '#'}
                target='_blank'
                rel='noopener noreferrer'
                underline='always'
                color='#0198ED'
              >
                Bio
              </Link>
            </Stack>
          </Stack>
        </Paper>
      ))}
      <SocialActivity
        likes={likes}
        rated={rated}
        certificate={certificate}
      />
    </Stack>
  )
}
