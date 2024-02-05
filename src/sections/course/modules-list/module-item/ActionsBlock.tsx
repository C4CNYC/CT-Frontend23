import { IconButton, Stack, useTheme } from '@mui/material'
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart'
import { AiOutlineStar } from '@react-icons/all-files/ai/AiOutlineStar'
import { HiDotsVertical } from '@react-icons/all-files/hi/HiDotsVertical'
import { MdIosShare } from '@react-icons/all-files/md/MdIosShare'
import { TbFileCertificate } from '@react-icons/all-files/tb/TbFileCertificate'

import { convertNumber } from '@/utils'

interface IActionBlockProps {
  certificate: number
  likes: number
  rated: number
}

export default function ActionsBlock({
  certificate,
  likes,
  rated,
}: IActionBlockProps): React.ReactElement {
  const theme = useTheme()

  return (
    <Stack
      p={3}
      gap={1}
    >
      <Stack
        sx={{
          borderRadius: 2,
          gap: 1,
          px: 2,
          py: 1,
          background:
            theme.palette.mode === 'light'
              ? 'rgba(248, 248, 248, 1)'
              : theme.palette.background.neutral,
        }}
      >
        <Stack
          direction='row'
          gap={1}
        >
          <TbFileCertificate
            color='rgba(67, 212, 221, 1)'
            size={22}
          />
          {convertNumber(certificate)}
        </Stack>
        <Stack
          direction='row'
          gap={1}
        >
          <AiOutlineHeart
            color='rgba(238, 70, 122, 1)'
            size={22}
          />
          {convertNumber(likes)}
        </Stack>
        <Stack
          direction='row'
          gap={1}
        >
          <AiOutlineStar
            color='rgba(251, 221, 63, 1)'
            size={22}
          />
          {convertNumber(rated)}
        </Stack>
      </Stack>
      <Stack
        direction='row'
        justifyContent='center'
      >
        <IconButton>
          <MdIosShare />
        </IconButton>
        <IconButton>
          <HiDotsVertical />
        </IconButton>
      </Stack>
    </Stack>
  )
}
