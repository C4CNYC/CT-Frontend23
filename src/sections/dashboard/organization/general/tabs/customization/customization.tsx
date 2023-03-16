import { Box } from "@mui/material";
// auth
import { useGetOrgCustomizationQuery } from "src/redux/services/admin";
import CustomizationForm from "./CustomizationForm";
import SkeletonCustomizationOrg from "./SkeletonCustomizationOrg";

export default function UserProfileTab(): React.ReactElement {
  const { data, isLoading } = useGetOrgCustomizationQuery();

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
          <SkeletonCustomizationOrg />
        ) : (
          <CustomizationForm customization={data} />
        )}
      </Box>
    </>
  );
}
