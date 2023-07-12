import { useState } from "react";

// @mui
import {
  Avatar,
  AvatarGroup,
  Box,
  Checkbox,
  Divider,
  IconButton,
  MenuItem,
  PaperProps,
  Stack,
  Typography,
} from "@mui/material";

// components
import { FileThumbnail, Iconify, MenuPopover, useSnackbar } from "@components";
// hooks
import { useCopyToClipboard, useResponsive } from "@hooks";
// @types
import { IFileManager } from "@types";
// utils
import { fData, fDateTime } from "@utils";

//
// import { FileShareDialog, FileDetailsDrawer } from "../../schools";

// ----------------------------------------------------------------------

interface Props extends PaperProps {
  file: IFileManager;
  onDelete: VoidFunction;
}

export default function FileGeneralRecentCard({
  file,
  onDelete,
  sx,
  ...other
}: Props): React.ReactElement | null {
  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const isDesktop = useResponsive("up", "sm");

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const [favorited, setFavorited] = useState(file.isFavorited);

  const [, setOpenShare] = useState(false);

  const [, setOpenDetails] = useState(false);

  const handleFavorite = (): void => {
    setFavorited(!favorited);
  };

  const handleOpenShare = (): void => {
    setOpenShare(true);
  };

  const handleOpenDetails = (): void => {
    setOpenDetails(true);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const handleCopy = (): void => {
    enqueueSnackbar("Copied!");
    copy(file.url);
  };

  return (
    <>
      <Stack
        spacing={isDesktop ? 1.5 : 2}
        direction={isDesktop ? "row" : "column"}
        alignItems={isDesktop ? "center" : "flex-start"}
        sx={{
          p: 2.5,
          borderRadius: 2,
          position: "relative",
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          "&:hover": {
            bgcolor: "background.paper",
            boxShadow: (theme) => theme.customShadows.z20,
          },
          ...(isDesktop && {
            p: 1.5,
            borderRadius: 1.5,
          }),
          ...sx,
        }}
        {...other}
      >
        <FileThumbnail file={file.type} />

        <Stack
          onClick={handleOpenDetails}
          sx={{
            width: 1,
            flexGrow: { sm: 1 },
            minWidth: { sm: "1px" },
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {file.name}
          </Typography>

          <Stack
            spacing={0.75}
            direction="row"
            alignItems="center"
            sx={{ typography: "caption", color: "text.disabled", mt: 0.5 }}
          >
            <Box> {fData(file.size)} </Box>

            <Box
              sx={{
                width: 2,
                height: 2,
                borderRadius: "50%",
                bgcolor: "currentColor",
              }}
            />

            <Box> {fDateTime(file.dateModified)} </Box>
          </Stack>
        </Stack>

        {isDesktop && (
          <AvatarGroup
            max={4}
            sx={{
              mx: 1.5,
              "& .MuiAvatarGroup-avatar": {
                width: 24,
                height: 24,
                "&:first-of-type": {
                  fontSize: 12,
                },
              },
            }}
          >
            {file?.shared?.map((person) => (
              <Avatar key={person.id} alt={person.name} src={person.avatar} />
            ))}
          </AvatarGroup>
        )}

        <Box
          sx={{
            top: 8,
            right: 8,
            flexShrink: 0,
            position: "absolute",
            ...(isDesktop && {
              position: "unset",
            }),
          }}
        >
          <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorited}
            onChange={handleFavorite}
            sx={{ p: 0.75 }}
          />

          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Box>
      </Stack>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleCopy();
          }}
        >
          <Iconify icon="eva:link-2-fill" />
          Copy Link
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleOpenShare();
          }}
        >
          <Iconify icon="eva:share-fill" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={() => {
            handleClosePopover();
            onDelete();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      {/* <FileDetailsDrawer
        item={file}
        favorited={favorited}
        onFavorite={handleFavorite}
        onCopyLink={handleCopy}
        open={openDetails}
        onClose={handleCloseDetails}
        onDelete={() => {
          handleCloseDetails();
          onDelete();
        }}
      />

      <FileShareDialog
        open={openShare}
        shared={file.shared}
        inviteEmail={inviteEmail}
        onChangeInvite={handleChangeInvite}
        onCopyLink={handleCopy}
        onClose={() => {
          handleCloseShare();
          setInviteEmail("");
        }}
      /> */}
    </>
  );
}
