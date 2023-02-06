import React from 'react';
import {
  List,
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent, DialogProps,
} from "@mui/material";
import { useFilters } from "src/hooks/useFilters";
import {useGetOrgMembersQuery} from "src/redux/services/admin";
import Scrollbar from "../../../components/scrollbar";
import UserItem from "./UserItem";
import { Role } from "src/redux/services/enums/role.enum";
import {useSendInviteMutation} from "../../../redux/services/admin";
import { useSnackbar } from "../../../components/snackbar";

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  teachersIds: [];
  schoolId: string;
  inviteEmail: string;
  onChangeInvite: void | null;
  onClose: VoidFunction;

};

export default function InviteUser({
  teachersIds = [],
  schoolId,
  inviteEmail,
  onChangeInvite,
  open,
  onClose,
  ...other
}: Props) {
  const [sendInvite, { isLoading }] = useSendInviteMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { filters, setFilter } = useFilters({ email: "" });
  const { data: members } = useGetOrgMembersQuery(
    {
      ...filters,
    },
    {
      skip: !filters.email,
    }
  );


  const onSendInvite = async () => {
    try {
      await sendInvite({
        email: filters.email as string,
        role: Role.Manager
      }).unwrap();
      await enqueueSnackbar("Invite sent" );
    } catch (error) {
      enqueueSnackbar(error.data.message, {
        variant: "error",
      });
      console.error(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle> Invite </DialogTitle>
      <DialogContent sx={{ overflow: "unset" }}>
        <>
        {onChangeInvite && (
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
              sx={{width: '150px'}}
              variant="contained"
              loading={isLoading}
              disabled={members?.data.length || !filters.email}
              onClick={onSendInvite}
            >
              Send Invite
            </Button>
          </Stack>
        )}

        {members && (
          <Scrollbar sx={{ maxHeight: 60 * 6 }}>
            <List disablePadding>
              {members.data.map((person) => (
                <UserItem
                  invited={teachersIds.includes(person.id)}
                  schoolId={schoolId}
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
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
          >
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
