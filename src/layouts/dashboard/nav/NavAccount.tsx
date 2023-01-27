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
import { useGetOrganizationListQuery } from "src/redux/services/admin";
import { useDispatch, useSelector } from "react-redux";
import { setOrganization } from "src/redux/slices/global";
import { RootState } from "src/redux/store";
import { useEffect } from "react";

export default function NavAccount() {
  const dispatch = useDispatch();
  const org_id = useSelector((state: RootState) => state.global.org_id);
  const organizationList = useSelector(
    (state: RootState) => state.global.organizations
  );

  const onChange = (event: SelectChangeEvent) => {
    dispatch(setOrganization(event.target.value));
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Organization</InputLabel>
        <Select
          value={org_id}
          label="Organization"
          onChange={onChange}
          sx={{
            outline: "none",
            height: 48,
            width: "100%",
          }}
        >
          {organizationList?.map((organization) => (
            <MenuItem key={organization.id} value={organization.id}>
              {organization.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
