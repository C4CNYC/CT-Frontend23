import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputInfo from "./InputInfo";

export default function Step3() {
	const theme = useTheme();
	const values = [
		{
			value: 'def',
			label: 'Select what suits best',
		},
	];
	return (
			<Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
				<Typography variant="h4" sx={{textAlign: 'center'}}>Class Created</Typography>
				<Typography variant="h6" sx={{color: theme.palette.grey[600], fontWeight: 400, textAlign: 'center', mt: '0 !important'}}>We’ve auto-generated your first class.</Typography>
				<Typography variant="h6" sx={{color: theme.palette.grey[600], fontWeight: 400, textAlign: 'center', mt: '0 !important'}}>Now you can already invite learners. </Typography>

				<InputInfo text="Here you can change the auto-generated name. "/>
				<TextField
					id="className"
					label="Class Name"
					defaultValue="Class Name"
				/>

				<InputInfo text="Change from the (default) course assigned."/>
				<TextField
					id="enrolledIn"
					select
					label="Enrolled In"
					defaultValue={values[0].value}
				>
					{values.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			</Stack>
	);
}
