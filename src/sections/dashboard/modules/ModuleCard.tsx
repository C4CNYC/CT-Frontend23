import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Box, Card, Divider, IconButton, MenuItem, Stack, Typography } from '@mui/material'
import { CgArrowsExchangeV } from '@react-icons/all-files/cg/CgArrowsExchangeV'
import { CgMoreVerticalAlt } from '@react-icons/all-files/cg/CgMoreVerticalAlt'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'
import { GoPencil } from '@react-icons/all-files/go/GoPencil'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useDeleteModuleMutation } from '@/redux/services/manager/modules-manager'
import CreateModuleDialog from '@/sections/dashboard/modules/CreateModuleDialog'
import { useTranslate } from '@/utils/translateHelper'
import { ConfirmDialog } from '@root/src/components/confirm-dialog/ConfirmDialog'
import { Label } from '@root/src/components/label/Label'
import { MenuPopover } from '@root/src/components/menu-popover/MenuPopover'
import { useSnackbar } from '@root/src/components/snackbar'
import { TextMaxLine } from '@root/src/components/text-max-line/TextMaxLine'

export default function ModuleCard({ module, refetch }: any): React.ReactElement | null {
  const router = useRouter()
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()

  const [openConfirm, setOpenConfirm] = useState(false)
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const [loading, setLoading] = useState(false)

  const [deleteModule] = useDeleteModuleMutation()

  const openContentCreationTool = (): void => {
    router.push(`${router.pathname}?${new URLSearchParams({ moduleId: module.id })}`, undefined, {
      shallow: true,
    })
  }

  const onDelete = async (): Promise<void> => {
    setLoading(true)
    try {
      await deleteModule({ id: module.id }).unwrap()
      handleCloseConfirm()
      enqueueSnackbar(translate('modules_deleted_msg'))
      if (refetch) refetch()
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
        variant: 'error',
      })
    }
    setLoading(false)
  }

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false)
  }

  const handleOpenPopover = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    setOpenPopover(event.currentTarget)
    event.stopPropagation()
    event.preventDefault()
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  const getDurationString = (obj: Record<string, number>) => {
    let str = ''
    for (const [key, value] of Object.entries(obj)) {
      str += `${value} ${key} `
    }
    return str
  }

  return (
    <>
      <Card
        component={Link}
        href={`${router.pathname}?${new URLSearchParams({ moduleId: module.id })}`}
        sx={{
          textDecoration: 'none',
          p: 2.5,
          width: 1,
          boxShadow: 0,
          bgcolor: (theme) => theme.palette.background.paper,
          maxWidth: 'auto',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          '&:hover': {
            border: (theme) => `solid 1px ${theme.palette.text.secondary}`,
          },
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          sx={{ top: 8, right: 8, position: 'absolute' }}
        >
          <IconButton
            color={openPopover ? 'inherit' : 'default'}
            onClick={handleOpenPopover}
          >
            <CgMoreVerticalAlt />
          </IconButton>
        </Stack>
        <Label
          variant='soft'
          color={module.active ? 'success' : 'error'}
          sx={{
            textTransform: 'uppercase',
            mr: 'auto',
            position: 'absolute',
            top: 10,
            left: 10,
          }}
        >
          {module.active ? translate('active') : translate('not_active')}
        </Label>

        <Box
          component='img'
          src={module.avatar ?? '/assets/icons/files/ic_folder.svg'}
          alt={module.avatar}
          sx={{ width: 40, height: 40, mt: 4 }}
        />

        <TextMaxLine
          variant='h6'
          sx={{ mt: 1, mb: 0.5 }}
        >
          {module.name}
        </TextMaxLine>

        <Stack
          direction='row'
          alignItems='center'
          spacing={0.75}
          sx={{ typography: 'caption', color: 'text.disabled' }}
        >
          <Typography
            variant='caption'
            noWrap
          >
            {module.description}
          </Typography>
          <Box
            sx={{
              width: 2,
              height: 2,
              borderRadius: '50%',
              bgcolor: 'currentColor',
            }}
          />
        </Stack>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow='right-top'
        sx={{ width: 160 }}
      >
        <CreateModuleDialog
          isEdit
          id={module.id}
          defaultValues={{
            name: module.name,
            description: module.description as string,
            active: module.active as boolean,
            tips: '',
            duration: module.duration ? getDurationString(module.duration) : '',
            teacher_slides: module.teacher_slides as string,
            teacher_forum: module.teacher_forum as string,
            lesson_plans: module.lesson_plans as string,
            initial_likes: module.initial_likes as number,
            initial_stars: module.initial_stars as number,
            initial_enrolled: module.initial_enrolled as number,
          }}
          moduleTips={module.tips}
          refetch={refetch}
        >
          <MenuItem>
            <GoPencil />
            {translate('actions_edit')}
          </MenuItem>
        </CreateModuleDialog>

        <MenuItem onClick={() => openContentCreationTool()}>
          <CgArrowsExchangeV
            style={{
              marginLeft: '16px',
            }}
          />
          {translate('rearrange')}
        </MenuItem>

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
