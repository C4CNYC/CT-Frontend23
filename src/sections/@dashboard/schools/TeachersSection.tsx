import { Stack, Typography, IconButton, Collapse, List } from "@mui/material"
import { useSnackbar } from "notistack"
import { useState } from "react"
import { useSelector } from "react-redux"
import Iconify from "src/components/iconify"
import { useDeleteTeacherMutation, useGetTeacherListQuery } from "src/redux/services/admin"
import { RootState } from "src/redux/store"
import { SHARED_PERSON } from "src/_mock/arrays"
import FileInvitedItem from "./FileInvitedItem"
import FileShareDialog from "./FileShareDialog"

type TeacherSectionProps = {
  school_id: string;
}

export default function TeacherSection({school_id}: TeacherSectionProps) {
    const { enqueueSnackbar } = useSnackbar();
 
  const [ deleteTeacher ] = useDeleteTeacherMutation();
   const org_id = useSelector((state: RootState) => state.global.org_id);
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
    const { data: teachers } = useGetTeacherListQuery(
    {
      id: org_id,
      school_id: school_id,
    },
    { skip: !org_id || !school_id || !open }
  );


  const teachersIds = teachers ? teachers.map((t) => t.id) : null;

    const handleDeleteTeacher = async (user_id: string) => {
    try {
      await deleteTeacher({
        org_id,
        user_id,
        school_id: school_id
      }).unwrap()
      enqueueSnackbar('Teacher deleted')
    } catch(e) {
      enqueueSnackbar(e.data.message, {
        variant: 'error'
      })
    }
  }

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
                icon={
                  open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"
                }
              />
            </Typography>

            <IconButton
              size="small"
              color="success"
              onClick={() =>  setOpenShare(true)}
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
            <List disablePadding sx={{ pl: 2.5, pr: 1 }}>
              {teachers &&
                teachers.map((person) => (
                  <FileInvitedItem
                    handleDeleteTeacher={() => handleDeleteTeacher(person.id)}
                    key={person.id}
                    person={person}
                  />
                ))}
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
  )
}