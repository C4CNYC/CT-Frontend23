import { useMemo } from 'react'

import { Box, Chip, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

import { ILesson, ISkill } from '@/redux/interfaces/content.interface'
import ImageLightBox from '@/sections/course/modules-list/module-item/ImageLightBox'
import { BaseResponseInterface } from '@/utils'
import { getUniqueSkills } from '@/utils/getUniqueSkills'
import { Image } from '@root/src/components/image/Image'

import { CHIP_SX, HEADER_IMG_SX, _mochSkills, getHeaderContainerSx } from './constants'

interface IModuleHeaderProps {
  name: string
  description: string
  avatar: string | null
  lessons: Array<ILesson & BaseResponseInterface>
}

export default function ModuleHeader({
  name,
  description,
  avatar,
  lessons,
}: IModuleHeaderProps): React.ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(500))
  const moduleCont = useMemo(() => getHeaderContainerSx(isMobile, theme), [isMobile, theme])
  const uniqueSkills = getUniqueSkills(lessons.map((item: ILesson) => item.skills).flat())
  const skills = uniqueSkills.length ? uniqueSkills : _mochSkills
  return (
    <Stack sx={moduleCont}>
      {isMobile ? (
        <Box sx={{ mx: 'auto' }}>
          <ImageLightBox image={avatar ?? '/assets/courses/courseImg.png'}>
            <Image
              alt='module cover'
              src={avatar ?? '/assets/courses/courseImg.png'}
              sx={HEADER_IMG_SX}
            />
          </ImageLightBox>
        </Box>
      ) : null}
      <Stack sx={{ overflow: 'hidden', pt: 2, pr: 2 }}>
        <Typography variant='h4'>{name}</Typography>
        <Typography variant='body1'>{description}</Typography>
        <Stack
          direction='row'
          gap={2}
          my={2}
          flexWrap='wrap'
        >
          {skills?.map((item: ISkill) => (
            <Chip
              key={item.id}
              label={item.name}
              sx={CHIP_SX}
            />
          ))}
        </Stack>
      </Stack>
      {!isMobile ? (
        <ImageLightBox image={avatar ?? '/assets/courses/courseImg.png'}>
          <Image
            alt='module cover'
            src={avatar ?? '/assets/courses/courseImg.png'}
            sx={HEADER_IMG_SX}
          />
        </ImageLightBox>
      ) : null}
    </Stack>
  )
}
