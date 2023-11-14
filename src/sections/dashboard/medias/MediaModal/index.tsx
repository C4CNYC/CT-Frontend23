import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Skeleton, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/system";

import {
  useDeleteMediaMutation,
  useGetMediasQuery,
  useUpdateMediaMutation,
} from "src/redux/services/manager/media-manager";
import { Iconify, Image } from "@components";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { FaSave } from "react-icons/fa";
import _ from "lodash";
import { useCommands } from "@remirror/react";

export interface MediaModalProps {
  children: React.ReactElement;
}

export function MediaModal({
  children
}: MediaModalProps): React.ReactElement | null {
  const [open, setOpen] = React.useState(false);
  const [updating, setUpdating] = React.useState<null | string>(null);
  const [updatedName, setUpdatedName] = React.useState<string>('');

  const { data, isLoading, refetch } = useGetMediasQuery(
    {},
    { skip: !open }
  )
  const [updateMedia] = useUpdateMediaMutation();
  const [deleteMedia] = useDeleteMediaMutation();
  const { insertImage } = useCommands();

  const updateNameInput = React.useCallback((inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

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
    width: { xs: "90%", sm: "90%", md: "90%"},
  };

  const onUpdate = async () => {
    if (!updating) return
    const actualMedia = data?.data?.find(media => media.id === updating)
    await updateMedia({
      ..._.pick(actualMedia, ['url', 'active']) as { url: string; active: boolean },
      id: updating,
      name: updatedName
    }).unwrap();
    setUpdating(null)
    setUpdatedName('')
    refetch()
  }

  const onDelete = async (id: string) => {
    await deleteMedia({ id })
    refetch()
  }

  const onKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      await onUpdate()
    }
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
            <Skeleton variant="rectangular" height="400px" sx={{ mb: "4px" }} />
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
                <Typography variant="h6" fontWeight="700">
                  Medias
                </Typography>
                <IconButton
                  onClick={handleClose}
                  sx={{ width: "35px" }}
                  edge="end"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
              <Stack
                display="flex"
                alignItems="center"
                direction="row"
                sx={{ flexWrap: 'wrap', gap: 1 }}
              >
                {data?.data?.map((media) => (
                  <Stack
                    key={media.id}
                    display="flex"
                    justifyContent="space-between"
                    sx={{ width: '24%', height: 240 }}
                  >
                    <Image
                      src={media.url}
                      alt={media.name}
                      sx={{ height: 240, width: 240, mb: 3, cursor: 'pointer' }}
                      onClick={() => {
                        insertImage({ src: media.url })
                        handleClose()
                      }}
                    />
                    <Stack
                      display="flex"
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      {updating !== media.id ? (
                        <Typography
                          variant="body1"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >{media.name}</Typography>
                      ) : (
                        <TextField
                          placeholder="Name"
                          value={updatedName}
                          size="small"
                          sx={{ padding: '0 14px' }}
                          inputProps={{
                            sx: {
                               padding: '0.5px 14px',
                            }
                          }}
                          onChange={(e) => setUpdatedName(e.target.value)}
                          inputRef={updateNameInput}
                          onKeyDown={onKeyDown}
                        />
                      )}
                      {updating !== media.id ? (
                        <Stack
                          display="flex"
                          direction="row"
                          sx={{ gap: .1 }}
                        >
                          <EditOutlinedIcon
                            style={{ color: "rgb(161, 167, 172)", width: 18, cursor: 'pointer' }}
                            onClick={() => {
                              setUpdating(media.id)
                              setUpdatedName(media.name)
                            }}
                          />
                          <Iconify
                            icon="eva:trash-2-outline"
                            sx={{ color: "rgb(161, 167, 172)", cursor: 'pointer' }}
                            onClick={() => onDelete(media.id)}
                          />
                        </Stack>
                      ) : (
                        <FaSave
                          onClick={onUpdate}
                          size="18px"
                          style={{ marginBottom: "3px", color: "#75CF6D", cursor: 'pointer' }}
                        />
                      )}
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
