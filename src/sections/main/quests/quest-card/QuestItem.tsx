import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Divider, IconButton, Link, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'
import { GoPencil } from '@react-icons/all-files/go/GoPencil'
import { RiExternalLinkLine } from '@react-icons/all-files/ri/RiExternalLinkLine'
import { format, formatDistanceToNow } from 'date-fns'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import RoleBasedGuard from '@/auth/RoleBasedGuard'
import { ConfirmDialog, MenuPopover } from '@/components'
import { Iconify } from '@/components/iconify'
import { AssignmentTypes } from '@/redux/enums/assignment-types.enum'
import { IAssignmentReduced } from '@/redux/interfaces/assignment.interface'
import { Role } from '@/redux/services/enums/role.enum'
import { useDeleteAssignmentMutation } from '@/redux/services/manager/assignments-manager'
import { useGetModuleWithLessonsQuery } from '@/redux/services/manager/modules-student'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useTranslate } from '@/utils/translateHelper'
interface IQuestItemProps {
  assignment: IAssignmentReduced
  schoolId: string
  index: number
}

export default function QuestItem({
  assignment,
  schoolId,
  index,
}: IQuestItemProps): React.ReactElement {
  const { query } = useRouter()
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const translate = useTranslate()

  const isLight = theme.palette.mode === 'light'

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const [openConfirm, setOpenConfirm] = useState(false)

  const [deleteAssignment, { isLoading: isDeleting }] = useDeleteAssignmentMutation()

  const onDelete = async () => {
    try {
      await deleteAssignment({
        schoolId,
        assignmentId: assignment.id,
      }).unwrap()
      enqueueSnackbar(translate('home_assignment_deleted'))
    } catch (e: any) {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
    handleCloseConfirm()
  }

  const editAssignmentPath = STUDENT_PATH_DASHBOARD.class.addQuest(query.id as string, {
    schoolId,
    assignmentId: assignment.id,
  })
  const assignmentPath = STUDENT_PATH_DASHBOARD.quest.id(assignment.id, {
    schoolId,
  })

  const { data: courseUnit } = useGetModuleWithLessonsQuery(
    { id: assignment.courseunitid as string },
    { skip: !assignment.courseunitid }
  )

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false)
  }

  return (
    <>
      <Link
        component={NextLink}
        href={assignmentPath}
        underline='none'
        color={isLight ? 'initial' : '#E6F5FD'}
        className={index === 0 ? 'studentJoinStep4 tourMainStep4' : ''}
      >
        <Stack
          sx={{
            backgroundColor: isLight ? '#E6F5FD' : theme.palette.background.paper,
            borderRadius: '10px',
            py: 1,
            px: 2,
            flexDirection: { md: 'row' },
          }}
        >
          <Stack sx={{ width: '100%', gap: 2 }}>
            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <Stack
                gap={2}
                sx={{ flexDirection: { sm: 'row' } }}
              >
                <Typography variant='body2'>
                  {formatDistanceToNow(new Date(assignment.createdat), {
                    addSuffix: true,
                  })}
                </Typography>
                <Typography variant='body2'>
                  {translate('due')}: {format(new Date(assignment.end_date), 'MMM.dd.yyyy')}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <Typography
                variant='h5'
                color={isLight ? '#364954' : '#E6F5FD'}
              >
                {assignment.name}
              </Typography>
              <Box
                display='flex'
                gap={1}
                alignItems='center'
              >
                <Typography variant='subtitle1'>{assignment.course_progress ?? '0'} % </Typography>
                <Iconify
                  icon='bx:award'
                  sx={{ color: '#EE467A' }}
                />
                <Iconify
                  icon='flat-color-icons:ok'
                  sx={{ color: '#75CF6D' }}
                />
              </Box>
            </Stack>
            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <Link
                component={NextLink}
                href={
                  assignment?.courseid
                    ? assignment.lessonid &&
                      (assignment.type === AssignmentTypes.MY_CREATIONS ||
                        assignment.type === AssignmentTypes.OPEN_PROJECT)
                      ? STUDENT_PATH_DASHBOARD.codePanel.workSpace({
                          courseId: assignment.courseid,
                          lessonId: assignment.lessonid,
                        })
                      : assignment.courseunitid &&
                          courseUnit &&
                          assignment.type === AssignmentTypes.COURSE
                        ? STUDENT_PATH_DASHBOARD.codePanel.workSpace({
                            courseId: assignment.courseid,
                            unitId: assignment.courseunitid,
                            lessonId: courseUnit?.lessons[0]?.id,
                          })
                        : STUDENT_PATH_DASHBOARD.codePanel.workSpace({
                            courseId: assignment.courseid,
                            lessonId: assignment.lessonid || courseUnit?.lessons[0]?.id,
                            unitId: assignment.courseunitid,
                          })
                    : STUDENT_PATH_DASHBOARD.codePanel.workSpace({
                        lessonId: assignment.lessonid,
                        unitId: assignment.courseunitid,
                      })
                }
                underline='none'
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'inherit',
                }}
              >
                {translate('keep_coding')}
                <Iconify
                  icon='maki:arrow'
                  width={18}
                  style={{ marginLeft: '3px', marginRight: '3px' }}
                />
              </Link>
              <Link
                component={NextLink}
                href={assignmentPath}
                underline='none'
                sx={(theme) => ({
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: theme.palette.grey[500],
                })}
              >
                {translate('actions_see_more')}
                <RiExternalLinkLine
                  size={15}
                  style={{ marginLeft: '3px' }}
                />
              </Link>
            </Stack>
          </Stack>
          <Divider
            orientation='vertical'
            variant='middle'
            flexItem
            sx={(theme) => ({
              ml: 2,
              mr: 1,
              borderLeftWidth: '2px',
              borderColor: theme.palette.grey[500],
            })}
          />
          <Stack
            alignSelf='flex-end'
            sx={(theme) => ({
              color: theme.palette.grey[500],
              flexDirection: { xs: 'row', sm: 'row', md: 'column' },
            })}
          >
            <Stack direction='row'>
              <RoleBasedGuard
                roles={[Role.SuperAdmin, Role.Admin, Role.Manager, Role.Owner, Role.Editor]}
              >
                <IconButton onClick={handleOpenPopover}>
                  <Iconify
                    icon='pepicons-pop:dots-y'
                    width={22}
                  />
                </IconButton>
              </RoleBasedGuard>
            </Stack>
          </Stack>
        </Stack>
      </Link>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        disabledArrow
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: -5, horizontal: 5 }}
      >
        <Link
          component={NextLink}
          href={editAssignmentPath}
          underline='none'
          color={isLight ? 'initial' : '#E6F5FD'}
        >
          <MenuItem>
            <GoPencil />
            {translate('actions_edit')}
          </MenuItem>
        </Link>
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
            loading={isDeleting}
          >
            {translate('actions_delete')}
          </LoadingButton>
        }
      />
    </>
  )
}
