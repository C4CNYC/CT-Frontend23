// @mui
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
// components
import { useGetOrganizationListQuery } from "src/redux/services/admin";
import { useDispatch, useSelector } from "react-redux";
import { setOrganization } from "src/redux/slices/global";
import { age } from "src/_mock/assets";
import { RootState } from "src/redux/store";
import { useEffect } from "react";
import { group } from "console";
import { StyledSubheader } from "src/components/nav-section/vertical/styles";
import { NodeNextRequest } from "next/dist/server/base-http/node";


export default function NavAccount() {
  const dispatch = useDispatch();
  const organizationId = useSelector((state: RootState) => state.global.organizationId)
  const { data, isLoading } = useGetOrganizationListQuery();

  const onChange = (event: SelectChangeEvent) => {
    dispatch(setOrganization(event.target.value))
  }

  useEffect(() => {
    if(data?.data) {
      dispatch(setOrganization(data?.data[0].id))
    }
  }, [data])

  if (isLoading) { 
    return null;
  }
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Organization</InputLabel>
        <Select
            value={organizationId}
            label="Organization"
            onChange={onChange}
            sx={{
              outline: 'none',
              height: 48,
              width: '100%',
            }}
          >
          {data?.data.map((organization) => (
              <MenuItem key={organization.id} value={organization.id}>
                {organization.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>

  );
}
