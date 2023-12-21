import React from "react";

import { Box } from "@mui/material";

import { useGetSchoolContactsQuery } from "src/redux/services/manager/schools-manager";

import ContactsForm from "./ContactsForm";
import SkeletonContactsTab from "./SkeletonContactsTab";

interface Props {
  schoolId: string;
}

export default function SchoolContactsTab({
  schoolId,
}: Props): React.ReactElement | null {
  const { data, isLoading } = useGetSchoolContactsQuery(
    { schoolId },
    { skip: !schoolId }
  );

  if (isLoading) return <SkeletonContactsTab />;

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
          <ContactsForm contacts={data} schoolId={schoolId} />
        )}
      </Box>
    </>
  );
}
