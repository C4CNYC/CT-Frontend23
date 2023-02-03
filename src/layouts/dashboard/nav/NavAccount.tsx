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
import { useGetOrganizationListQuery, useGetSchoolListQuery } from "src/redux/services/admin";
import { useDispatch, useSelector } from "react-redux";
import { setOrganization } from "src/redux/slices/global";
import { RootState } from "src/redux/store";
import { useEffect } from "react";
import { SchoolResponce } from "src/redux/services/interfaces/school.interface";

export default function NavAccount() {
  const { data: schools, isLoading } = useGetSchoolListQuery({});


  if (isLoading && !schools) return null;

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">School</InputLabel>
        <Select
          // value={org_id}
          label="School"
          // onChange={onChange}
          sx={{
            outline: "none",
            height: 48,
            width: "100%",
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
