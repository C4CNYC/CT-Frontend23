import { type FC } from 'react'

import { Box } from '@mui/material'
import Image from 'next/image'

export interface CustomAvatartWithoutMUIProps {
  src: string
  alt: string
  styles?: any
  priority?: boolean
  width?: number | `${number}` | undefined
  height?: number | `${number}` | undefined
}

const CustomAvatartWithoutMUI: FC<CustomAvatartWithoutMUIProps> = ({
  src,
  alt,
  styles,
  priority,
  width,
  height,
}) => (
  <Box sx={styles}>
    <Image
      alt={alt}
      src={src}
      width={width}
      height={height}
      priority={priority}
    />
  </Box>
)

export default CustomAvatartWithoutMUI
