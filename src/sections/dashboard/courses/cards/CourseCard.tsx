import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Box, Card, Divider, IconButton, MenuItem, Stack, Typography } from '@mui/material'
import { CgMoreVerticalAlt } from '@react-icons/all-files/cg/CgMoreVerticalAlt'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'
import { GoPencil } from '@react-icons/all-files/go/GoPencil'
import Link from 'next/link'

import { useAuthContext } from '@/auth/useAuthContext'
import { ConfirmDialog, Image, Label, MenuPopover, useSnackbar } from '@/components'
import { Role } from '@/redux/services/enums/role.enum'
import { ICourse } from '@/redux/services/interfaces/courseUnits.interface'
import { useDeleteCourseMutation } from '@/redux/services/manager/courses-manager'
import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'
import CreateCourseDialog from '@root/src/sections/dashboard/courses/create-course-dialog'

interface ICourseCardProps {
  course: ICourse & BaseResponseInterface
  refetch: () => void
}

export default function CourseCard({
  course,
  refetch,
}: ICourseCardProps): React.ReactElement | null {
  const translate = useTranslate()
  const { user } = useAuthContext()
  const isAdmin = user?.role === Role.Admin
  const isSuperAdmin = user?.role === Role.SuperAdmin
  const { enqueueSnackbar } = useSnackbar()

  const [openConfirm, setOpenConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const [deleteCourse] = useDeleteCourseMutation()

  const { name, level, price, description, active, cover, is_global } = course

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false)
  }

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  const onDelete = async (): Promise<void> => {
    setLoading(true)
    try {
      await deleteCourse({ id: course.id }).unwrap()
      setLoading(false)
      setOpenConfirm(false)
      enqueueSnackbar(translate('courses_delete_msg'))
      if (refetch) refetch()
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
        variant: 'error',
      })
    }
  }

  return (
    <>
      <Card
        sx={{
          textAlign: 'center',
          pb: 2,
          textDecoration: 'none',
          border: '1px solid transparent',
          '&:hover': {
            borderColor: 'grey.400',
            borderWidth: 1,
            borderStyle: 'solid',
          },
        }}
        component={Link}
        href={`${MANAGER_PATH_DASHBOARD.modules.root}?course_id=${course.id}`}
      >
        {(isAdmin && !is_global) || isSuperAdmin ? (
          <Stack
            direction='row'
            alignItems='center'
            sx={{ zIndex: 2, top: 8, right: 8, position: 'absolute' }}
          >
            <IconButton
              color={openPopover ? 'inherit' : 'default'}
              onClick={handleOpenPopover}
            >
              <CgMoreVerticalAlt />
            </IconButton>
          </Stack>
        ) : (
          ''
        )}
        <Box
          sx={{
            position: 'relative',
            borderBottom: '1px solid rgba(145, 158, 171, 0.24)',
          }}
        >
          <Image
            src={cover ?? '/assets/icons/files/ic_folder.svg'}
            alt={cover}
            ratio='16/9'
            style={{ objectFit: 'contain', padding: 10 }}
          />
        </Box>

        <Box sx={{ position: 'relative' }}>
          {is_global ? (
            <Label
              variant='soft'
              color={'info'}
              sx={{
                textTransform: 'uppercase',
                mr: 'auto',
                position: 'absolute',
                top: 10,
                left: 10,
              }}
            >
              Global
            </Label>
          ) : (
            ''
          )}
          <Label
            variant='soft'
            color={active ? 'success' : 'error'}
            sx={{
              textTransform: 'uppercase',
              mr: 'auto',
              position: 'absolute',
              top: 10,
              right: 10,
            }}
          >
            {active ? translate('active') : translate('not_active')}
          </Label>
          <Typography
            variant='subtitle1'
            sx={{ pt: 6, mb: 0.5 }}
          >
            {name}
          </Typography>

          <Typography
            noWrap
            textAlign='center'
            variant='body2'
            sx={{ color: 'text.secondary', px: 3 }}
          >
            {description}
          </Typography>
        </Box>

        <Box
          display='grid'
          gridTemplateColumns='repeat(2, 1fr)'
          sx={{ pt: 3 }}
        >
          <div>
            <Typography
              variant='caption'
              component='div'
              sx={{ mb: 0.75, color: 'text.disabled' }}
            >
              {translate('level')}
            </Typography>
            <Typography
              variant='subtitle1'
              textTransform='capitalize'
            >
              {level}
            </Typography>
          </div>

          <div>
            <Typography
              variant='caption'
              component='div'
              sx={{ mb: 0.75, color: 'text.disabled' }}
            >
              {translate('price')}
            </Typography>
            <Typography variant='subtitle1'>
              {+price.substring(1) === 0 ? 'free' : price}
            </Typography>
          </div>
        </Box>
      </Card>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow='right-top'
        sx={{ width: 160 }}
      >
        <CreateCourseDialog
          isEdit
          id={course.id}
          defaultValues={{
            name: course.name,
            content_id: course.content_id === course.name ? '' : course.content_id,
            level: course.level,
            customLevel: course.customLevel,
            age: course.age,
            customAge: course.customAge,
            price: course.price.substring(1),
            description: course.description,
            active: course.active,
            public: course.public,
            catalog: course.catalog,
            skills: course.skills,
            initial_likes: course.initial_likes,
            initial_stars: course.initial_stars,
            initial_enrolled: course.initial_enrolled,
            audience: course.audience,
            for_teachers: course.for_teachers,
            is_global: course.is_global,
          }}
          refetch={refetch}
        >
          <MenuItem>
            <GoPencil />
            {translate('actions_edit')}
          </MenuItem>
        </CreateCourseDialog>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm()
            handleClosePopover()
          }}
          sx={{ color: 'error.main' }}
        >
          <FiTrash2 />
          {translate('actions_delete')}
        </MenuItem>
      </MenuPopover>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate('actions_delete')}
        content={translate('messages_delete_question')}
        action={
          <LoadingButton
            variant='contained'
            color='error'
            onClick={onDelete}
            loading={loading}
          >
            {translate('actions_delete')}
          </LoadingButton>
        }
      />
    </>
  )
}
