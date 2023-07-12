import { MuiColorInput } from "mui-color-input";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";

import { FormProvider, RHFTextField } from "@components";
import { BaseResponseInterface } from "@utils";
import { useUpdateOrgCustomizationMutation } from "src/redux/services/admin/organization-customization";
import { CustomizationResponce } from "src/redux/services/interfaces/organization.interface";

import { useLocales } from "../../../../../../locales";

interface FormValuesProps {
  description: string;
  welcome_message: string;
  custom_group_name: string;
  primaryColor: string;
  secondaryColor: string;
  alternativeColor: string;
}

interface CustomizationFormProps {
  customization?: CustomizationResponce & BaseResponseInterface;
}

export default function CustomizationForm({
  customization,
}: CustomizationFormProps): React.ReactElement | null {
  const [updateCustomization, { isLoading }] =
    useUpdateOrgCustomizationMutation();
  const { translate } = useLocales();

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    description: customization?.description as string,
    welcome_message: customization?.welcome_message as string,
    custom_group_name: customization?.custom_group_name as string,
    primaryColor: customization?.theme?.primaryColor as string,
    secondaryColor: customization?.theme?.secondaryColor as string,
    alternativeColor: customization?.theme?.alternativeColor as string,
  };

  const methods = useForm<FormValuesProps>({
    // resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const { handleSubmit, formState, reset, control } = methods;
  const isFormEdited = formState.isDirty;

  const onSubmit = async (data: FormValuesProps): Promise<void> => {
    try {
      await updateCustomization({
        description: data.description,
        welcome_message: data.welcome_message,
        custom_group_name: data.custom_group_name,
        theme: {
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor,
          alternativeColor: data.alternativeColor,
        },
      }).unwrap();
      enqueueSnackbar("Update success!");
      reset({}, { keepValues: true });
    } catch (error: any) {}
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        gap={2.5}
        display="grid"
        justifyItems={{ xs: "center", sm: "start" }}
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{`${translate(
            "organizations.general_page.tabs.content.customization.primary_color"
          )}`}</Typography>
          <Controller
            control={control}
            name="primaryColor"
            render={({ field, fieldState }) => (
              <MuiColorInput
                {...field}
                value={field.value}
                helperText={fieldState.invalid ? "Color is invalid" : ""}
                error={fieldState.invalid}
                isAlphaHidden
                format="hex"
              />
            )}
          />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{`${translate(
            "organizations.general_page.tabs.content.customization.secondary_color"
          )}`}</Typography>
          <Controller
            control={control}
            render={({ field, fieldState }) => (
              <MuiColorInput
                {...field}
                value={field.value}
                helperText={fieldState.invalid ? "Color is invalid" : ""}
                error={fieldState.invalid}
                isAlphaHidden
                format="hex"
              />
            )}
            name="secondaryColor"
          />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{`${translate(
            "organizations.general_page.tabs.content.customization.alternative_color"
          )}`}</Typography>
          <Controller
            control={control}
            render={({ field, fieldState }) => (
              <MuiColorInput
                {...field}
                value={field.value}
                helperText={fieldState.invalid ? "Color is invalid" : ""}
                error={fieldState.invalid}
                isAlphaHidden
                format="hex"
              />
            )}
            name="alternativeColor"
          />
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>{`${translate(
        "organizations.general_page.tabs.content.customization.seo_description"
      )}`}</Typography>
      <RHFTextField
        name="description"
        label={`${translate(
          "organizations.general_page.tabs.content.customization.seo_input_label"
        )}`}
        multiline
        rows={3}
        sx={{ mb: 2 }}
        helperText={`${translate(
          "organizations.general_page.tabs.content.customization.seo_description_note"
        )}`}
      />

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>{`${translate(
        "organizations.general_page.tabs.content.customization.groups_name"
      )}`}</Typography>
      <RHFTextField
        name="custom_group_name"
        label={`${translate(
          "organizations.general_page.tabs.content.customization.groups_input_label"
        )}`}
        sx={{ mb: 2 }}
        helperText={`${translate(
          "organizations.general_page.tabs.content.customization.groups_note"
        )}`}
      />

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>{`${translate(
        "organizations.general_page.tabs.content.customization.first_slide_text"
      )}`}</Typography>
      <RHFTextField
        name="welcome_message"
        label={`${translate(
          "organizations.general_page.tabs.content.customization.first_slide_input_label"
        )}`}
        multiline
        rows={3}
        sx={{ mb: 2 }}
        helperText={`${translate(
          "organizations.general_page.tabs.content.customization.first_slide_note"
        )}`}
      />
      <Stack>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isLoading}
          disabled={!isFormEdited}
          sx={{ ml: "auto", mt: 4, mb: 10 }}
        >
          {`${translate("actions_save_changes")}`}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
