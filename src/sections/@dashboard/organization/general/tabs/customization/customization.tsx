import { Box } from "@mui/material";
// auth
import {useGetOrgCustomizationQuery} from "src/redux/services/admin";
import CustomizationForm from "./CustomizationForm";

export default function UserProfileTab() {
	const { data, isLoading } = useGetOrgCustomizationQuery();

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
				{isLoading ? null : <CustomizationForm customization={data} />}
			</Box>
		</>
	);
}
