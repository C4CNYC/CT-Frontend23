import { Box, Chip } from '@mui/material'

import { useGalleryContext } from '../context/gallery-context'

export default function GalleryItemSkills(): React.ReactElement {
  const { language } = useGalleryContext()
  return (
    <Box sx={{ display: 'flex', gap: 1, pt: 1 }}>
      <Chip
        label={language}
        size='small'
        sx={{ textTransform: 'uppercase' }}
      />
    </Box>
  )
}
