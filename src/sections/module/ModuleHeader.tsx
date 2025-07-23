import { useMemo } from 'react'

import { Box, Chip, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

import { Image } from '@/components'
import { ILesson, ISkill } from '@/redux/interfaces/content.interface'
import { InvertedLessonMachineLang } from '@/redux/services/enums/lesson-language.enum'
import ImageLightBox from '@/sections/course/modules-list/module-item/ImageLightBox'
import { BaseResponseInterface } from '@/utils'
import { convertSkillsArrToObject } from '@/utils/convertSkillsArrToObject'

import { CHIP_SX, HEADER_IMG_SX, _mochSkills, getHeaderContainerSx } from './constants'

interface IModuleHeaderProps {
  name: string
  description: string
  avatar: string | null
  lessons: Array<ILesson & BaseResponseInterface>
  unitModule: any
}

export default function ModuleHeader({
  name,
  description,
  avatar,
  lessons,
  unitModule,
}: IModuleHeaderProps): React.ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(500))
  const moduleCont = useMemo(() => getHeaderContainerSx(isMobile, theme), [isMobile, theme])

  const grading = unitModule?.grading
  const levelOfModule = unitModule?.level
  const moduleMachineLang =
    unitModule?.meta?.machineLang &&
    InvertedLessonMachineLang[
      unitModule?.meta?.machineLang as keyof typeof InvertedLessonMachineLang
    ]
  const availableUniqueSkills = [
    ...new Set([moduleMachineLang, levelOfModule, grading].filter((v): v is string => v != null)),
  ]
  const skills = availableUniqueSkills.length
    ? convertSkillsArrToObject(availableUniqueSkills)
    : _mochSkills

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
