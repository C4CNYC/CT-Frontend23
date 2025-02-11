import { Link, Stack, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material'
import { GrOverview } from '@react-icons/all-files/gr/GrOverview'
import { IoImageOutline } from '@react-icons/all-files/io5/IoImageOutline'
import { TbFileCertificate } from '@react-icons/all-files/tb/TbFileCertificate'
import NextLink from 'next/link'

import { useTranslate } from '@/utils/translateHelper'

interface ICourseSidebarPros {}

export default function CourseSidebar({}: ICourseSidebarPros): React.ReactElement {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const translate = useTranslate()

  const CONT_SX = {
    borderRadius: 1,
    background:
      theme.palette.mode === 'light' ? 'rgba(248, 248, 248, 1)' : theme.palette.background.neutral,
    p: 1,
    flex: isDesktop ? '0' : '1 0',
  }

  return (
    <Stack
      sx={{
        flexDirection: {
          xs: 'column',
          sm: 'row',
          md: 'column',
        },
        gap: 1,
      }}
    >
      <Stack sx={CONT_SX}>
        <Typography
          variant='h5'
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 400,
            gap: 1,
          }}
        >
          <GrOverview size={25} /> {translate('courses_course_overview')}
        </Typography>
      </Stack>
      <Stack sx={CONT_SX}>
        <Typography
          variant='h5'
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 400,
            gap: 2,
          }}
        >
          <IoImageOutline size={25} /> {translate('courses_course_who_is_this_for')}
        </Typography>
        <Typography
          variant='body1'
          gutterBottom
        >
          {translate('courses_entry_point')}
        </Typography>
        <Typography variant='body1'>{translate('courses_for_beginners_info')}</Typography>
        <Typography
          variant='caption'
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3 }}
        >
          <TbFileCertificate size={20} /> {translate('courses_sample_certificate')}
        </Typography>
      </Stack>
      <Stack sx={CONT_SX}>
        <Typography
          variant='h5'
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 400,
            gap: 1,
          }}
        >
          <IoImageOutline size={25} /> {translate('courses_for_teachers')}
        </Typography>
        <Typography
          variant='body1'
          mb={3}
        >
          {translate('courses_for_teachers_info')}
        </Typography>
        <Link
          href='#'
          component={NextLink}
          color='inherit'
          underline='always'
        >
          {translate('courses_pacing_guides_link')}
        </Link>
        <Link
          href='#'
          component={NextLink}
          color='inherit'
          underline='always'
        >
          {translate('courses_standards_alignment_link')}
        </Link>
      </Stack>
    </Stack>
  )
}
