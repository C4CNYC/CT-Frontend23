import { useRouter } from "next/router";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Select,
  SelectChangeEvent,
  Skeleton,
  Typography,
} from "@mui/material";

import { useGetMySchoolsQuery } from "src/redux/services/manager/schools-manager";

interface IChooseShoolModalProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  schoolId: string;
  setSchoolId: (id: string) => void;
}

export default function ChooseShoolModal({
  openDialog,
  setOpenDialog,
  schoolId,
  setSchoolId,
}: IChooseShoolModalProps): React.ReactElement {
  const { back } = useRouter();
  const { data, isLoading } = useGetMySchoolsQuery({});
  const handleChange = (event: SelectChangeEvent) => {
    setSchoolId(event.target.value as string);
  };

  return (
    <Dialog open={openDialog} maxWidth="xs">
      <DialogTitle textAlign="center">Create a class</DialogTitle>
      <DialogContent>
        <Divider flexItem sx={{ mb: 2 }}>
          <Typography variant="h1" sx={{ mt: -2 }}>
            🏫
          </Typography>
        </Divider>
        <Typography variant="body1" textAlign="center" maxWidth="300px">
          Classes is the place, where everyone learns together in a safe space.
        </Typography>

        <Box sx={{ px: 2 }}>
          <Typography variant="h6" sx={{ ml: 1, mt: 3 }}>
            Choose school:
          </Typography>
          {!isLoading ? (
            <Select
              native
              name="schoolId"
              value={schoolId}
              onChange={handleChange}
              sx={{ width: "100%", mt: 1, mb: 6 }}
            >
              <option key="empty" value="none"></option>
              {data?.data ? (
                <>
                  {data.data.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </>
              ) : null}
            </Select>
          ) : (
            <Skeleton variant="rounded" sx={{ height: "56px", mt: 1, mb: 6 }} />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="soft"
          color="error"
          onClick={() => {
            back();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setOpenDialog(false);
          }}
          disabled={isLoading}
          variant="contained"
          color="secondary"
        >
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
}
