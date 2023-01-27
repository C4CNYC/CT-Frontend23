import {
  Stack,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItem,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Iconify from "src/components/iconify";
import {
  useDeleteTeacherMutation,
  useGetTeacherListQuery,
} from "src/redux/services/admin";
import { SHARED_PERSON } from "src/_mock/arrays";
import FileInvitedItem from "./FileInvitedItem";
import FileShareDialog from "./FileShareDialog";
import Image from "next/image";

type TeacherSectionProps = {
  school_id: string;
};

export default function TeacherSection({ school_id }: TeacherSectionProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [deleteTeacher] = useDeleteTeacherMutation();
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const { data: teachers, isLoading } = useGetTeacherListQuery(
    {
      school_id: school_id,
    },
    { skip: !school_id }
  );

  const teachersIds = teachers ? teachers.map((t) => t.id) : null;

  const handleDeleteTeacher = async (user_id: string) => {
    try {
      await deleteTeacher({
        user_id,
        school_id: school_id,
      }).unwrap();
      enqueueSnackbar("Teacher deleted");
    } catch (e) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  const handleChangeInvite = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setInviteEmail(event.target.value);
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
          onClick={() => setOpen(!open)}
          sx={{ alignItems: "center", display: "flex", cursor: "pointer" }}
          variant="subtitle2"
        >
          Teachers
          <Iconify
            icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
          />
        </Typography>

        <IconButton
          size="small"
          color="success"
          onClick={() => setOpenShare(true)}
          sx={{
            p: 0,
            width: 24,
            height: 24,
            color: "common.white",
            bgcolor: "success.main",
            "&:hover": {
              bgcolor: "success.main",
            },
          }}
        >
          <Iconify icon="eva:plus-fill" />
        </IconButton>
      </Stack>
      <Collapse in={open}>
        <List disablePadding sx={{ pl: 2.5, pr: 1, pt: 1 }}>
          {teachers &&
            teachers.map((person) => (
              <FileInvitedItem
                handleDeleteTeacher={() => handleDeleteTeacher(person.id)}
                key={person.id}
                person={person}
              />
            ))}
          {!isLoading && !teachers?.length ? (
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
                LET'S INVITE
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
      <FileShareDialog
        teachersIds={teachersIds || []}
        schoolId={school_id}
        open={openShare}
        shared={SHARED_PERSON}
        inviteEmail="email@codetribe.io"
        onChangeInvite={handleChangeInvite}
        onCopyLink={() => {}}
        onClose={() => {
          setOpenShare(false);
        }}
      />
    </>
  );
}
