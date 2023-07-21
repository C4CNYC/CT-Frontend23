import { Box } from "@mui/material";

import { useGetOrganizationQuery } from "src/redux/services/admin/organization-admin";
import OrganizationForm from "src/sections/dashboard/organization/general/tabs/profile/OrganizationForm";

import SkeletonProfileOrg from "./SkeletonProfileOrg";

export default function UserProfileTab(): React.ReactElement {
  const { data, isLoading } = useGetOrganizationQuery();

  if (isLoading) {
    return <SkeletonProfileOrg />;
  }

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
        <OrganizationForm organization={data} />
      </Box>
    </>
  );
}
