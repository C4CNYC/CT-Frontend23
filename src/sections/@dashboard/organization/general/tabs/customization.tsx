import { useState } from "react";
import {Stack,  Typography, Box, Card} from "@mui/material";
import {
	MuiColorInput,
	MuiColorInputValue,
	MuiColorInputColors,
	matchIsValidColor
} from 'mui-color-input';
import { Controller, useForm, Resolver } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "../../../../../components/hook-form";
import * as Yup from "yup";
import {LoadingButton} from "@mui/lab";


type FormValuesProps = {
	firstName: string | null;
	lastName: string | null;
};

const Customize = Yup.object().shape({
	firstName: Yup.string().required("Name is required"),
	lastName: Yup.string().required("lastName is required"),
});

export default function CustomizationTab() {
	const defaultValues = {
		firstName: "All",
		lastName: "featured",
	};

	const methods = useForm<FormValuesProps>({
		resolver: yupResolver(Customize),
		defaultValues,
	});

	const {
		control,
		setValue,
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async (data: FormValuesProps) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 500));
			// enqueueSnackbar("Update success!");
			console.log("DATA", data);
		} catch (error) {
			console.error(error);
		}
	};

	const [color, setColor] = useState<MuiColorInputValue>('#ffffff')

	const handleChange = (newColor: string, colors: MuiColorInputColors) => {
		setColor(newColor)
	}

	return (
		<Card sx={{p: 3}}>
			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Box
						gap={2.5}
						display="grid"
						gridTemplateColumns={{
							xs: "repeat(3, 1fr)",
						}}
					>
						<Box>
							<Typography variant="h6" sx={{mt: 2, mb: 1}}>Primary Brand Color</Typography>
							<Controller
								name="primaryBrandColor"
								control={control}
								rules={{ validate: matchIsValidColor }}
								render={({ field, fieldState }) => (
									<MuiColorInput
										{...field}
										value={color}
										format="hex"
										isAlphaHidden
										helperText={fieldState.invalid ? "Color is invalid" : ""}
										error={fieldState.invalid}
										onChange={handleChange}
										style={{width: '100%'}}
									/>
								)}
							/>
						</Box>
						<Box>
							<Typography variant="h6" sx={{mt:2, mb: 1}}>Secondary Brand Color</Typography>
							<Controller
								name="secondaryBrandColor"
								control={control}
								rules={{ validate: matchIsValidColor }}
								render={({ field, fieldState }) => (
									<MuiColorInput
										{...field}
										value={color}
										format="hex"
										isAlphaHidden
										helperText={fieldState.invalid ? "Color is invalid" : ""}
										error={fieldState.invalid}
										onChange={handleChange}
										style={{width: '100%'}}
									/>
								)}
							/>
						</Box>
						<Box>
							<Typography variant="h6" sx={{mt:2, mb: 1}}>Alternative Brand Color</Typography>
							<Controller
								name="alternativeBrandColor"
								control={control}
								rules={{ validate: matchIsValidColor }}
								render={({ field, fieldState }) => (
									<MuiColorInput
										{...field}
										value={color}
										format="hex"
										isAlphaHidden
										helperText={fieldState.invalid ? "Color is invalid" : ""}
										error={fieldState.invalid}
										onChange={handleChange}
										style={{width: '100%'}}
									/>
								)}
							/>
						</Box>
					</Box>

					<Typography variant="h6" sx={{mt:4, mb: 2}}>Short description of platform for SEO</Typography>
					<RHFTextField
						name="description"
						label="Meta description"
						multiline
						rows={3}
						sx={{mb: 2}}
						helperText="Note: This will be added as the page meta description for the platform.
              Max 70 characters words - Approximately 10 words."
					/>

					<Typography variant="h6" sx={{mt:2, mb: 2}}>Customized Groups Name</Typography>
					<RHFTextField
						name="groupsName"
						label="Groups Name"
						sx={{mb: 2}}
						helperText="Note: Learners are either invited by an admin or auto-added to a Group on registration/signup.
              Some ideas, but you can choose your own: Class/esClub/sHub/sHive/sGroup/sAnything else that is fun and engaging."
					/>

					<Typography variant="h6" sx={{mt:2, mb: 2}}>Welcome text for Slide 1</Typography>
					<RHFTextField
						name="intro"
						label="Intro Guide"
						multiline
						rows={3}
						sx={{mb: 2}}
						helperText={"Note: Should be about 10-15 words and welcome new users to the platform in your own way. What is this? When you first arrive on the Coding Panel you see an \"Intro Guide\" with a sequence of explainer modals. Here you can customize the text for the first slide in the sequence."}
					/>
					<Stack>
						<LoadingButton
							type="submit"
							variant="contained"
							loading={isSubmitting}
							sx={{ ml: 'auto', mt: 4 }}
						>
							Save Changes
						</LoadingButton>
					</Stack>
				</FormProvider>
		</Card>
	);
}

