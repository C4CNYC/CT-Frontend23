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
import { useTranslate } from "src/utils/translateHelper";

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
    setSchoolId(event.target.value);
  };
  const translate = useTranslate();

  useEffect(() => {
    if (schools) {
      setSchoolId(schools[0].id);
    }
  }, []);

  return (
    <Dialog open={openDialog} maxWidth="xs">
      <DialogTitle textAlign="center">{translate("class_create")}</DialogTitle>
      <DialogContent>
        <Divider flexItem sx={{ mb: 2 }}>
          <Typography variant="h1" sx={{ mt: -2 }}>
            🏫
          </Typography>
        </Divider>
        <Typography variant="body1" textAlign="center" maxWidth="300px">
          {translate("class_create_modal_info")}
        </Typography>

        <Box sx={{ px: 2 }}>
          <Typography variant="h6" sx={{ ml: 1, mt: 3 }}>
            {translate("class_choose_school")}
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
          {translate("actions_cancel")}
        </Button>
        <Button
          onClick={() => {
            setOpenDialog(false);
          }}
          variant="contained"
          color="secondary"
        >
          {translate("actions_next")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
