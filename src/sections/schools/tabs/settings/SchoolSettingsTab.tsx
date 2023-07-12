import React from "react";

import { Box } from "@mui/material";

import SettingsForm from "./SettingsForm";
import SkeletonSettingsTab from "./SkeletonSettingsTab";
import { useGetSchoolSettingsQuery } from "src/redux/services/manager/schools-manager";

interface Props {
  schoolId: string;
}

export default function SchoolSettingTab({
  schoolId,
}: Props): React.ReactElement | null {
  const { data, isLoading } = useGetSchoolSettingsQuery(
    { schoolId },
    { skip: !schoolId }
  );

  if (isLoading) return <SkeletonSettingsTab />;

  if (!data) return <>No Data</>;

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
        {isLoading ? null : (
          <SettingsForm settings={data} schoolId={schoolId} />
        )}
      </Box>
    </>
  );
}
