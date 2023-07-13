import { Box } from "@mui/material";

import { useGetOrgSettingsQuery } from "src/redux/services/admin/organization-settings";
// auth
import SettingsForm from "src/sections/dashboard/organization/general/tabs/settings/SettingsForm";

import SkeletonSettingsOrg from "./SkeletonSettingsOrg";

export default function UserProfileTab(): React.ReactElement {
  const { data, isLoading } = useGetOrgSettingsQuery();

  if (isLoading) {
    return <SkeletonSettingsOrg />;
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
        <SettingsForm settings={data} />
      </Box>
    </>
  );
}
