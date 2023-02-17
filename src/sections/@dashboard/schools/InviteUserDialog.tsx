import React from "react";
import {
  List,
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogProps,
} from "@mui/material";
import { useFilters } from "src/hooks/useFilters";
import {
  useAddTeacherMutation,
  useCreateOrgMemberMutation,
  useGetOrgMembersQuery,
} from "src/redux/services/admin";
import Scrollbar from "../../../components/scrollbar";
import UserItem from "./UserItem";
import { Role } from "src/redux/services/enums/role.enum";
import { useSnackbar } from "notistack";

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  teachersIds: string[];
  schoolId: string;
  inviteEmail: string;
  onClose: VoidFunction;
}

export default function InviteUser({
  teachersIds = [],
  schoolId,
  inviteEmail,
  open,
  onClose,
  ...other
}: Props) {
  const [addTeacher] = useAddTeacherMutation();
  const [createUser, { isLoading }] = useCreateOrgMemberMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { filters, setFilter } = useFilters({ email: "" });
  const { data: members } = useGetOrgMembersQuery(
    { ...filters },
    { skip: !filters.email }
  );

  const addUserToSchool = async (user_id: string, school_id: string) => {
    try {
      await addTeacher({ user_id, school_id }).unwrap();
      enqueueSnackbar("teacher added");
    } catch (e) {
      enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };

  const onSendInvite = async () => {
    try {
      const user = await createUser({
        email: filters.email as string,
        role: Role.Manager,
      }).unwrap();
      console.log(user);
      enqueueSnackbar("Invite sent");
      await addUserToSchool(user.id, schoolId);
      setFilter("email", "");
      onClose();
    } catch (e) {
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
              onChange={(e) => {
                setFilter("email", e.target.value);
              }}
            />
            <Button
              sx={{ width: "150px" }}
              variant="contained"
              disabled={(!!members?.data.length || !filters.email) as boolean}
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
                    addHandler={() => addUserToSchool(person.id, schoolId)}
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
