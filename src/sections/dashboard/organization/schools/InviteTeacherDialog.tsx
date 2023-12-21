import React from "react";

import { useSnackbar } from "notistack";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  List,
  Stack,
  TextField,
} from "@mui/material";

import { Scrollbar } from "@components";
import { useFilters } from "@hooks";
import {
  useCreateOrgMemberMutation,
  useGetOrgMembersQuery,
} from "src/redux/services/admin/members-admin";
import { useAddTeacherMutation } from "src/redux/services/admin/school-amdin";
import { Role } from "src/redux/services/enums/role.enum";

import UserItem from "./UserItem";

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  teachersIds: string[];
  schoolId: string;
  inviteEmail: string;
  onClose: VoidFunction;
}

export default function InviteTeacherDialog({
  teachersIds = [],
  schoolId,
  inviteEmail,
  open,
  onClose,
  ...other
}: Props): React.ReactElement | null {
  const [addTeacher] = useAddTeacherMutation();
  const [createUser] = useCreateOrgMemberMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { filters, setFilter } = useFilters({ email: "" });
  const { data: members } = useGetOrgMembersQuery(
    { ...filters },
    { skip: !filters.email }
  );

  const addUserToSchool = async (
    userId: string,
    schoolId: string
  ): Promise<void> => {
    try {
      await addTeacher({ user_id: userId, schoolId }).unwrap();
      enqueueSnackbar("teacher added");
    } catch (e: any) {
      enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };

  const onSendInvite = async (): Promise<void> => {
    try {
      const user = await createUser({
        id: "",
        email: filters.email,
        role: Role.Manager,
        first_name: "",
        last_name: "",
      }).unwrap();
      enqueueSnackbar("Invite sent");
      await addUserToSchool(user.id, schoolId);
      setFilter("email", "");
      onClose();
    } catch (e: any) {
      enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle> Invite </DialogTitle>
      <DialogContent sx={{ overflow: "unset" }}>
        <>
          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              size="small"
              value={filters.email}
              placeholder="Email"
              onChange={(e: any) => {
                setFilter("email", e.target.value);
              }}
            />
            <Button
              sx={{ width: "150px" }}
              variant="contained"
              disabled={!!members?.data.length || !filters.email}
              onClick={onSendInvite}
            >
              Send Invite
            </Button>
          </Stack>

          {members && (
            <Scrollbar sx={{ maxHeight: 60 * 6 }}>
              <List disablePadding>
                {members.data.map((person) => (
                  <UserItem
                    addHandler={async () => {
                      await addUserToSchool(person.id, schoolId);
                    }}
                    invited={teachersIds.includes(person.id)}
                    key={person.id}
                    person={person}
                  />
                ))}
              </List>
            </Scrollbar>
          )}
        </>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-end" }}>
        {onClose && (
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
