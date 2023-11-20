import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import { Card, Link, Stack, Typography } from "@mui/material";

import { FormProvider, RHFSelect, RHFSwitch } from "@components";
import { useUpdateSchoolSettingsMutation } from "src/redux/services/manager/schools-manager";

import { useLocales } from "../../../../locales";
import { SchoolSettings } from "../../../../redux/services/interfaces/school.interface";
import { dispatch } from "src/redux/store";
import { setSchoolSettings } from "src/redux/slices/schoolSettings";

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
  const { translate } = useLocales();

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
      }
      await updateSettings(updatedData).unwrap();
      dispatch(setSchoolSettings(updatedData));
      enqueueSnackbar("Update success!");
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
          {`${translate(
            "organizations.general_page.tabs.content.settings.content_settings"
          )}`}
        </Typography>
        <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
          <RHFSwitch
            checked={settings?.marketplace_content_allowed}
            key="marketplace_content_allowed"
            name="marketplace_content_allowed"
            label="Show/Allow Marketplace content"
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
          {`${translate(
            "organizations.general_page.tabs.content.settings.sso"
          )}`}
        </Typography>
        <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
          <RHFSwitch
            key="google_login_allowed"
            name="google_login_allowed"
            label="Allow Sign-in with Google"
            sx={{ m: 0 }}
          />
          <RHFSwitch
            key="github_login_allowed"
            name="github_login_allowed"
            label="Allow Sign-in with Github"
            sx={{ m: 0 }}
          />
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ color: "text.secondary", whiteSpace: "pre-line" }}
          >
            {`${translate(
              "organizations.general_page.tabs.content.settings.sso_note"
            )}`}
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
          {`${translate(
            "organizations.general_page.tabs.content.settings.user_settings"
          )}`}
        </Typography>
        <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
          <RHFSwitch
            key="last_name_only"
            name="last_name_only"
            label="Show students' full last name"
            sx={{ m: 0 }}
          />
          <RHFSwitch
            key="invite_only"
            name="invite_only"
            label="Invite-only users"
            sx={{ m: 0 }}
          />
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {`${translate(
              "organizations.general_page.tabs.content.settings.user_settings_note"
            )}`}
          </Typography>
        </Stack>
      </Card>

      <Card sx={{ p: 3, mt: 2 }}>
        <Typography
          variant="overline"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          {`${translate(
            "organizations.general_page.tabs.content.settings.lang_settings"
          )}`}
        </Typography>
        <Stack alignItems="center" direction="row" spacing={1} sx={{ mt: 2 }}>
          <RHFSelect
            native
            name="language"
            label={`${translate(
              "organizations.general_page.tabs.content.settings.def_lang"
            )}`}
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
          {`${translate(
            "organizations.general_page.tabs.content.settings.interactions_settings"
          )}`}
        </Typography>
        <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
          <RHFSwitch
            key="chat_allowed"
            name="chat_allowed"
            label="Disable Chat"
            sx={{ m: 0 }}
          />
          <RHFSwitch
            key="gallery_allowed"
            name="gallery_allowed"
            label="Disable Gallery"
            sx={{ m: 0 }}
          />
          <RHFSwitch
            key="global_gallery_allowed"
            name="global_gallery_allowed"
            label="Disable Global Gallery"
            sx={{ m: 0 }}
          />
        </Stack>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{ color: "text.secondary", mt: 1 }}
        >
          {`${translate(
            "organizations.general_page.tabs.content.settings.interactions_settings_note"
          )}`}
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
          {`${translate("actions_save_changes")}`}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
