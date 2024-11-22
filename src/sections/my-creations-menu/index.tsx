import { useState } from 'react'

import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'

import {
  useCreateByCloningLessonMutation,
  useCreateLessonMutation,
} from '@/redux/services/manager/lessons-manager'
import RoleBasedGuard from '@root/src/auth/RoleBasedGuard'
import { Iconify, Image, MenuPopover, useSettingsContext } from '@root/src/components'
import { StyledIcon, StyledItem } from '@root/src/components/nav-section/mini/styles'
import {
  StyledIcon as StyledIconVertical,
  StyledItem as StyledItemVertical,
} from '@root/src/components/nav-section/vertical/styles'
import { useResponsive } from '@root/src/hooks'
import { useLocales } from '@root/src/locales'
import { Role } from '@root/src/redux/services/enums/role.enum'
import { STUDENT_PATH_DASHBOARD } from '@root/src/routes/student.paths'

import AiGenerateLessonDialog from './ai-generate-lesson-dialog'
import DiamondFeatureModal from './diamond-feature-modal'
import SelectLanguageModal from './select-language-dialog'

export default function MyCreationsMenu(): React.ReactElement {
  const { translate } = useLocales()
  const { themeLayout } = useSettingsContext()
  const isDesktop = useResponsive('up', 'md')
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const router = useRouter()
  const [createLesson] = useCreateLessonMutation()
  const [createByCloningLesson, { isLoading: isCreateBCLLoading }] =
    useCreateByCloningLessonMutation()

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  async function createByCloningLessonHandler() {
    let data = await createByCloningLesson()
    if ((data as any)?.data?.id) {
      router.push(
        `${STUDENT_PATH_DASHBOARD.myLessons}?${new URLSearchParams({ lessonId: (data as any).data.id })}`,
        undefined,
        {
          shallow: true,
        }
      )
    }
  }

  const createNewLesson = async () => {
    const lesson = await createLesson({
      name: translate('my_new_lesson') as string,
      description: translate('my_lesson_description') as string,
      active: true,
      duration: '60',
    }).unwrap()
    return lesson
  }

  return (
    <>
      <RoleBasedGuard roles={[Role.Admin, Role.Manager, Role.Owner]}>
        {themeLayout === 'vertical' || !isDesktop ? (
          <StyledItemVertical
            depth={1}
            onClick={handleOpenPopover}
          >
            <StyledIconVertical>
              <Image
                src='/assets/my-creations-menu/unicorn.svg'
                alt=''
              />
            </StyledIconVertical>
            <ListItemText
              primary={`${translate('sidebar_menu_my_creations')}`}
              primaryTypographyProps={{
                noWrap: true,
                component: 'span',
                variant: openPopover ? 'subtitle2' : 'body2',
                fontSize: 18,
              }}
              secondaryTypographyProps={{
                noWrap: true,
                variant: 'caption',
              }}
            />
          </StyledItemVertical>
        ) : (
          <StyledItem
            depth={1}
            onClick={handleOpenPopover}
          >
            <StyledIcon>
              <Image
                src='/assets/my-creations-menu/unicorn.svg'
                alt=''
              />
            </StyledIcon>
            <ListItemText
              primary={`${translate('sidebar_menu_my_creations')}`}
              primaryTypographyProps={{
                noWrap: true,
                sx: {
                  width: 72,
                  fontSize: 10,
                  lineHeight: '16px',
                  textAlign: 'center',
                },
              }}
            />
          </StyledItem>
        )}

        <MenuPopover
          open={openPopover}
          onClose={handleClosePopover}
          arrow='left-center'
          anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        >
          <AiGenerateLessonDialog>
            <MenuItem sx={{ justifyContent: 'space-between' }}>
              Mumu AI Creator
              <ListItemIcon sx={{ pl: 2, mr: -2 }}>
                <Iconify
                  icon='mingcute:ai-line'
                  color='#FBDD3F'
                />
              </ListItemIcon>
            </MenuItem>
          </AiGenerateLessonDialog>
          <SelectLanguageModal
            onSubmit={async () => {
              await createByCloningLessonHandler()
            }}
            isLoading={isCreateBCLLoading}
          >
            <MenuItem>Add New Lesson</MenuItem>
          </SelectLanguageModal>
          <MenuItem
            onClick={() => {
              router.push(STUDENT_PATH_DASHBOARD.myLessons, undefined, {
                shallow: true,
              })
              handleClosePopover()
            }}
          >
            My Lessons
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push(STUDENT_PATH_DASHBOARD.myModules, undefined, {
                shallow: true,
              })
              handleClosePopover()
            }}
          >
            My Modules
          </MenuItem>
          <DiamondFeatureModal>
            <MenuItem sx={{ justifyContent: 'space-between' }}>
              My Courses
              <ListItemIcon sx={{ pl: 2, mr: -2 }}>
                <Iconify
                  icon='ion:diamond-outline'
                  color='#43D4DD'
                />
              </ListItemIcon>
            </MenuItem>
          </DiamondFeatureModal>
          <DiamondFeatureModal>
            <MenuItem sx={{ justifyContent: 'space-between' }}>
              Integrations
              <ListItemIcon
                sx={{
                  pl: 2,
                  mr: -2,
                }}
              >
                <Iconify
                  icon='ion:diamond-outline'
                  color='#43D4DD'
                />
              </ListItemIcon>
            </MenuItem>
          </DiamondFeatureModal>
          <DiamondFeatureModal>
            <MenuItem sx={{ justifyContent: 'space-between' }}>
              Templates
              <ListItemIcon
                sx={{
                  pl: 2,
                  mr: -2,
                }}
              >
                <Iconify
                  icon='ion:diamond-outline'
                  color='#43D4DD'
                />
              </ListItemIcon>
            </MenuItem>
          </DiamondFeatureModal>
        </MenuPopover>
      </RoleBasedGuard>
    </>
  )
}
