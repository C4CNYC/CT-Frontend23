import { useState } from "react";
import Head from "next/head";
import {Stack, Container, Card, Grid, Typography, Box, Link} from "@mui/material";
import { PATH_DASHBOARD } from "../../../routes/paths";
import DashboardLayout from "../../../layouts/dashboard";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { Controller, useForm, Resolver } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from '@mui/lab';
import { IUserAccountNotificationSettings } from '../../../@types/user';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSwitch, RHFTextField } from '../../../components/hook-form';
import { useSettingsContext } from "../../../components/settings";


Settings.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

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

const NOTIFICATION_SETTINGS = {
  activityComments: true,
  activityAnswers: true,
  activityFollows: false,
  applicationNews: true,
  applicationProduct: false,
  applicationBlog: false,
};

// ----------------------------------------------------------------------

type FormValuesProps = IUserAccountNotificationSettings;

export default function Settings() {
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();

  const defaultValues = {
    activityComments: NOTIFICATION_SETTINGS.activityComments,
    activityAnswers: NOTIFICATION_SETTINGS.activityAnswers,
    activityFollows: NOTIFICATION_SETTINGS.activityFollows,
    applicationNews: NOTIFICATION_SETTINGS.applicationNews,
    applicationProduct: NOTIFICATION_SETTINGS.applicationProduct,
    applicationBlog: NOTIFICATION_SETTINGS.applicationBlog,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Head>
        <title>Settings | Codetribe</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Customization"
          links={[
            {
              name: "Organization",
              href: PATH_DASHBOARD.organization.settings,
            },
            { name: "Settings" },
          ]}
        />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ p: 3 }}>
            <Typography variant="overline" component="div" sx={{ color: 'text.secondary' }}>
              Content Settings
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
              SSO
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
              <Typography variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
                Note: Single-sign-on allows interfacing with:
                Google Classroom
                Schoolology
                Clever <br/>
                More about Edu SSO: <Link href="https://ed.link/community/single-sign-on-for-education/" target="_blank">https://ed.link/community/single-sign-on-for-education/</Link>
              </Typography>

            </Stack>
          </Card>

          <Card sx={{ p: 3, mt: 2 }}>
            <Typography variant="overline" component="div" sx={{ color: 'text.secondary' }}>
              User Settings
            </Typography>
            <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2, }}>
              {USER_SETTINGS.map((item) => (
                <RHFSwitch
                  key={item.value}
                  name={item.value}
                  label={item.label}
                  sx={{ m: 0 }}
                  sx={{ m: 0 }}
                />
              ))}
              <Typography variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
                Note: Only allow users to sign-up when invited by and teacher
              </Typography>
            </Stack>
          </Card>

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
      </Container>
    </>
  );
}

