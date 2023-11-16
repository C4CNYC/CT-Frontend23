import { useRouter } from "next/router";
import { useEffect } from "react";

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
  Typography,
} from "@mui/material";

import { ISchool } from "src/redux/services/interfaces/school.interface";

interface IChooseShoolModalProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  schoolId: string;
  setSchoolId: (id: string) => void;
  schools?: ISchool[];
}

export default function ChooseShoolModal({
  openDialog,
  setOpenDialog,
  schoolId,
  setSchoolId,
  schools,
}: IChooseShoolModalProps): React.ReactElement {
  const { back } = useRouter();
  const handleChange = (event: SelectChangeEvent) => {
    setSchoolId(event.target.value as string);
  };

  useEffect(() => {
    if (schools) {
      setSchoolId(schools[0].id);
    }
  }, []);

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
          <Select
            native
            name="schoolId"
            value={schoolId}
            onChange={handleChange}
            sx={{ width: "100%", mt: 1, mb: 6 }}
          >
            {schools ? (
              <>
                {schools.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </>
            ) : null}
          </Select>
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
          variant="contained"
          color="secondary"
        >
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
}
