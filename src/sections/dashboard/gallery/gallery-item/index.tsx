import { useMemo, useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Box, IconButton, Link, Paper, Stack } from '@mui/material'
import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical'
import { FiExternalLink } from '@react-icons/all-files/fi/FiExternalLink'
import NextLink from 'next/link'
import { useSnackbar } from 'notistack'

import { APIError } from '@/redux/interfaces/custom-error.interface'
import { useRemoveProjectMutation } from '@/redux/services/manager/gallery-student'
import { PATH_MAIN } from '@/routes/paths'
import { ConfirmDialog } from '@root/src/components/confirm-dialog/ConfirmDialog'
import { Image } from '@root/src/components/image/Image'
import { Label } from '@root/src/components/label/Label'
import { useBoolean } from '@root/src/hooks/use-boolean'
import { IGallery } from '@root/src/redux/interfaces/gallery.interface'
import { useTranslate } from '@root/src/utils/translateHelper'

import { GALLERY_ITEM_PAPER_SX, GALLERY_ITEM_TOP_ACTIONS_SX } from '../constants'
import { GalleryProvider } from '../context/gallery-context'
import { useGalleryDrawerContext } from '../context/gallery-drawer-context'
import GalleryDrawer from '../gallery-drawer'

import ElementInfo from './ElementInfo'
import ElementMenu from './ElementMenu'
import GalleryItemSkills from './GalleryItemSkills'

type Props = {
  project: IGallery
}

export default function GalleryItem({ project }: Props): React.ReactElement {
  const translate = useTranslate()
  const { enqueueSnackbar } = useSnackbar()
  const drawer = useBoolean()
  const { getCurrentProject, currentProject } = useGalleryDrawerContext()

  const { public: projectPublic, cover, id } = project

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const [openConfirm, setOpenConfirm] = useState(false)

  const isActive = useMemo(
    () => project.id === currentProject?.id,
    [project.id, currentProject?.id]
  )

  const [deleteProject, { isLoading }] = useRemoveProjectMutation()

  const handleOpenPopover = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    setOpenPopover(e.currentTarget)
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

  const onDelete = async (): Promise<void> => {
    try {
      await deleteProject({ id }).unwrap()
      enqueueSnackbar(translate('actions_deleted'))
    } catch (error: any) {
      const typedError = error as APIError
      enqueueSnackbar(typedError.data.message, {
        variant: 'error',
      })
    }
  }

  return (
    <GalleryProvider project={project}>
      <Box sx={{ position: 'relative', '&:hover': { cursor: 'pointer' } }}>
        <Stack sx={GALLERY_ITEM_TOP_ACTIONS_SX}>
          <Label
            variant='soft'
            color={projectPublic ? 'success' : 'warning'}
            sx={{ textTransform: 'uppercase' }}
          >
            {translate(
              projectPublic ? 'gallery_folder_public_title' : 'gallery_folder_private_title'
            )}
          </Label>
          <Stack direction='row'>
            {projectPublic ? (
              <IconButton>
                <Link
                  href={PATH_MAIN.galleryPublic.project(id)}
                  component={NextLink}
                  target='_blank'
                  sx={{ display: 'flex' }}
                >
                  <FiExternalLink
                    color='#333'
                    size='20px'
                  />
                </Link>
              </IconButton>
            ) : null}

            <IconButton
              onClick={(e) => {
                handleOpenPopover(e)
              }}
            >
              <BsThreeDotsVertical
                color='#333'
                size='20px'
              />
            </IconButton>
          </Stack>
        </Stack>

        <Paper
          onClick={(e) => {
            e.stopPropagation()
            drawer.onTrue()
            getCurrentProject(project.id)
          }}
          elevation={isActive ? 20 : 5}
          sx={{
            ...GALLERY_ITEM_PAPER_SX,
            ...{
              boxShadow: isActive
                ? '0px 8px 16px rgba(67, 212, 221, 0.3)'
                : '0px 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Image
            src={cover ?? '/assets/background/overlay_2.jpg'}
            sx={{
              height: '250px',
              '& .wrapper': {
                backgroundSize: 'contain !important',
              },
              border: '.4rem solid #fff',
            }}
            alt=''
          />
          <Stack
            direction='column'
            sx={{ p: '7px 15px 20px' }}
          >
            <ElementInfo />
            <GalleryItemSkills />
            {/* return as soon as backend will be updated */}
            {/* <ProjectStatistic /> */}
          </Stack>
        </Paper>
        <ElementMenu
          openPopover={openPopover}
          handleClosePopover={handleClosePopover}
          handleOpenConfirm={handleOpenConfirm}
        />
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title={translate('gallery_delete_project')}
          content={translate('gallery_delete_confirm')}
          action={
            <LoadingButton
              variant='contained'
              color='error'
              onClick={onDelete}
              loading={isLoading}
            >
              {translate('actions_delete')}
            </LoadingButton>
          }
        />
      </Box>
      <GalleryDrawer drawer={drawer} />
    </GalleryProvider>
  )
}
