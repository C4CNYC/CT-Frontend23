import { Box } from "@mui/material";

import { useGetOrgCustomizationQuery } from "src/redux/services/admin/organization-customization";

// auth
import CustomizationForm from "./CustomizationForm";
import SkeletonCustomizationOrg from "./SkeletonCustomizationOrg";

export default function UserProfileTab(): React.ReactElement {
  const { data, isLoading } = useGetOrgCustomizationQuery();

  if (isLoading) {
    return <SkeletonCustomizationOrg />;
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
        <CustomizationForm customization={data} />
      </Box>
    </>
  );
}
