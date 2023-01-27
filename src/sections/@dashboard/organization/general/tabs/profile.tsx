import { Box } from "@mui/material";
import { ProfileCover } from "../../../user/profile";
// auth
import OrganizationForm from "src/sections/@dashboard/organization/OrganizationForm";
import { useGetOrganizationQuery } from "src/redux/services/admin";
import Iconify from "../../../../../components/iconify";

export default function UserProfileTab() {
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
					{isLoading ? null : <OrganizationForm organization={data} />}
				</Box>
		</>
	);
}
