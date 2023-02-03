import { Box } from "@mui/material";
// auth
import ContactsForm from "src/sections/@dashboard/organization/ContactsForm";
import { useGetOrganizationQuery } from "src/redux/services/admin";

export default function ContactsTab() {
	const { data, isLoading } = useGetOrganizationQuery();

	return (
		<>
				<Box
					sx={{
						backgroundColor: 'transparent !important',
						mb: 3,
						height: 420,
						position: "relative",
					}}
				>
					{isLoading ? null : <ContactsForm organization={data} />}
				</Box>
		</>
	);
}
