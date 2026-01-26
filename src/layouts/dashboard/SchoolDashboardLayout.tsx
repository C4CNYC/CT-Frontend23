import React from 'react'

import { Button, Typography } from '@mui/material'
import { m } from 'framer-motion'
import Link from 'next/link'

import PageNotFoundIllustration from '@/assets/illustrations/PageNotFoundIllustration'
import { MotionContainer, varBounce } from '@/components/animate'
import RoleBasedGuard from '@/auth/RoleBasedGuard'
import { Role } from '@/redux/services/enums/role.enum'
import SkeletonPanel from '@/layouts/dashboard/SkeletonPanel'
import { useGetMySchoolsQuery } from '@/redux/services/manager/schools-manager'
import { RootState, useSelector } from '@/redux/store'

import CompactLayout from '../compact'

import DashboardLayout from './DashboardLayout'

interface Props {
  children: React.ReactElement
  isFullScreen?: boolean
}
export function SchoolDashboardLayout({
  children,
  isFullScreen,
}: Props): React.ReactElement | null {
  const { data, isLoading } = useGetMySchoolsQuery({})
  const schoolId = useSelector((state: RootState) => state.manager.schoolId)

  // useEffect(() => {
  //   if (!data?.data) return
  //   dispatch(setSchool(!(schoolId === '') ? schoolId : data.data[0] ? data.data[0].id : ''))
  // }, [data])

  if (!data?.data.length && !isLoading) {
    return (
      <CompactLayout>
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <Typography
              variant='h3'
              paragraph
            >
              No school found!
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, you don't have access to any school. Please contact your administrator.
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <PageNotFoundIllustration
              sx={{
                height: 260,
                my: { xs: 5, sm: 10 },
              }}
            />
          </m.div>

          <RoleBasedGuard roles={[Role.SuperAdmin, Role.Admin, Role.Owner]}>
            <Button
              component={Link}
              href='/manager/organization/schools'
              size='large'
              variant='contained'
              sx={{ mr: 2 }}
            >
              Create School
            </Button>
          </RoleBasedGuard>

          <Button
            component={Link}
            href='/'
            size='large'
            variant='outlined'
          >
            Contact Admin
          </Button>
        </MotionContainer>
      </CompactLayout>
    )
  }

  if (isFullScreen) return isLoading ? <SkeletonPanel /> : children

  return <DashboardLayout>{isLoading ? <></> : children}</DashboardLayout>
}
