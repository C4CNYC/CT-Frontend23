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
import { useGetSchoolListQuery } from "src/redux/services/admin";
import { useDispatch, useSelector } from "react-redux";
import { setOrganization } from "src/redux/slices/global";
import { RootState } from "src/redux/store";
import { useEffect } from "react";
import { SchoolResponce } from "src/redux/services/interfaces/school.interface";
import { useRouter } from "next/router";

export default function SchoolAccount() {
  const router = useRouter();
  const { data: schools, isLoading } = useGetSchoolListQuery({});
  const isSchoolSection = router.pathname.includes('dashboard/school');

  if ((isLoading && !schools) || !isSchoolSection) return null;

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel sx={{ top: -8}}>School</InputLabel>
        <Select
          // value={org_id}
          label="School"
          // onChange={onChange}
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
