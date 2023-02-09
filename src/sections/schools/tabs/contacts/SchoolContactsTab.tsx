import { Box } from "@mui/material";
import ContactsForm from "./ContactsForm";
import { useGetSchoolContactsQuery } from "src/redux/services/manager";


type Props = {
  school_id: string;
};

export default function SchoolContactsTab({school_id} : Props) {
  const { data, isLoading } = useGetSchoolContactsQuery({school_id}, {skip: !school_id});

  if (isLoading) return 'Loading';

  if (!data) return 'No data';

  console.log(data);
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
        {isLoading ? null : <ContactsForm contacts={data} school_id={school_id}/>}
      </Box>
    </>
  );
}
