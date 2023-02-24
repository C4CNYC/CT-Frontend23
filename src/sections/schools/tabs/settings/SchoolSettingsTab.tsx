import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { useGetSchoolSettingsQuery } from "src/redux/services/manager";
import SettingsForm from "./SettingsForm";

interface Props {
  school_id: string;
}

export default function SchoolSettingTab({
  school_id,
}: Props): React.ReactElement | null {
  const { data, isLoading } = useGetSchoolSettingsQuery(
    { school_id },
    { skip: !school_id }
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
          position: "relative",
        }}
      >
        {isLoading
? null
: (
          <SettingsForm settings={data} school_id={school_id} />
        )}
      </Box>
    </>
  );
}
