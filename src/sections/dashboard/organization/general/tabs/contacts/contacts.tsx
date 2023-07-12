import { Box } from "@mui/material";

import { useGetOrgContactsQuery } from "src/redux/services/admin/organization-contacts";
// auth
import ContactsForm from "src/sections/dashboard/organization/general/tabs/contacts/ContactsForm";

import SkeletonContactsForm from "./SkeletonContactsForm";

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
