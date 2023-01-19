import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function Step1() {
	const theme = useTheme();
	const values = [
		{
			value: 'def',
			label: 'Select what suits best',
		},
	];
	return (
			<Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
				<Typography variant="h4" sx={{textAlign: 'center'}}>School / Location</Typography>
				<Typography variant="h6" sx={{color: theme.palette.grey[600], fontWeight: 400, textAlign: 'center', mt: '0 !important'}}>Add your school or academy.</Typography>
				<TextField
					required
					id="outlined-select-currency"
					select
					label="School/Location Type*"
					defaultValue={values[0].value}
				>
					{values.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					required
					id="school"
					label="School name"
					defaultValue="Junior High School of Jakarta"
				/>
				<TextField
					required
					id="city"
					label="City"
					defaultValue="Jakarta"
				/>
				<TextField
					required
					id="country"
					label="Country"
					defaultValue="Indonesia"
				/>
			</Stack>
	);
}
