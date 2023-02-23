import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { useGetSchoolContactsQuery } from "src/redux/services/manager";
import ContactsForm from "./ContactsForm";

interface Props {
  school_id: string;
}

export default function SchoolContactsTab({
  school_id,
}: Props): React.ReactElement | null {
  const { data, isLoading } = useGetSchoolContactsQuery(
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
          <ContactsForm contacts={data} school_id={school_id} />
        )}
      </Box>
    </>
  );
}
