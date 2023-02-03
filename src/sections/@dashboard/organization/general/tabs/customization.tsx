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
import {useLocales} from "../../../../../locales";


type FormValuesProps = {
	firstName: string | null;
	lastName: string | null;
};

const Customize = Yup.object().shape({
	firstName: Yup.string().required("Name is required"),
	lastName: Yup.string().required("lastName is required"),
});

export default function CustomizationTab() {
	const { translate } = useLocales();

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
							<Typography variant="h6" sx={{mt: 2, mb: 1}}>{`${translate("organizations.general_page.tabs.content.customization.primary_color")}`}</Typography>
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
										helperText={fieldState.invalid ? `${translate("organizations.general_page.tabs.content.customization.invalid_color_msg")}` : ""}
										error={fieldState.invalid}
										onChange={handleChange}
										style={{width: '100%'}}
									/>
								)}
							/>
						</Box>
						<Box>
							<Typography variant="h6" sx={{mt:2, mb: 1}}>{`${translate("organizations.general_page.tabs.content.customization.secondary_color")}`}</Typography>
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
										helperText={fieldState.invalid ? `${translate("organizations.general_page.tabs.content.customization.invalid_color_msg")}` : ""}
										error={fieldState.invalid}
										onChange={handleChange}
										style={{width: '100%'}}
									/>
								)}
							/>
						</Box>
						<Box>
							<Typography variant="h6" sx={{mt:2, mb: 1}}>{`${translate("organizations.general_page.tabs.content.customization.alternative_color")}`}</Typography>
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
										helperText={fieldState.invalid ? `${translate("organizations.general_page.tabs.content.customization.invalid_color_msg")}` : ""}
										error={fieldState.invalid}
										onChange={handleChange}
										style={{width: '100%'}}
									/>
								)}
							/>
						</Box>
					</Box>

					<Typography variant="h6" sx={{mt:4, mb: 2}}>{`${translate("organizations.general_page.tabs.content.customization.seo_description")}`}</Typography>
					<RHFTextField
						name="description"
						label={`${translate("organizations.general_page.tabs.content.customization.seo_input_label")}`}
						multiline
						rows={3}
						sx={{mb: 2}}
						helperText={`${translate("organizations.general_page.tabs.content.customization.seo_description_note")}`}
					/>

				<Typography variant="h6" sx={{mt:4, mb: 2}}>{`${translate("organizations.general_page.tabs.content.customization.groups_name")}`}</Typography>
					<RHFTextField
						name="groupsName"
						label={`${translate("organizations.general_page.tabs.content.customization.groups_input_label")}`}
						sx={{mb: 2}}
						helperText={`${translate("organizations.general_page.tabs.content.customization.groups_note")}`}
					/>

				<Typography variant="h6" sx={{mt:4, mb: 2}}>{`${translate("organizations.general_page.tabs.content.customization.first_slide_text")}`}</Typography>
					<RHFTextField
						name="intro"
						label={`${translate("organizations.general_page.tabs.content.customization.first_slide_input_label")}`}
						multiline
						rows={3}
						sx={{mb: 2}}
						helperText={`${translate("organizations.general_page.tabs.content.customization.first_slide_note")}`}
					/>
					<Stack>
						<LoadingButton
							type="submit"
							variant="contained"
							loading={isSubmitting}
							sx={{ ml: 'auto', mt: 4 }}
						>
							{`${translate("actions_save_changes")}`}
						</LoadingButton>
					</Stack>
				</FormProvider>
		</Card>
	);
}

