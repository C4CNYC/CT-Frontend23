import { memo, useState } from 'react'

import { Box, Collapse, Stack, Typography } from '@mui/material'
import { ImMinus } from '@react-icons/all-files/im/ImMinus'
import { ImPlus } from '@react-icons/all-files/im/ImPlus'

interface CollapsedItemProps {
  title: string
  children: React.ReactElement
  isDefaultOpen?: boolean
}

const CollapsedItem = ({ title, isDefaultOpen = false, children }: CollapsedItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(isDefaultOpen)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Box
      onClick={handleOpen}
      sx={{ '& :hover': { cursor: 'pointer' } }}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        mb={1}
      >
        <Typography
          variant='h6'
          sx={{ userSelect: 'none' }}
        >
          {title}
        </Typography>
        {!isOpen ? <ImPlus /> : <ImMinus />}
      </Stack>
      <Collapse in={isOpen}>{children}</Collapse>
    </Box>
  )
}

export default memo(CollapsedItem)
