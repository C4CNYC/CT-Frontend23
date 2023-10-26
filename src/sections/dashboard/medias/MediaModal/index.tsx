import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton, MenuItem, Paper, Skeleton, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/system";

import {
  useDeleteMediaMutation,
  useGetAllMediaQuery,
  useUpdateMediaMutation,
} from "src/redux/services/manager/media-manager";
import { Iconify, Image } from "@components";
import _ from "lodash";
import { useCommands } from "@remirror/react";
import CustomPopover, { usePopover } from "src/components/custom-popover";

export interface MediaModalProps {
  children: React.ReactElement;
}

export function MediaModal({
  children,
}: MediaModalProps): React.ReactElement | null {
  const [open, setOpen] = React.useState(false);
  const [popoverSelected, setPopoverSelected] = React.useState<null | string>(null);
  const [updating, setUpdating] = React.useState<null | string>(null);
  const [updatedName, setUpdatedName] = React.useState<string>("");
  const popover = usePopover();

  const { data, isLoading, refetch } = useGetAllMediaQuery(
    {},
    { skip: !open },
  );
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
    width: { xs: "90%", sm: "90%", md: "90%" },
  };

  const onUpdate = async () => {
    if (!updating) return;
    const actualMedia = data?.data?.find(media => media.id === updating);
    await updateMedia({
      ..._.pick(actualMedia, ["url", "active"]) as { url: string; active: boolean },
      id: updating,
      name: updatedName,
    }).unwrap();
    setUpdating(null);
    setUpdatedName("");
    refetch();
  };

  const onDelete = async (id: string) => {
    await deleteMedia({ id });
    refetch();
  };

  const onKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      await onUpdate();
    }
  };

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
                <Typography variant="h6" fontWeight="700">
                  Media
                </Typography>
                <IconButton
                  onClick={handleClose}
                  sx={{ width: "35px" }}
                  edge="end"
                >
                  <CloseIcon fontSize="small"/>
                </IconButton>
              </Stack>
              <Stack
                display="flex"
                alignItems="center"
                direction="row"
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                {data?.data?.map((media) => (
                  <Stack
                    key={media.id}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Stack
                      component={Paper}
                      variant="outlined"
                      alignItems="flex-start"
                      sx={{
                        pt: 1.5,
                        pb: 1.5,
                        pl: 4,
                        pr: 4,
                        borderRadius: 2,
                        bgcolor: "unset",
                        position: "relative",
                      }}
                    >
                      <Box>
                        <Image
                          src={media.url}
                          alt={media.name}
                          sx={{ height: 200, width: 200, mb: 1.5, cursor: "pointer" }}
                          onClick={() => {
                            insertImage({ src: media.url });
                            handleClose();
                          }}
                        />
                      </Box>
                      {updating !== media.id ? (
                        <Typography
                          variant="body1"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >{media.name}</Typography>
                      ) : (
                        <TextField
                          placeholder="Name"
                          value={updatedName}
                          size="small"
                          sx={{ padding: "0" }}
                          inputProps={{
                            sx: {
                              padding: "0.5px 14px",
                            },
                          }}
                          onChange={(e) => setUpdatedName(e.target.value)}
                          inputRef={updateNameInput}
                          onKeyDown={onKeyDown}
                        />
                      )}
                      <Stack direction="row" alignItems="center" sx={{ top: 0, right: 0, position: "absolute" }}>
                        <IconButton color={popover.open ? "inherit" : "default"} onClick={(e) => {
                          popover.onOpen(e);
                          setPopoverSelected(media.id);
                        }}>
                          <Iconify icon="eva:more-vertical-fill"/>
                        </IconButton>
                      </Stack>
                    </Stack>
                    <CustomPopover
                      open={popover.open}
                      onClose={popover.onClose}
                      arrow="right-top"
                      sx={{ width: 140 }}
                    >
                      <MenuItem
                        onClick={() => {
                          popover.onClose();
                          setUpdating(popoverSelected);
                          setUpdatedName(
                            data?.data?.find(data => data.id === popoverSelected)?.name ?? "",
                          );
                        }}
                      >
                        <Iconify icon="mdi:pencil-outline"/>
                        Rename
                      </MenuItem>
                      <Divider sx={{ borderStyle: "dashed" }}/>
                      <MenuItem
                        onClick={() => {
                          popover.onClose();
                        }}
                        sx={{ color: "error.main" }}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold"/>
                        Delete
                      </MenuItem>
                    </CustomPopover>
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
