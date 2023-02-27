import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { useGetSchoolSettingsQuery } from "src/redux/services/manager/schools-manager";
import SettingsForm from "./SettingsForm";

interface Props {
  schoolId: string;
}

export default function SchoolSettingTab({
                                           schoolId
                                         }: Props): React.ReactElement | null {
  const { data, isLoading } = useGetSchoolSettingsQuery(
    { schoolId },
    { skip: !schoolId }
  );

  if (isLoading) return <CircularProgress />;

  if (!data) return <>No Data</>;

  return (
    <>
      <Box
        sx={{
          backgroundColor: "transparent !important",
          mb: 3,
          height: 420,
          position: "relative"
        }}
      >
        {isLoading
          ? null
          : (
            <SettingsForm settings={data} schoolId={schoolId} />
          )}
      </Box>
    </>
  );
}
