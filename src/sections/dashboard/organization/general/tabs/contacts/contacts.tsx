import { Box } from "@mui/material";
// auth
import { useGetOrgContactsQuery } from "src/redux/services/admin";
import ContactsForm from "src/sections/dashboard/organization/general/tabs/contacts/ContactsForm";

export default function ContactsTab(): React.ReactElement {
  const { data, isLoading } = useGetOrgContactsQuery();

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
        {isLoading ? null : <ContactsForm contacts={data} />}
      </Box>
    </>
  );
}
