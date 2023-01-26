// @mui
import {
  List,
  Stack,
  Dialog,
  Button,
  TextField,
  DialogProps,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useFilters } from "src/hooks/useFilters";
import { useGetOrgMembersQuery } from "src/redux/services/admin";
import { Role } from "src/redux/services/enums/role.enum";
import { RootState, useSelector } from "src/redux/store";
// @types
import { IFileShared } from "../../../@types/file";
// components
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
//
import UserItem from "./UserItem";

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  inviteEmail?: string;
  schoolId: string;
  teachersIds: string[];
  shared?: IFileShared[] | null;
  onCopyLink?: VoidFunction;
  onChangeInvite?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //
  open: boolean;
  onClose: VoidFunction;
}

export default function FileShareDialog({
  shared,
  teachersIds = [],
  schoolId,
  inviteEmail,
  onCopyLink,
  onChangeInvite,
  //
  open,
  onClose,
  ...other
}: Props) {
  const { filters, setFilter } = useFilters({ email: "", role: Role.Manager });
  const org_id = useSelector(
    (state: RootState) => state.global.org_id
  );
  const { data: members } = useGetOrgMembersQuery(
    {
      org_id: org_id,
      ...filters,
    },
    {
      skip: !org_id || !filters.email,
    }
  );

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle> Invite </DialogTitle>

      <DialogContent sx={{ overflow: "unset" }}>
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
              disabled={!inviteEmail}
              variant="contained"
              sx={{ flexShrink: 0 }}
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
