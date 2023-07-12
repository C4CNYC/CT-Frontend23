import { Box } from "@mui/material";

import SkeletonContactsForm from "./SkeletonContactsForm";
import { useGetOrgContactsQuery } from "src/redux/services/admin/organization-contacts";
import ContactsForm from "src/sections/dashboard/organization/general/tabs/contacts/ContactsForm";

export default function ContactsTab(): React.ReactElement {
  const { data, isLoading } = useGetOrgContactsQuery();

  if (isLoading) {
    return <SkeletonContactsForm />;
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
        <ContactsForm contacts={data} />
      </Box>
    </>
  );
}
