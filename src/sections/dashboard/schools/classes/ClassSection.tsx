import Image from "next/image";
import { useState } from "react";

import { useSnackbar } from "notistack";

import {
  Collapse,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

import { Iconify } from "@components";
import { createRandomAvatar, getRandomColor } from "@utils";
import {
  useCreateClassMutation,
  useGetClassListQuery,
} from "src/redux/services/admin/school-amdin";
import {
  useDeleteClassesMutation,
  useUpdateClassesAvatarMutation,
} from "src/redux/services/manager/classes-manager";
import { useTranslate } from "src/utils/translateHelper";

import ClassItem from "./ClassItem";
import AddClassDialog from "./CreateClassDialog";

interface ClassesSectionProps {
  schoolId: string;
}

export default function ClassesSection({
  schoolId,
}: ClassesSectionProps): React.ReactElement | null {
  const { enqueueSnackbar } = useSnackbar();
  const translate = useTranslate();
  const [createClass] = useCreateClassMutation();
  const [deleteClass] = useDeleteClassesMutation();
  const [updateClassAvatar] = useUpdateClassesAvatarMutation();
  const [open, setOpen] = useState(false);
  const { data: classes, isLoading } = useGetClassListQuery(
    {
      schoolId,
    },
    { skip: !schoolId }
  );

  const handleDeleteClass = async (classId: string): Promise<void> => {
    try {
      await deleteClass({
        classId,
        schoolId,
      }).unwrap();
      enqueueSnackbar(translate("classes_class_deleted"));
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  const createClassByAdmin = async (
    name: string,
    description: string,
    cover?: string,
    uploadedFile?: File
  ): Promise<void> => {
    try {
      if (!cover) {
        cover = getRandomColor();
      }
      const data = await createClass({
        schoolId,
        name,
        description,
        cover,
      }).unwrap();
      const file = new FormData();
      if (uploadedFile) {
        file.append("file", uploadedFile);
        await updateClassAvatar({ schoolId, classId: data.id, file }).unwrap();
      } else {
        const randomAvatar = await createRandomAvatar();
        file.append("file", randomAvatar);
        await updateClassAvatar({ schoolId, classId: data.id, file }).unwrap();
      }
      enqueueSnackbar(
        translate("add_school_success_smg", {
          name: data.name,
        })
      );
    } catch (error: any) {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
    }
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2.5, pb: 0 }}
      >
        <Typography
          onClick={() => {
            setOpen(!open);
          }}
          sx={{ alignItems: "center", display: "flex", cursor: "pointer" }}
          variant="subtitle2"
        >
          {translate("classes")}
          <Iconify
            icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
          />
        </Typography>

        <AddClassDialog createClass={createClassByAdmin}>
          <IconButton
            size="small"
            color="success"
            sx={{
              p: 0,
              height: 24,
              color: "common.white",
              bgcolor: "success.main",
              "&:hover": {
                bgcolor: "success.main",
              },
            }}
          >
            {" "}
            <Iconify sx={{ width: 24 }} icon="eva:plus-fill" />{" "}
          </IconButton>
        </AddClassDialog>
      </Stack>
      <Collapse in={open}>
        <List disablePadding sx={{ pl: 2.5, pr: 1, pt: 1 }}>
          {classes?.map((classes: any) => (
            <ClassItem
              schoolId={schoolId}
              handleDeleteClass={async () => {
                await handleDeleteClass(classes.id);
              }}
              key={classes.id}
              classes={classes}
            />
          ))}
          {!isLoading && !classes?.length ? (
            <ListItem
              sx={{ justifyContent: "center", pr: 1.5, pt: 2 }}
              disableGutters
            >
              <Image
                alt="smile"
                height="40"
                width="40"
                src="/assets/images/happy.png"
              />
              <Typography variant="h6" sx={{ ml: 2, mr: 2 }}>
                LET'S CREATE
              </Typography>
              <Image
                style={{
                  transform: "rotate(-13deg)",
                }}
                alt="smile"
                height="25"
                width="25"
                src="/assets/images/arrow.png"
              />
            </ListItem>
          ) : null}
        </List>
      </Collapse>
    </>
  );
}
