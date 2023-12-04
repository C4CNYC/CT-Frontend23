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
import InviteTeacherDialog from "@sections/dashboard/organization/schools/InviteTeacherDialog";
import SkeletonSchoolDetailsDrawer from "@sections/dashboard/schools/portal/SkeletonSchoolDetailsDrawer";
import {
  useDeleteTeacherMutation,
  useGetTeacherListQuery,
} from "src/redux/services/admin/school-amdin";
import { useTranslate } from "src/utils/translateHelper";

import TeacherItem from "./TeacherItem";

interface TeacherSectionProps {
  schoolId: string;
}

export default function TeacherSection({
  schoolId,
}: TeacherSectionProps): React.ReactElement | null {
  const { enqueueSnackbar } = useSnackbar();
  const translate = useTranslate();

  const [deleteTeacher] = useDeleteTeacherMutation();
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const { data: teachers, isLoading } = useGetTeacherListQuery(
    {
      schoolId,
    },
    { skip: !schoolId }
  );

  const teachersIds = teachers ? teachers.data.map((t) => t.id) : null;

  const handleDeleteTeacher = async (userId: string): Promise<void> => {
    try {
      await deleteTeacher({
        user_id: userId,
        schoolId,
      }).unwrap();
      enqueueSnackbar(translate("schools_teacher_deleted_act"));
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <SkeletonSchoolDetailsDrawer />
      ) : (
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
              {translate("teachers")}
              <Iconify
                icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
              />
            </Typography>

            <IconButton
              size="small"
              color="success"
              onClick={() => {
                setOpenShare(true);
              }}
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
              {teachers?.data.map((person) => (
                <TeacherItem
                  handleDeleteTeacher={async () => {
                    await handleDeleteTeacher(person.id);
                  }}
                  key={person.id}
                  person={person}
                />
              ))}
              {!isLoading && !teachers?.data.length ? (
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
                    {translate("actions_lets_invite")}
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
      )}

      <InviteTeacherDialog
        teachersIds={teachersIds ?? []}
        schoolId={schoolId}
        open={openShare}
        inviteEmail="email@codetribe.io"
        onClose={() => {
          setOpenShare(false);
        }}
      />
    </>
  );
}
