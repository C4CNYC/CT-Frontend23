import { useMemo } from 'react'

import {
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { HiOutlineArrowNarrowRight } from '@react-icons/all-files/hi/HiOutlineArrowNarrowRight'
import { MdIosShare } from '@react-icons/all-files/md/MdIosShare'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { Unit } from '@/redux/interfaces/challenges.interface'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useTranslate } from '@/utils/translateHelper'

import { getBtnSx, getImgSx, getModuleItemCont, INFO_CONT_SX, seeMoreBtn } from './constants'
import ImageLightBox from './ImageLightBox'
import ModuleProgress from './ModuleProgress'

interface IModuleItemProps {
  unit: Unit | undefined
  lastVisited: boolean
}

export default function ModuleItem({ unit, lastVisited }: IModuleItemProps): React.ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(800))
  const { query } = useRouter()
  const translate = useTranslate()
  const router = useRouter()

  const moduleContSx = useMemo(() => getModuleItemCont(theme), [theme])
  const imgSx = useMemo(() => getImgSx(unit?.avatar, theme), [theme, unit?.avatar])
  const btnSx = useMemo(
    () => getBtnSx(isMobile, lastVisited, theme),
    [theme, isMobile, lastVisited]
  )
  const moreBtnSx = useMemo(() => seeMoreBtn(isMobile), [isMobile])

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      sx={moduleContSx}
      onClick={(event) => {
        router.push(
          STUDENT_PATH_DASHBOARD.courses.unit(query.id as string, unit?.id as string),
          undefined,
          { shallow: true }
        )
      }}
    >
      {isMobile ? (
        <IconButton
          sx={{ alignSelf: 'flex-end', mb: -4, mt: 0.5, mr: 0.5 }}
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <MdIosShare />
        </IconButton>
      ) : null}
      <ImageLightBox
        sx={isMobile ? { alignSelf: 'center' } : {}}
        image={unit?.avatar ?? '/assets/projects/bg1.png'}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <Box sx={imgSx} />
      </ImageLightBox>
      <Stack sx={INFO_CONT_SX}>
        <ModuleProgress progress={unit?.progress ? unit?.progress : 3} />

        <Typography
          variant='h5'
          noWrap
          textOverflow='ellipsis'
          gutterBottom
        >
          {unit?.name}
        </Typography>
        <Typography
          variant='body1'
          noWrap
          textOverflow='ellipsis'
          maxWidth={550}
        >
          {unit?.description}
        </Typography>

        <Stack
          direction={isMobile ? 'column-reverse' : 'row'}
          alignItems='center'
          gap={isMobile ? 0 : 3}
        >
          <Button
            component={NextLink}
            href={STUDENT_PATH_DASHBOARD.codePanel.workSpace({
              courseId: query.id as string,
              unitId: unit?.id,
              lessonId: unit?.lessons?.[0].id,
            })}
            sx={btnSx}
            variant='text'
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            {translate('get_coding', {
              time: lastVisited ? 'Again' : '',
            })}
            <svg
              width='0'
              height='0'
            >
              <linearGradient
                id='blue-gradient'
                x1='100%'
                y1='100%'
                x2='0%'
                y2='0%'
              >
                <stop
                  stopColor='#61F3F3'
                  offset='0%'
                />
                <stop
                  stopColor='#00B8D9'
                  offset='100%'
                />
              </linearGradient>
            </svg>
            <HiOutlineArrowNarrowRight
              size={24}
              style={lastVisited ? { stroke: 'url(#blue-gradient)' } : {}}
            />
          </Button>
          <Link
            href={STUDENT_PATH_DASHBOARD.courses.unit(query.id as string, unit?.id as string)}
            component={NextLink}
            onClick={(event) => {
              event.stopPropagation()
            }}
            sx={moreBtnSx}
          >
            {translate('actions_see_more')}
          </Link>
        </Stack>
      </Stack>
    </Stack>
  )
}
