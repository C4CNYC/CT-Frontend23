import { Box } from "@mui/material";
// auth
import SettingsForm from "src/sections/@dashboard/organization/general/tabs/settings/SettingsForm";
import {useGetOrgSettingsQuery} from "src/redux/services/admin";

export default function UserProfileTab() {
	const { data, isLoading } = useGetOrgSettingsQuery();

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
				{isLoading ? null : <SettingsForm settings={data} />}
			</Box>
		</>
	);
}
