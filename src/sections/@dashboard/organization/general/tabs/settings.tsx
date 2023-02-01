import {Stack, Card, Typography, Link} from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from '@mui/lab';
import { IUserAccountNotificationSettings } from '../../../@types/user';
import { useSnackbar } from '../../../../../components/snackbar';
import FormProvider, { RHFSwitch } from '../../../../../components/hook-form';
import LanguagePopover from "../../../../../layouts/dashboard/header/LanguagePopover";
import {useLocales} from "../../../../../locales";


const MARKET_PLACE_OPTIONS = [
	{
		value: 'marketPlaceContent',
		label: 'Show/Allow Marketplace content',
	},
] as const;


const SSO_OPTIONS = [
	{
		value: 'googleAuth',
		label: 'Allow Sign-in with Google',
	},
	{
		value: 'githubAuth',
		label: 'Allow Sign-in with Github',
	},
	{
		value: 'classroomAuth',
		label: 'Allow Sign-in with Google Classroom',
	},
] as const;

const USER_SETTINGS = [
	{ value: 'inviteUsers', label: 'Invite-only users' },
] as const;


const INTERACTIONS_SETTINGS = [
	{ value: 'chat', label: 'Disable Chat' },
	{ value: 'gallery', label: 'Disable Gallery' },
	{ value: 'globalGallery', label: 'Disable Global Gallery' },
] as const;

// ----------------------------------------------------------------------

type FormValuesProps = IUserAccountNotificationSettings;

export default function SettingsTab() {
	const { translate } = useLocales();
	const { enqueueSnackbar } = useSnackbar();

	const methods = useForm({
		// defaultValues,
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async (data: FormValuesProps) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 500));
			enqueueSnackbar(`${translate('messages_update_success')}`);
			console.log('DATA', data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Card sx={{ p: 3 }}>
						<Typography variant="overline" component="div" sx={{ color: 'text.secondary' }}>
							{`${translate('organizations_general__tabs_settings_content_settings')}`}
						</Typography>
						<Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
							{MARKET_PLACE_OPTIONS.map((activity) => (
								<RHFSwitch
									key={activity.value}
									name={activity.value}
									label={activity.label}
									sx={{ m: 0 }}
								/>
							))}
						</Stack>
					</Card>

					<Card sx={{ p: 3, mt: 2 }}>
						<Typography variant="overline" component="div" sx={{ color: 'text.secondary' }}>
							{`${translate('organizations_general__tabs_settings_content_sso')}`}
						</Typography>
						<Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
							{SSO_OPTIONS.map((activity) => (
								<RHFSwitch
									key={activity.value}
									name={activity.value}
									label={activity.label}
									sx={{ m: 0 }}
								/>
							))}
							<Typography variant="subtitle2" component="div" sx={{ color: 'text.secondary', whiteSpace: 'pre-line'  }}>
								{`${translate('organizations_general__tabs_settings_content_sso_note')}`}
								<Link href="https://ed.link/community/single-sign-on-for-education/" target="_blank">https://ed.link/community/single-sign-on-for-education/</Link>
							</Typography>
						</Stack>
					</Card>

					<Card sx={{ p: 3, mt: 2 }}>
						<Typography variant="overline" component="div" sx={{ color: 'text.secondary' }}>
							{`${translate('organizations_general__tabs_settings_content_user_settings')}`}
						</Typography>
						<Stack alignItems="flex-start" spacing={1} sx={{ mt: 2, }}>
							{USER_SETTINGS.map((item) => (
								<RHFSwitch
									key={item.value}
									name={item.value}
									label={item.label}
									sx={{ m: 0 }}
								/>
							))}
							<Typography variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
								{`${translate('organizations_general__tabs_settings_content_user_settings_note')}`}
							</Typography>
						</Stack>
					</Card>

					<Card sx={{ p: 3, mt: 2 }}>
						<Typography variant="overline" component="div" sx={{ color: 'text.secondary' }}>
							{`${translate('organizations_general__tabs_settings_content_lang_settings')}`}
						</Typography>
						<Stack alignItems="center" direction="row" spacing={1} sx={{ mt: 2 }}>
							<Typography variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
								{`${translate('organizations_general__tabs_settings_content_def_lang')}`}
							</Typography>
							<LanguagePopover />
						</Stack>
					</Card>

					<Card sx={{ p: 3, mt: 2 }}>
						<Typography variant="overline" component="div" sx={{ color: 'text.secondary' }}>
							{`${translate('organizations_general__tabs_settings_content_interactions_settings')}`}
						</Typography>
						<Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
							{INTERACTIONS_SETTINGS.map((item) => (
								<RHFSwitch
									key={item.value}
									name={item.value}
									label={item.label}
									sx={{ m: 0 }}
								/>
							))}
						</Stack>
						<Typography variant="subtitle2" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
							{`${translate('organizations_general__tabs_settings_content_interactions_settings_note')}`}
						</Typography>
					</Card>

					<Stack>
						<LoadingButton
							type="submit"
							variant="contained"
							loading={isSubmitting}
							sx={{ ml: 'auto', mt: 4 }}
						>
							{`${translate('actions_save_changes')}`}
						</LoadingButton>
					</Stack>
				</FormProvider>
	);
}
