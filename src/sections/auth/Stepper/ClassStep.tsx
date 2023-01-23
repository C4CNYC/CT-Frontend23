import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Button, Stack} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputInfo from "./InputInfo";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useCreateClassMutation } from 'src/redux/services/manager';

export default function ClassStep() {
	const theme = useTheme();
	const router = useRouter();
	const [createClass, { isLoading }] = useCreateClassMutation();
	const { register, handleSubmit, formState: { errors } } = useForm();
	const { schoolId } = router.query;
	const onSubmit = async (data: any) => {
		try {
			const school = await createClass({
				schoolId,
				...data
			}).unwrap();
			
		} catch(e) {
			// #TODO show error
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
				<Typography variant="h4" sx={{textAlign: 'center'}}>Class Created</Typography>
				<Typography variant="h6" sx={{color: theme.palette.grey[600], fontWeight: 400, textAlign: 'center', mt: '0 !important'}}>We’ve auto-generated your first class.</Typography>
				<Typography variant="h6" sx={{color: theme.palette.grey[600], fontWeight: 400, textAlign: 'center', mt: '0 !important'}}>Now you can already invite learners. </Typography>

				<InputInfo text="Here you can change the auto-generated name. "/>
				<TextField
					label="Class Name"
					{...register("name")}
				/>
			</Stack>
			<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
				<Button disabled={isLoading} type='submit' sx={{ mr: 1 }}>
					Next
				</Button>
			</Box>
		</form>
	);
}
