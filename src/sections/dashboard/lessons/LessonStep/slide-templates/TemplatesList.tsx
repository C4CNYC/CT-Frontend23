import { Box } from '@mui/material'

import TemplateItem from './TemplateItem'

const TemplatesList = () => {
  return (
    <Box
      gap={3}
      pt={3}
      display='grid'
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {Array.from(Array(20)).map((_, index) => (
        <TemplateItem key={index} />
      ))}
    </Box>
  )
}

export default TemplatesList
