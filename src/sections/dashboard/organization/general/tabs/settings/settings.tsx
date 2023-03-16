import { Box } from "@mui/material";
// auth
import { useGetOrgSettingsQuery } from "src/redux/services/admin";
import SettingsForm from "src/sections/dashboard/organization/general/tabs/settings/SettingsForm";
import SkeletonSettingsOrg from "./SkeletonSettingsOrg";

export default function UserProfileTab(): React.ReactElement {
  const { data, isLoading } = useGetOrgSettingsQuery();

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
        {isLoading ? <SkeletonSettingsOrg /> : <SettingsForm settings={data} />}
      </Box>
    </>
  );
}
