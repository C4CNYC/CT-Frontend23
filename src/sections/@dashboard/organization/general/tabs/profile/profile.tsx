import { Box } from "@mui/material";
// auth
import OrganizationForm from "src/sections/@dashboard/organization/general/tabs/profile/OrganizationForm";
import { useGetOrganizationQuery } from "src/redux/services/admin";

export default function UserProfileTab() {
  const { data, isLoading } = useGetOrganizationQuery();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "transparent !important",
          mb: 3,
          height: 420,
          position: "relative",
        }}
      >
        {isLoading ? null : <OrganizationForm organization={data} />}
      </Box>
    </>
  );
}
