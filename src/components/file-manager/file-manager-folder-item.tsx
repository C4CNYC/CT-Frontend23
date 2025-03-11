import { useState, useCallback } from 'react'
import React from 'react'

import { Button, SelectChangeEvent } from '@mui/material'
import Box from '@mui/material/Box'
import { CardProps } from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { AiFillEye } from '@react-icons/all-files/ai/AiFillEye'
import { BsArrowsMove } from '@react-icons/all-files/bs/BsArrowsMove'
import { CgMoreVerticalAlt } from '@react-icons/all-files/cg/CgMoreVerticalAlt'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'
import { GoPencil } from '@react-icons/all-files/go/GoPencil'
import pick from 'lodash-es/pick'

import CustomPopover, { usePopover } from '@/components/custom-popover'
import {
  useUpdateMediaMutation,
  useUpdateMediaPathMutation,
} from '@/redux/services/manager/media-manager'

import { useProfileQuery } from '../../redux/services/auth'
import { IMediaUpdate } from '../../redux/services/interfaces/media.interface'
import { IFolderManager } from '../../types/file'
import { ConfirmDialog } from '../confirm-dialog/ConfirmDialog'

import FileManagerMoveFolderDialog from './file-manager-move-folder'
import FileManagerNewFolderDialog from './file-manager-new-folder-dialog'

interface Props extends CardProps {
  folder: IFolderManager
  onDelete: () => Promise<void>
  onSelect: VoidFunction
  paths: string[]
}

export default function FileManagerFolderItem({
  folder,
  onDelete,
  onSelect,
  sx,
  paths,
  ...other
}: Props) {
  const [folderName, setFolderName] = useState(folder.name)
  const [folderPath, setFolderPath] = useState(folder.path.replace(/^\//, ''))

  const [editFolder, setEditFolder] = useState<boolean>(false)

  const [moveFolder, setMoveFolder] = useState<boolean>(false)

  const popover = usePopover()

  const { data: user } = useProfileQuery()

  const [confirm, setConfirm] = useState<boolean>(false)

  const [updateMedia] = useUpdateMediaMutation()
  const [updateMediaPath] = useUpdateMediaPathMutation()

  const handleChangeFolderName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value)
  }, [])

  const handleChangeFolderPath = useCallback((event: SelectChangeEvent) => {
    setFolderPath(event.target.value)
  }, [])

  const renderAction = (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        top: 8,
        right: 8,
        position: 'absolute',
      }}
    >
      <IconButton
        color={popover.open ? 'inherit' : 'default'}
        onClick={popover.onOpen}
      >
        <CgMoreVerticalAlt />
      </IconButton>
    </Stack>
  )

  const renderIcon = (
    <Box
      component='img'
      src='/assets/icons/files/ic_folder.svg'
      sx={{ width: 36, height: 36 }}
    />
  )

  const renderText = (
    <ListItemText
      onClick={onSelect}
      primary={folder.name}
      primaryTypographyProps={{
        noWrap: true,
        typography: 'subtitle1',
      }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        alignItems: 'center',
        typography: 'caption',
        color: 'text.disabled',
        display: 'inline-flex',
      }}
    />
  )

  return (
    <>
      <Stack
        component={Paper}
        variant='outlined'
        spacing={1}
        alignItems='flex-start'
        sx={{
          p: 2.5,
          maxWidth: 222,
          borderRadius: 2,
          bgcolor: 'unset',
          cursor: 'pointer',
          position: 'relative',
          ...sx,
        }}
        {...other}
      >
        <Box onClick={onSelect}>{renderIcon}</Box>

        {renderAction}

        {renderText}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow='right-top'
        sx={{ width: 180 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose()
            setEditFolder(true)
          }}
        >
          <GoPencil />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose()
            setMoveFolder(true)
          }}
        >
          <BsArrowsMove />
          Move
        </MenuItem>

        {folder?.userId && user?.id === folder?.userId && (
          <MenuItem
            onClick={async () => {
              await updateMedia({
                ...(pick(folder, ['id', 'size', 'type', 'url', 'active', 'name']) as Omit<
                  IMediaUpdate,
                  'acl'
                >),
                acl: folder.acl === 'public' ? 'private' : 'public',
              })
              popover.onClose()
            }}
          >
            <AiFillEye />
            Make it {folder.acl === 'public' ? 'private' : 'public'}
          </MenuItem>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            setConfirm(true)
            popover.onClose()
          }}
          sx={{ color: 'error.main' }}
        >
          <FiTrash2 />
          Delete
        </MenuItem>
      </CustomPopover>

      <FileManagerNewFolderDialog
        open={editFolder}
        onClose={() => setEditFolder(false)}
        title='Edit Folder'
        onUpdate={async () => {
          setEditFolder(false)
          await updateMediaPath({
            path: (folder.path + '/' + folder.name + '/').replace(/^\//, ''),
            newPath: (folder.path + '/' + folderName + '/').replace(/^\//, ''),
          })
        }}
        folderName={folderName}
        onChangeFolderName={handleChangeFolderName}
      />

      <FileManagerMoveFolderDialog
        open={moveFolder}
        onClose={() => setMoveFolder(false)}
        onUpdate={async () => {
          setMoveFolder(false)
          await updateMediaPath({
            path: (folder.path + '/' + folder.name + '/').replace(/^\//, ''),
            newPath: (folderPath + '/' + folder.name + '/').replace(/^\/+/, ''),
          })
        }}
        actualPath={folder.path.replace(/^\//, '')}
        folderPath={folderPath}
        onChangeFolderPath={handleChangeFolderPath}
        path={(folder.path + '/' + folder.name + '/').replace(/^\//, '')}
        paths={paths}
      />

      <ConfirmDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        title='Delete'
        content='Are you sure want to delete?'
        action={
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              onDelete().then(() => setConfirm(false))
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  )
}
