import { Box, Card, IconButton, ListItemText, Link, Stack } from '@mui/material'
import { CgMoreVerticalAlt } from '@react-icons/all-files/cg/CgMoreVerticalAlt'

import { Image } from '@/components/image/Image'
import { Iconify } from '@root/src/components'
import { fDateTime } from '@root/src/utils/formatTime'

import { SlideSelectListProps } from './CreateSlideTypes'

export const SlideSelectList = (props: SlideSelectListProps) => {
  let lessonContentTemplates = props.lessonContentTemplates

  return (
    <Box
      gap={3}
      display='grid'
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {lessonContentTemplates &&
        lessonContentTemplates
          .filter((content) => content.active)
          .map((content) => (
            <Card
              key={content.id}
              sx={{
                backgroundColor: content.id == props.selectedSlide?.id ? '#fcc' : '',
              }}
              variant={content.id == props.selectedSlide?.id ? 'outlined' : undefined}
              onClick={() => props.setSelectedSlide(content)}
            >
              <Box
                gap={0.5}
                display='flex'
                sx={{ p: 1 }}
              >
                <Box
                  flexGrow={1}
                  sx={{ position: 'relative' }}
                >
                  <Image
                    alt={content.cover}
                    src={content.cover}
                    sx={{ width: 1, height: 164, borderRadius: 1 }}
                  />
                </Box>
              </Box>
              <ListItemText
                sx={{ p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5) }}
                primary={`Posted date: ${fDateTime(content.createdAt)}`}
                secondary={<Link color='inherit'>{content.title}</Link>}
                primaryTypographyProps={{ typography: 'caption', color: 'text.disabled' }}
                secondaryTypographyProps={{
                  mt: 1,
                  noWrap: true,
                  component: 'span',
                  color: 'text.primary',
                  typography: 'subtitle1',
                }}
              />

              <Stack
                spacing={1.5}
                sx={{ position: 'relative', p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5) }}
              >
                <IconButton sx={{ position: 'absolute', bottom: 20, right: 8 }}>
                  <CgMoreVerticalAlt />
                </IconButton>

                {[
                  {
                    icon: (
                      <Iconify
                        icon='mingcute:location-fill'
                        sx={{ color: 'error.main' }}
                      />
                    ),
                    label: content.complexity,
                  },
                  {
                    icon: (
                      <Iconify
                        icon='solar:users-group-rounded-bold'
                        sx={{ color: 'primary.main' }}
                      />
                    ),
                    label: `${content.type}  ${content.tags}`,
                  },
                ].map((item) => (
                  <Stack
                    key={item.label}
                    spacing={1}
                    direction='row'
                    alignItems='center'
                    sx={{ typography: 'body2' }}
                  >
                    {item.icon}
                    {item.label}
                  </Stack>
                ))}
              </Stack>
            </Card>
          ))}
    </Box>
  )
}
