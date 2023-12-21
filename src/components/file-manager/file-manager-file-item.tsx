import { useState, useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { CardProps } from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
// utils
import { fDateTime } from 'src/utils/formatTime';
import { fData } from 'src/utils/formatNumber';
// types
import { IFileManager } from 'src/@types/file';
// components
import { Iconify } from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog, Image, TextMaxLine } from "@components";
import * as React from "react";
import FileManagerNewFolderDialog from "./file-manager-new-folder-dialog";
import { useUpdateMediaMutation, useUpdateMediaPathMutation } from "../../redux/services/manager/media-manager";
import { IMediaUpdate } from "../../redux/services/interfaces/media.interface";
import _ from "lodash";
import FileManagerMoveFolderDialog from "./file-manager-move-folder";
import { SelectChangeEvent } from "@mui/material";
import { useProfileQuery } from "../../redux/services/auth";

// ----------------------------------------------------------------------

interface Props extends CardProps {
  file: IFileManager;
  selected?: boolean;
  onSelect?: VoidFunction;
  onDelete: () => Promise<void>;
  insertImage: any;
  handleClose: VoidFunction
  paths: string[];
}

export default function FileManagerFileItem({
  file,
  selected,
  onSelect,
  onDelete,
  sx,
  insertImage,
  handleClose,
  paths,
  ...other
}: Props) {

  const [checkbox, setCheckbox] = useState<boolean>();
  const [confirm, setConfirm] = useState<boolean>(false)
  const [fileName, setFileName] = useState(file.name);
  const [filePath, setFilePath] = useState(file.path.replace(/^\//, ''));
  const [editItem, setEditItem] = useState<boolean>(false);
  const [moveFile, setMoveFile] = useState<boolean>(false);

  const popover = usePopover();

  const { data: user } = useProfileQuery();

  const [updateMedia] = useUpdateMediaMutation();

  const handleChangeFileName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  }, []);
  const handleChangeFilePath = useCallback((event: SelectChangeEvent) => {
    setFilePath(event.target.value);
  }, []);

  const renderIcon = (
    <Image
      src={file.url}
      alt={file.name}
      sx={{ height: 200, width: 200, mb: 1.5 }}
      onClick={() => {
        insertImage({ src: file.url });
        handleClose();
      }}
    />
  );

  const renderAction = (
    <Stack direction="row" alignItems="center" sx={{ top: 8, right: 8, position: 'absolute', backgroundColor: '#FFF', borderRadius: 10, }}>
      <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Stack>
  );

  const renderText = (
    <>
      <TextMaxLine
        persistent
        variant="subtitle2"
        sx={{ width: 1, mt: 2, mb: 0.5 }}
      >
        {file.name}
      </TextMaxLine>

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          maxWidth: 0.99,
          whiteSpace: 'nowrap',
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        {fData(file.size)}

        <Box
          component="span"
          sx={{
            mx: 0.75,
            width: 2,
            height: 2,
            flexShrink: 0,
            borderRadius: '50%',
            bgcolor: 'currentColor',
          }}
        />
        <Typography noWrap component="span" variant="caption">
          {fDateTime(file.dateModified)}
        </Typography>
      </Stack>
    </>
  );

  const renderAvatar = (
    <AvatarGroup
      max={3}
      sx={{
        mt: 1,
        [`& .${avatarGroupClasses.avatar}`]: {
          width: 24,
          height: 24,
          '&:first-of-type': {
            fontSize: 12,
          },
        },
      }}
    >
      {file.shared?.map((person) => (
        <Avatar key={person.id} alt={person.name} src={person.avatar} />
      ))}
    </AvatarGroup>
  );

  return (
    <>
      <Stack
        component={Paper}
        variant="outlined"
        alignItems="flex-start"
        sx={{
          p: 2.5,
          borderRadius: 2,
          bgcolor: 'unset',
          cursor: 'pointer',
          position: 'relative',
          ...((checkbox || selected) && {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          }),
          ...sx,
        }}
        {...other}
      >
        <Box onMouseEnter={() => setCheckbox(true)} onMouseLeave={() => setCheckbox(false)}>
          {renderIcon}
        </Box>

        {renderText}

        {renderAvatar}

        {renderAction}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 180 }}
      >

        <MenuItem
          onClick={() => {
            setEditItem(true);
            popover.onClose();
          }}
        >
          <Iconify icon="mdi:pencil-outline"/>
          Rename
        </MenuItem>

        <MenuItem
          onClick={() => {
            setMoveFile(true);
            popover.onClose();
          }}
        >
          <Iconify icon="mdi:arrow-all"/>
          Move
        </MenuItem>

        {file?.userId && user?.id === file?.userId && <MenuItem
          onClick={async () => {
            await updateMedia({
              ..._.pick(file, ['id', 'size', 'type', 'url', 'active', 'name']) as Omit<IMediaUpdate, 'acl'>,
              acl: file.acl === "public" ? "private" : "public",
            });
            popover.onClose();
          }}
        >
          <Iconify icon="mdi:eye-outline"/>
          Make it {file.acl === "public" ? "private" : "public"}
        </MenuItem>}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            setConfirm(true);
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <FileManagerNewFolderDialog
        open={editItem}
        onClose={() => setEditItem(false)}
        title="Edit Item"
        onUpdate={async () => {
          setEditItem(false);
          await updateMedia({
            ..._.pick(file, ['id', 'size', 'type', 'url', 'active', 'acl']) as Omit<IMediaUpdate, 'name'>,
            name: (file.path + '/' + fileName).replace(/^\//, ''),
          });
        }}
        folderName={fileName}
        onChangeFolderName={handleChangeFileName}
      />

      <FileManagerMoveFolderDialog
        open={moveFile}
        onClose={() => setMoveFile(false)}
        onUpdate={async () => {
          setEditItem(false);
          await updateMedia({
            ..._.pick(file, ['id', 'size', 'type', 'url', 'active', 'acl']) as Omit<IMediaUpdate, 'name'>,
            name: (filePath + file.name).replace(/^\//, ''),
          });
        }}
        actualPath={file.path.replace(/^\//, '')}
        folderPath={filePath}
        onChangeFolderPath={handleChangeFilePath}
        path={(file.path + '/' + file.name + '/').replace(/^\//, '')}
        paths={paths}
      />

      <ConfirmDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={() => {
            onDelete().then(() => setConfirm(false))
          }}>
            Delete
          </Button>
        }
      />
    </>
  );
}
