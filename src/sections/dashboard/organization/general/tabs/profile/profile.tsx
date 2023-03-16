import { Box } from "@mui/material";
// auth
import { useGetOrganizationQuery } from "src/redux/services/admin";
import OrganizationForm from "src/sections/dashboard/organization/general/tabs/profile/OrganizationForm";
import SkeletonProfileOrg from "./SkeletonProfileOrg";

export default function UserProfileTab(): React.ReactElement {
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
        {isLoading ? (
          <SkeletonProfileOrg />
        ) : (
          <OrganizationForm organization={data} />
        )}
      </Box>
    </>
  );
}
