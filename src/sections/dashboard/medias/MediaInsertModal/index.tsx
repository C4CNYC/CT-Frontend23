import React from 'react'
import { useCallback, useEffect } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Collapse, Divider, IconButton, Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Stack } from '@mui/system'
import { useSnackbar } from 'notistack'

import { CustomBreadcrumbs } from '@/components'
import FileManagerFileItem from '@/components/file-manager/file-manager-file-item'
import FileManagerFolderItem from '@/components/file-manager/file-manager-folder-item'
import FileManagerNewFolderDialog from '@/components/file-manager/file-manager-new-folder-dialog'
import FileManagerPanel from '@/components/file-manager/file-manager-panel'
import { useCopyToClipboard } from '@/hooks'
import { IMedia } from '@/redux/services/interfaces/media.interface'
import {
  useCreateMediaMutation,
  useDeleteMediaMutation,
  useGetAllMediaQuery,
  useUploadMediaFileMutation,
} from '@/redux/services/manager/media-manager'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'
import { imageResize } from '@root/src/utils/imageResize'

export interface ImageAttributes {
  align?: 'center' | 'end' | 'justify' | 'left' | 'match-parent' | 'right' | 'start'
  alt?: string
  height?: string | number
  width?: string | number
  rotate?: string
  src: string
  title?: string
  /** The file name used to create the image. */
  fileName?: string
}

export interface MediaInsertModalProps {
  // children: React.ReactElement
  insertImage?: (attributes: ImageAttributes) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function MediaInsertModal({
  isOpen = false,
  setIsOpen,
  insertImage,
}: MediaInsertModalProps): React.ReactElement | null {
  const { copy } = useCopyToClipboard()
  const { enqueueSnackbar } = useSnackbar()

  const translate = useTranslate()

  const [currentPath, setCurrentPath] = React.useState<string[]>([''])
  const [folderCollapse, setFolderCollapse] = React.useState<boolean>(true)
  const [fileCollapse, setFileCollapse] = React.useState<boolean>(true)
  const [selected, setSelected] = React.useState<string[]>([])
  const [newFolder, setNewFolder] = React.useState<boolean>(false)
  const [newFile, setNewFile] = React.useState<boolean>(false)
  const [fileLoading, setFileLoading] = React.useState<boolean>(false)
  const [newFolderName, setNewFolderName] = React.useState<string>('')
  const [fileUrl, setFileUrl] = React.useState<string | File | null>('')
  const [fileName, setFileName] = React.useState<string>('')
  const [currentPathFiles, setCurrentPathFiles] =
    React.useState<(IMedia & BaseResponseInterface)[]>()

  const { data, isLoading, refetch } = useGetAllMediaQuery({ page: 1, take: 50 })
  const [deleteMedia] = useDeleteMediaMutation()
  const [createMedia] = useCreateMediaMutation()
  const [uploadMediaFile] = useUploadMediaFileMutation()

  if (!insertImage) {
    insertImage = ({ src }: { src: string }) => {
      copy(src)
      enqueueSnackbar(translate('image_url_copied_msg'))
    }
  }

  useEffect(() => {
    setCurrentPathFiles(
      data?.data?.filter((d) => {
        const path = `/${d.name}`.replace(/\/$/, '').split('/')
        path.pop()
        return path.length === currentPath.length && path.every((p, i) => p === currentPath[i])
      })
    )
  }, [data, currentPath])

  const handleClose = (): void => {
    setIsOpen(false)
  }
  const backClick = (): void => {
    const paths = [...currentPath]
    if (paths.length > 1) paths.splice(-1)
    setCurrentPath(paths)
  }

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 2,
    borderRadius: '16px',
    p: 4,
    width: { xs: '90%', sm: '90%', md: '90%' },
  }

  const onDelete = async (id: string) => {
    await deleteMedia({ id })
    refetch()
  }

  const onSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  const handleChangeFolderName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.name === 'file') {
        setFileName(event.target.value)
      } else {
        setNewFolderName(event.target.value)
      }
    },
    [setNewFolderName]
  )
  const FileChangeSuccess = (resDataUrl: string) => {
    setFileUrl(resDataUrl)
    enqueueSnackbar(translate('messages_img_updated'))
    setFileLoading(false)
  }
  const FileChangeError = () => {
    enqueueSnackbar(translate('messages_img_not_updated'), {
      variant: 'error',
    })
    setFileLoading(false)
  }
  const handleFileChange = async (newFile: File) => {
    const file = new FormData()
    setFileName(newFile.name)
    file.append('file', newFile)
    setFileLoading(true)
    try {
      let res: any
      if (newFile.type.startsWith('image/')) {
        let img = document.createElement('img')
        img.onload = () => {
          imageResize(img).then((blob) => {
            let newFileSmall = new File([blob], newFile.name, { type: 'image/webp' })
            file.set('file', newFileSmall)
            uploadMediaFile({ file }).then((res) => {
              if ('error' in res) {
                return FileChangeError()
              }
              FileChangeSuccess(res?.data?.url)
            })
          })
        }
        img.src = URL.createObjectURL(newFile)
      } else {
        res = await uploadMediaFile({ file })
        FileChangeSuccess(res?.data?.data?.url)
      }
    } catch (error: any) {
      FileChangeError()
    }
  }
  const onBreadcrumbClick = (path: string) => {
    const index = currentPath.indexOf(path)
    setCurrentPath(currentPath.slice(0, index + 1))
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {isLoading && (
            <Skeleton
              variant='rectangular'
              height='400px'
            />
          )}
          {!isLoading && (
            <>
              <Stack
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                direction='row'
                mb={3}
              >
                <CustomBreadcrumbs
                  heading={translate('media')}
                  backClick={backClick}
                  links={currentPath.map((p, i) => ({
                    name: i === 0 ? '/' : p,
                    onClick: () => onBreadcrumbClick(p),
                  }))}
                  sx={{
                    mb: { xs: 0 },
                  }}
                />
                <IconButton
                  onClick={handleClose}
                  sx={{ width: '35px', alignSelf: 'flex-start' }}
                  edge='end'
                >
                  <CloseIcon fontSize='small' />
                </IconButton>
              </Stack>
              <Box
                sx={{
                  overflowY: 'scroll',
                  maxHeight: 600,
                }}
              >
                <FileManagerPanel
                  title={translate('folders')}
                  subTitle={`${
                    currentPathFiles?.filter((d) => d.type === 'folder').length
                  } ${translate('folders')}`}
                  onOpen={() => setNewFolder(true)}
                  collapse={folderCollapse}
                  onCollapse={() => {
                    setFolderCollapse(!folderCollapse)
                  }}
                />
                <Collapse
                  in={folderCollapse}
                  unmountOnExit
                >
                  <Box
                    gap={3}
                    display='grid'
                    gridTemplateColumns={{
                      xs: 'repeat(2, 1fr)',
                      sm: 'repeat(3, 1fr)',
                      md: 'repeat(4, 1fr)',
                      lg: 'repeat(6, 1fr)',
                    }}
                  >
                    {currentPathFiles
                      ?.filter((d) => d.type === 'folder')
                      ?.map((file, index) => {
                        const path = file.name.replace(/\/$/, '').split('/')
                        const name = path.pop()
                        return (
                          <FileManagerFolderItem
                            key={index}
                            folder={{
                              id: file.id,
                              name: name ?? file.name,
                              path: path.join('/'),
                              size: 0,
                              type: 'folder',
                              tags: [],
                              totalFiles: 0,
                              acl: file.acl,
                              url: file.url,
                              userId: file.userId,
                              createdAt: file.createdAt,
                              modifiedAt: file.updatedAt,
                            }}
                            onSelect={() => setCurrentPath([...currentPath, name ?? file.name])}
                            onDelete={() => onDelete(file.id)}
                            sx={{ maxWidth: 'auto' }}
                            paths={
                              data?.data?.filter((d) => d.type === 'folder').map((f) => f.name) ?? [
                                '/',
                              ]
                            }
                          />
                        )
                      })}
                  </Box>
                </Collapse>
                <FileManagerNewFolderDialog
                  open={newFolder}
                  label={translate('folder_name')}
                  onClose={() => setNewFolder(false)}
                  title={translate('new_folder')}
                  onCreate={() => {
                    createMedia({
                      url: '',
                      name: `${currentPath.join('/')}/${newFolderName}/`.replace('/', ''),
                      size: 0,
                      type: 'folder',
                      acl: 'public',
                    })
                      .unwrap()
                      .then(() => {
                        setNewFolder(false)
                        setNewFolderName('')
                        refetch()
                      })
                  }}
                  name='folder'
                  folderName={newFolderName}
                  onChangeFolderName={handleChangeFolderName}
                />
                <FileManagerNewFolderDialog
                  open={newFile}
                  onClose={() => setNewFile(false)}
                  label={translate('file_name')}
                  title={translate('new_file')}
                  onCreate={() => {
                    createMedia({
                      url: fileUrl as string,
                      name: `${currentPath.join('/')}/`.replace('/', '') + fileName,
                      size: 0,
                      type: 'image',
                      acl: 'public',
                    })
                      .unwrap()
                      .then(() => {
                        setNewFile(false)
                        setNewFolderName('')
                        setFileName('')
                        setFileUrl('')
                        refetch()
                      })
                  }}
                  name='file'
                  folderName={fileName}
                  onChangeFolderName={handleChangeFolderName}
                  onChangeFile={handleFileChange}
                  fileLoading={fileLoading}
                  fileUrl={fileUrl as string}
                  setFileUrl={setFileUrl}
                />
                <Divider sx={{ my: 5, borderStyle: 'dashed' }} />

                <FileManagerPanel
                  title={translate('files')}
                  subTitle={`${currentPathFiles?.filter((d) => d.type !== 'folder').length} files`}
                  onOpen={() => setNewFile(true)}
                  collapse={fileCollapse}
                  onCollapse={() => {
                    setFileCollapse(!fileCollapse)
                  }}
                />
                <Collapse
                  in={fileCollapse}
                  unmountOnExit
                >
                  <Box
                    display='grid'
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                      lg: 'repeat(4, 1fr)',
                    }}
                    gap={3}
                  >
                    {currentPathFiles
                      ?.filter((d) => d.type !== 'folder')
                      ?.map((file) => {
                        const path = file.name.replace(/\/$/, '').split('/')
                        path.pop()
                        return (
                          <FileManagerFileItem
                            key={file.id}
                            file={{
                              id: file.id,
                              name: file.name.replace(
                                (currentPath.join('/') + '/').replace('/', ''),
                                ''
                              ),
                              path: path.join('/'),
                              url: file.url,
                              size: file.size,
                              type: 'image',
                              tags: [],
                              acl: file.acl,
                              userId: file.userId,
                              dateCreated: file.createdAt,
                              dateModified: file.updatedAt,
                            }}
                            selected={selected.includes(file.id)}
                            onSelect={() => onSelect(file.id)}
                            onDelete={() => onDelete(file.id)}
                            sx={{ maxWidth: 'auto' }}
                            insertImage={insertImage}
                            handleClose={handleClose}
                            paths={
                              data?.data?.filter((d) => d.type === 'folder').map((f) => f.name) ?? [
                                '/',
                              ]
                            }
                          />
                        )
                      })}
                  </Box>
                </Collapse>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  )
}
