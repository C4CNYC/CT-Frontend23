import NextLink from "next/link";
import { useEffect, useState } from "react";

import { useSnackbar } from "notistack";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

import { LoadingButton } from "@mui/lab";
import { Box, IconButton, Link, Paper, Stack } from "@mui/material";

import { ConfirmDialog, Image, Label } from "@components";
import { PATH_MAIN } from "@routes/paths";
import { APIError } from "src/redux/interfaces/custom-error.interface";
import { IGallery } from "src/redux/interfaces/gallary.interface";
import {
  useRemoveProjectMutation,
  useUpdateProjectMutation,
} from "src/redux/services/manager/gallery-student";
import { RootState, useSelector } from "src/redux/store";

import ElementInfo from "../ElementInfo";
import ElementMenu from "../ElementMenu";
import GalleryItemSkills from "../GalleryItemSkills";
import ProjectStatistic from "../ProjectStatistic";

interface Props {
  item: IGallery;
}

export default function GalleryItem({ item }: Props): React.ReactElement {
  const { body, title, description, language, id, cover } = item;
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state: RootState) => state.global.user);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [code, setCode] = useState<string>("");
  const [deleteProject, { isLoading }] = useRemoveProjectMutation();
  const [updataeProject] = useUpdateProjectMutation();

  useEffect(() => {
    setCode(JSON.parse(body).body.code);
  }, [item, body]);

  const handleOpenPopover = (e: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(e.currentTarget);
    e.stopPropagation();
    e.preventDefault();
  };
  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };
  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const onDelete = async (): Promise<void> => {
    try {
      await deleteProject({ id: id as string }).unwrap();
      enqueueSnackbar("Project deleted!");
    } catch (error) {
      const typedError = error as APIError;
      enqueueSnackbar(typedError.data.message, {
        variant: "error",
      });
    }
  };

  const onUpdate = async (): Promise<void> => {
    const updatedItem = {
      title,
      description,
      language,
      body: JSON.stringify({ body: { code } }),
    };
    try {
      await updataeProject({ id: id as string, ...updatedItem }).unwrap();
      enqueueSnackbar("Updated successfully");
    } catch (error) {
      const typedError = error as APIError;
      enqueueSnackbar(typedError.data.message, {
        variant: "error",
      });
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Stack
        direction="row"
        sx={{
          width: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2,
          justifyContent: "space-between",
          alignItems: "center",
          gap: 0.5,
          pt: 0.5,
          pr: 1,
          pl: 2,
        }}
      >
        <Label
          variant="soft"
          color={item.public ? "success" : "warning"}
          sx={{ textTransform: "uppercase" }}
        >
          {item.public ? "public" : "private"}
        </Label>
        <Stack direction="row">
          {item.public ? (
            <IconButton>
              <Link
                href={PATH_MAIN.galleryPublic.project(id as string)}
                component={NextLink}
                target="_blank"
                sx={{ display: "flex" }}
              >
                <FiExternalLink color="#333" size="20px" />
              </Link>
            </IconButton>
          ) : null}

          <IconButton
            onClick={(e) => {
              handleOpenPopover(e);
            }}
          >
            <BsThreeDotsVertical color="#333" size="20px" />
          </IconButton>
        </Stack>
      </Stack>

      <Paper
        elevation={5}
        sx={{
          minWidth: "276px",
          borderRadius: "25px",
          overflow: "hidden",
          border: "1px solid #43D4DD",
        }}
      >
        <Image
          src={cover ?? "/assets/background/overlay_2.jpg"}
          sx={{
            height: "250px",
            "& .wrapper": {
              backgroundSize: "contain !important",
            },
          }}
        />
        <Stack direction="column" sx={{ p: "7px 15px 20px" }}>
          <ElementInfo
            title={title}
            description={description}
            name={user?.first_name}
            lastName={user?.last_name}
            code={code}
            setCode={setCode}
            onUpdate={onUpdate}
          />
          <GalleryItemSkills />
          <ProjectStatistic />
        </Stack>
      </Paper>

      <ElementMenu
        openPopover={openPopover}
        handleClosePopover={handleClosePopover}
        handleOpenConfirm={handleOpenConfirm}
        item={item}
      />
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete project"
        content="Are you sure want to delete this project?"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={onDelete}
            loading={isLoading}
          >
            Delete
          </LoadingButton>
        }
      />
    </Box>
  );
}
