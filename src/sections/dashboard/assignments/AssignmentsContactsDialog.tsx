import Iconify from "@components/iconify";
import Scrollbar from "@components/scrollbar";
import SearchNotFound from "@components/search-not-found";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { IAssignmentsAssignee } from "../../../@types/assignments";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

interface Props {
  assignee?: IAssignmentsAssignee[];
  open: boolean;
  onClose: VoidFunction;
}

export default function AssignmentsContactsDialog({
  assignee = [],
  open,
  onClose,
}: Props): React.ReactElement | null {
  const [searchContacts, setSearchContacts] = useState("");

  const handleSearchContacts = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchContacts(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: [],
    query: searchContacts,
  });

  const isNotFound = !dataFiltered.length && !!searchContacts;

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle sx={{ pb: 0 }}>
      </DialogTitle>

      <Box sx={{ px: 3, py: 2.5 }}>
        <TextField
          fullWidth
          value={searchContacts}
          onChange={handleSearchContacts}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled" }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {isNotFound ? (
          <SearchNotFound query={searchContacts} sx={{ mt: 3, mb: 10 }} />
        ) : (
          <Scrollbar
            sx={{
              px: 2.5,
              height: ITEM_HEIGHT * 6,
            }}
          >
            {dataFiltered.map((contact: any) => {
              const checked = assignee
                .map((person) => person.name)
                .includes(contact.name);

              return (
                <ListItem
                  key={contact.id}
                  disableGutters
                  secondaryAction={
                    <Button
                      size="small"
                      color={checked ? "primary" : "inherit"}
                      startIcon={
                        <Iconify
                          icon={
                            checked ? "eva:checkmark-fill" : "eva:plus-fill"
                          }
                        />
                      }
                    >
                      {checked ? "assigned" : "assign"}
                    </Button>
                  }
                  sx={{ height: ITEM_HEIGHT }}
                >
                  <ListItemAvatar>
                    <Avatar src={contact.avatar} />
                  </ListItemAvatar>

                  <ListItemText
                    primaryTypographyProps={{
                      typography: "subtitle2",
                      sx: { mb: 0.25 },
                    }}
                    secondaryTypographyProps={{ typography: "caption" }}
                    primary={contact.name}
                    secondary={contact.email}
                  />
                </ListItem>
              );
            })}
          </Scrollbar>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  query,
}: {
  inputData: IAssignmentsAssignee[];
  query: string;
}): any {
  if (query) {
    inputData = inputData.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.email.toLowerCase().includes(query.toLowerCase())
    );
  }

  return inputData;
}
