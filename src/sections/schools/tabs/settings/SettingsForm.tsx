import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import { Card, Link, Stack, Typography } from "@mui/material";

import { FormProvider, RHFSelect, RHFSwitch } from "@components";
import { useUpdateSchoolSettingsMutation } from "src/redux/services/manager/schools-manager";
import { setSchoolSettings } from "src/redux/slices/schoolSettings";
import { dispatch } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

import { SchoolSettings } from "../../../../redux/services/interfaces/school.interface";

interface FormValuesProps {
  language: string;
  schoolId: string;
  marketplace_content_allowed: boolean;
  github_login_allowed: boolean;
  google_login_allowed: boolean;
  invite_only: boolean;
  last_name_only: boolean;
  chat_allowed: boolean;
  gallery_allowed: boolean;
  global_gallery_allowed: boolean;
}

interface SettingsFormProps {
  settings?: SchoolSettings;
  schoolId: string;
}

export default function SettingsForm({
  settings,
  schoolId,
}: SettingsFormProps): React.ReactElement {
  const [updateSettings, { isLoading }] = useUpdateSchoolSettingsMutation();
  const translate = useTranslate();

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    schoolId,
    language: settings?.language ?? "en",
    marketplace_content_allowed: settings?.marketplace_content_allowed ?? false,
    github_login_allowed: settings?.github_login_allowed ?? false,
    google_login_allowed: settings?.google_login_allowed ?? false,
    invite_only: settings?.invite_only ?? false,
    last_name_only: settings?.last_name_only ?? true,
    chat_allowed: settings?.chat_allowed ?? false,
    gallery_allowed: settings?.gallery_allowed ?? false,
    global_gallery_allowed: settings?.global_gallery_allowed ?? false,
  };

  const methods = useForm<FormValuesProps>({
    // resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const { handleSubmit, formState, reset } = methods;
  const isFormEdited = formState.isDirty;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      const updatedData = {
        schoolId,
        language: data.language,
        marketplace_content_allowed: data.marketplace_content_allowed,
        github_login_allowed: data.github_login_allowed,
        google_login_allowed: data.google_login_allowed,
        invite_only: data.invite_only,
        last_name_only: data.last_name_only,
        chat_allowed: data.chat_allowed,
        gallery_allowed: data.gallery_allowed,
        global_gallery_allowed: data.global_gallery_allowed,
      };
      await updateSettings(updatedData).unwrap();
      dispatch(setSchoolSettings(updatedData));
      enqueueSnackbar(translate("messages_update_success"));
      reset({}, { keepValues: true });
    } catch (error: any) {}
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Typography
          variant="overline"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          {translate("general_content_settings")}
        </Typography>
        <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
          <RHFSwitch
            checked={settings?.marketplace_content_allowed}
            key="marketplace_content_allowed"
            name="marketplace_content_allowed"
            label={translate("general_settings_switcher_market_place_content")}
            sx={{ m: 0 }}
          />
        </Stack>
      </Card>
      <Card sx={{ p: 3, mt: 2 }}>
        <Typography
          variant="overline"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          {translate("general_settings_sso")}
        </Typography>
        <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
          <RHFSwitch
            key="google_login_allowed"
            name="google_login_allowed"
            label={translate("general_settings_allow_sign_in_google")}
            sx={{ m: 0 }}
          />
          <RHFSwitch
            key="github_login_allowed"
            name="github_login_allowed"
            label={translate("general_settings_allow_sign_in_github")}
            sx={{ m: 0 }}
          />
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ color: "text.secondary", whiteSpace: "pre-line" }}
          >
            {translate("general_settings_sso_note")}
            <Link
              href="https://ed.link/community/single-sign-on-for-education/"
              target="_blank"
            >
              https://ed.link/community/single-sign-on-for-education/
            </Link>
          </Typography>
        </Stack>
      </Card>

      <Card sx={{ p: 3, mt: 2 }}>
        <Typography
          variant="overline"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          {translate("general_user_settings")}
        </Typography>
        <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
          <RHFSwitch
            key="last_name_only"
            name="last_name_only"
            label={translate("general_settings_show_students_name")}
            sx={{ m: 0 }}
          />
          <RHFSwitch
            key="invite_only"
            name="invite_only"
            label={translate("general_user_invate_only")}
            sx={{ m: 0 }}
          />
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {translate("general_user_settings_note")}
          </Typography>
        </Stack>
      </Card>

      <Card sx={{ p: 3, mt: 2 }}>
        <Typography
          variant="overline"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          {translate("general_lang_settings")}
        </Typography>
        <Stack alignItems="center" direction="row" spacing={1} sx={{ mt: 2 }}>
          <RHFSelect
            native
            name="language"
            label={translate("general_lang_settings_default")}
            sx={{ width: { xs: "100%", sm: "320px" } }}
          >
            <option key="en" value="en">
              English
            </option>
          </RHFSelect>
        </Stack>
      </Card>

      <Card sx={{ p: 3, mt: 2 }}>
        <Typography
          variant="overline"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          {translate("general_interaction_setting")}
        </Typography>
        <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
          <RHFSwitch
            key="chat_allowed"
            name="chat_allowed"
            label={translate("general_settings_disable_chat")}
            sx={{ m: 0 }}
          />
          <RHFSwitch
            key="gallery_allowed"
            name="gallery_allowed"
            label={translate("general_settings_disable_gallery")}
            sx={{ m: 0 }}
          />
          <RHFSwitch
            key="global_gallery_allowed"
            name="global_gallery_allowed"
            label={translate("general_settings_disable_global_gallery")}
            sx={{ m: 0 }}
          />
        </Stack>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{ color: "text.secondary", mt: 1 }}
        >
          {translate("general_interaction_note")}
        </Typography>
      </Card>

      <Stack>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isLoading}
          disabled={!isFormEdited}
          sx={{ ml: "auto", mt: 4, mb: 4 }}
        >
          {translate("actions_save_changes")}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
