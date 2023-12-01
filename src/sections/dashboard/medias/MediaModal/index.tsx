import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Collapse, Divider, IconButton, Skeleton, } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/system";

import {
  useCreateMediaMutation,
  useDeleteMediaMutation,
  useGetAllMediaQuery,
} from "src/redux/services/manager/media-manager";
import { useCommands } from "@remirror/react";

import FileManagerPanel from "src/components/file-manager/file-manager-panel";
import FileManagerFolderItem from "src/components/file-manager/file-manager-folder-item";
import FileManagerNewFolderDialog from "src/components/file-manager/file-manager-new-folder-dialog";
import { useCallback, useEffect } from "react";
import FileManagerFileItem from "src/components/file-manager/file-manager-file-item";
import { CustomBreadcrumbs } from "@components";
import { IMedia } from "src/redux/services/interfaces/media.interface";
import { BaseResponseInterface } from "@utils";
import { useCopyToClipboard } from "@hooks";
import { useSnackbar } from "notistack";

export interface MediaModalProps {
  children: React.ReactElement;
}
export function MediaModal({
  children,
}: MediaModalProps): React.ReactElement | null {
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);

  const [currentPath, setCurrentPath] = React.useState<string[]>([""]);
  const [folderCollapse, setFolderCollapse] = React.useState<boolean>(true)
  const [fileCollapse, setFileCollapse] = React.useState<boolean>(true)
  const [selected, setSelected] = React.useState<string[]>([]);
  const [newFolder, setNewFolder] = React.useState<boolean>(false);
  const [newFolderName, setNewFolderName] = React.useState<string>("");
  const [currentPathFiles, setCurrentPathFiles] = React.useState<(IMedia & BaseResponseInterface)[]>()

  const { data, isLoading, refetch } = useGetAllMediaQuery(
    {},
    { skip: !open },
  );
  const [deleteMedia] = useDeleteMediaMutation();
  const [createMedia] = useCreateMediaMutation();
  let insertImage: any
  try {
    const commands = useCommands();
    insertImage = commands.insertImage;
  } catch (e) {
    insertImage = ({ src }: { src: string }) => {
      copy(src);
      enqueueSnackbar("Image URL copied to clipboard");
    }
  }

  useEffect(() => {
    setCurrentPathFiles(
      data
        ?.data
        ?.filter(d => {
          const path = `/${d.name}`.replace(/\/$/, '').split("/");
          path.pop()
          return path.length === currentPath.length && path.every((p, i) => p === currentPath[i])
        })
    )
  }, [data, currentPath]);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 2,
    borderRadius: "16px",
    p: 4,
    width: { xs: "90%", sm: "90%", md: "90%" },
  };

  const onDelete = async (id: string) => {
    await deleteMedia({ id });
    refetch();
  };

  const onSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id])
    }
  }

  const handleChangeFolderName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(event.target.value);
  }, [setNewFolderName]);

  const onBreadcrumbClick = (path: string) => {
    const index = currentPath.indexOf(path);
    setCurrentPath(currentPath.slice(0, index + 1));
  }

  return (
    <>
      {
        React.cloneElement(children, {
          onClick: handleOpen,
        })
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoading &&
            <Skeleton variant="rectangular" height="400px" sx={{ mb: "4px" }}/>
          }
          {!isLoading && (
            <>
              <Stack
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                direction="row"
                mb={3}
              >
                <CustomBreadcrumbs
                  heading="Media"
                  links={currentPath.map((p, i) => ({
                    name: i === 0 ? "/" : p,
                    onClick: () => onBreadcrumbClick(p)
                  }))}
                  sx={{
                    mb: { xs: 0 },
                  }}
                />
                <IconButton
                  onClick={handleClose}
                  sx={{ width: "35px", alignSelf: 'flex-start' }}
                  edge="end"
                >
                  <CloseIcon fontSize="small"/>
                </IconButton>
              </Stack>
              <Box
                sx={{
                  overflowY: 'scroll',
                  maxHeight: 600
                }}
              >
                <FileManagerPanel
                  title="Folders"
                  subTitle={`${currentPathFiles?.filter(d => d.type === 'folder').length} folders`}
                  onOpen={() => setNewFolder(true)}
                  collapse={folderCollapse}
                  onCollapse={() => {
                    setFolderCollapse(!folderCollapse);
                  }}
                />
                <Collapse in={folderCollapse} unmountOnExit>
                  <Box
                    gap={3}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(2, 1fr)',
                      sm: 'repeat(3, 1fr)',
                      md: 'repeat(4, 1fr)',
                      lg: 'repeat(6, 1fr)',
                    }}
                  >
                    {currentPathFiles
                      ?.filter(d => d.type === 'folder')
                      ?.map((file) => {
                        const path = file.name.replace(/\/$/, '').split("/")
                        const name = path.pop();
                        return (
                          <FileManagerFolderItem
                            folder={{
                              id: file.id,
                              name: name ?? file.name,
                              path: path.join('/'),
                              size: 0,
                              type: "folder",
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
                            paths={data?.data?.filter(d => d.type === 'folder').map(f => f.name) ?? ['/']}
                          />
                        )
                      })
                    }
                  </Box>
                </Collapse>
                <FileManagerNewFolderDialog
                  open={newFolder}
                  onClose={() => setNewFolder(false)}
                  title="New Folder"
                  onCreate={() => {
                    createMedia({
                      url: '',
                      name: `${currentPath.join('/')}/${newFolderName}/`.replace('/', ''),
                      size: 0,
                      type: 'folder',
                      acl: 'public',
                    }).unwrap().then(() => {
                      setNewFolder(false);
                      setNewFolderName('');
                      refetch()
                    })
                  }}
                  folderName={newFolderName}
                  onChangeFolderName={handleChangeFolderName}
                />

                <Divider sx={{ my: 5, borderStyle: 'dashed' }} />

                <FileManagerPanel
                  title="Files"
                  subTitle={`${currentPathFiles?.filter(d => d.type !== 'folder').length} files`}
                  collapse={fileCollapse}
                  onCollapse={() => {
                    setFileCollapse(!fileCollapse);
                  }}
                />
                <Collapse in={fileCollapse} unmountOnExit>
                  <Box
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                      lg: 'repeat(4, 1fr)',
                    }}
                    gap={3}
                  >
                    {currentPathFiles
                      ?.filter(d => d.type !== 'folder')
                      ?.map((file) => {
                        const path = file.name.replace(/\/$/, '').split("/")
                        path.pop()
                        return (
                          <FileManagerFileItem
                            key={file.id}
                            file={{
                              id: file.id,
                              name: file.name.replace((currentPath.join('/') + '/').replace('/', ''), ''),
                              path: path.join('/'),
                              url: file.url,
                              size: file.size,
                              type: "image",
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
                            paths={data?.data?.filter(d => d.type === 'folder').map(f => f.name) ?? ['/']}
                          />
                        )
                      }
                    )}
                  </Box>
                </Collapse>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
