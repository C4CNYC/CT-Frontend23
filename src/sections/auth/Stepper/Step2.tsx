import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import InputInfo from './InputInfo'

export default function Step2() {
	const theme = useTheme();
	const values = [
		{
			value: 'def',
			label: 'Select what suits best',
		},
	];
	return (
			<Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
				<Typography variant="h4" sx={{textAlign: 'center'}}>District / Organization</Typography>
				<Typography variant="h6" sx={{color: theme.palette.grey[600], fontWeight: 400, textAlign: 'center', mt: '0 !important'}}>Skip this step if not applicable.</Typography>
				<TextField
					id="outlined-select-currency"
					select
					label="Organization Type"
					defaultValue={values[0].value}
				>
					{values.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					id="district"
					label="District / Organization Name"
					defaultValue="District of East London"
				/>
				<TextField
					id="ex-learners"
					label="Expected Learners per Annum"
					defaultValue="1k - 2k Annual Learners"
				/>
				<InputInfo text="Leave empty if no district website."/>
				<TextField
					id="website"
					label="Website"
					defaultValue="https://codejika.org"
				/>
			</Stack>
	);
}
