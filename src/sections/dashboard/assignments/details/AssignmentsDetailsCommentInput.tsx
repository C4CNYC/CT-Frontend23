import {
  Paper,
  Stack,
  Button,
  Tooltip,
  InputBase,
  IconButton,
} from "@mui/material";

import { 
  Iconify,
  CustomAvatar, 
} from "@components";

import { useAuthContext } from "../../../../auth/useAuthContext";

export default function AssignmentsDetailsCommentInput(): React.ReactElement {
  const { user } = useAuthContext();

  return (
    <Stack direction="row" spacing={2} sx={{ py: 3, px: 2.5 }}>
      <CustomAvatar
        src={user?.photoURL}
        alt={user?.displayName}
        name={user?.displayName}
      />

      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1 }}>
        <InputBase
          fullWidth
          multiline
          rows={2}
          placeholder="Type a message"
          sx={{ px: 1 }}
        />

        <Stack direction="row" alignItems="center">
          <Stack direction="row" flexGrow={1}>
            <Tooltip title="Add photo">
              <IconButton size="small">
                <Iconify icon="ic:round-add-photo-alternate" />
              </IconButton>
            </Tooltip>

            <IconButton size="small">
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
          </Stack>

          <Button variant="contained">Comment</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
