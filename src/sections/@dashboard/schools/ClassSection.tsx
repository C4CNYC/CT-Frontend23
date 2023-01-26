import { Stack, Typography, IconButton, Collapse, List, ListItem } from "@mui/material"
import Image from "next/image"
import { useSnackbar } from "notistack"
import { useState } from "react"
import { useSelector } from "react-redux"
import Iconify from "src/components/iconify"
import { useDeleteTeacherMutation, useGetClassListQuery, useGetTeacherListQuery } from "src/redux/services/admin"
import { RootState } from "src/redux/store"
import { SHARED_PERSON } from "src/_mock/arrays"
import ClassItem from "./ClassItem"
import AddClassDialog from "./CreateClassDialog"
import FileInvitedItem from "./FileInvitedItem"
import FileShareDialog from "./FileShareDialog"

type ClassesSectionProps = {
  school_id: string;
}

export default function ClassesSection({school_id}: ClassesSectionProps) {
    const { enqueueSnackbar } = useSnackbar();
  const [ deleteTeacher ] = useDeleteTeacherMutation();
   const org_id = useSelector((state: RootState) => state.global.org_id);
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
    const { data: classes, isLoading } = useGetClassListQuery(
    {
      id: org_id,
      school_id: school_id,
    },
    { skip: !org_id || !school_id }
  );


    const handleDeleteClass = async (user_id: string) => {
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
              Casses
              <Iconify
                icon={
                  open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"
                }
              />
            </Typography>

            <AddClassDialog school_id={school_id}/>
          </Stack>
          <Collapse in={open}>
            <List disablePadding sx={{ pl: 2.5, pr: 1, pt: 1 }}>
              {classes &&  classes.map((classes: any) => (
                  <ClassItem
                    handleDeleteClass={() => handleDeleteClass(classes.id)}
                    key={classes.id}
                    classes={classes}
                  />
                ))}
                {
                  !isLoading && !classes?.length ? (
   <ListItem sx={{ justifyContent: 'center', pr: 1.5, pt: 2 }} disableGutters>
                  <Image alt="smile" height="40" width="40" src="/assets/images/happy.png"/>
                  <Typography variant="h6" sx={{ ml: 2, mr: 2 }}>
                    LET'S CREATE
                  </Typography>
                  <Image style={{
                    transform: 'rotate(-13deg)'
                  }} alt="smile" height="25" width="25" src="/assets/images/arrow.png"/>
                </ListItem>
                  ) : null
                }
            </List>
          </Collapse>
    </>
  )
}