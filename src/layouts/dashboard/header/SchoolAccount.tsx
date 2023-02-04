// @mui
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
// components
import { SchoolResponce } from "src/redux/services/interfaces/school.interface";
import { useRouter } from "next/router";
import { useGetMySchoolsQuery } from "src/redux/services/manager";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useDispatch } from "react-redux";
import { setSchool } from "src/redux/slices/manager";
import { useEffect } from "react";

export default function SchoolAccount() {
  const dispatch = useDispatch();
  const school_id = useSelector((state: RootState) => state.manager.school_id);
  const { data: schools } = useGetMySchoolsQuery();

  useEffect(() => {
    if (!schools || !schools.data) return;
    dispatch(setSchool(schools.data[0] ? schools.data[0].id : ""));
  }, [schools]);

  if (!schools?.data) return null;

  const onChange = (e: SelectChangeEvent<string>) => {
    dispatch(setSchool(e.target.value));
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel sx={{ top: -8 }}>School</InputLabel>
        <Select
          value={school_id}
          label="School"
          onChange={onChange}
          sx={{
            outline: "none",
            height: 40,
            width: "250px",
          }}
        >
          {schools?.data?.map((school: SchoolResponce) => (
            <MenuItem key={school.id} value={school.id}>
              {school.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
