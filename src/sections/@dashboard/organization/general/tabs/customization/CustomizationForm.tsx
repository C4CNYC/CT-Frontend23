import { LoadingButton } from "@mui/lab";
import {useState} from 'react';
import {Card, Stack, Typography, Link, Box} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import { useSnackbar } from "notistack";
import FormProvider, { RHFTextField,
} from "../../../../../../components/hook-form";
import {
  useUpdateOrgCustomizationMutation,
} from "src/redux/services/admin";
import {CustomizationResponce} from "src/redux/services/interfaces/organization.interface";
import {useLocales} from "../../../../../../locales";
import { matchIsColorValid, MuiColorInput } from "mui-color-input";


type FormValuesProps = {
  description: string,
  welcome_message: string,
  custom_group_name: string,
  primaryColor: string,
  secondaryColor: string,
  alternativeColor: string,
};


type CustomizationFormProps = {
  customization?: CustomizationResponce;
};

export default function CustomizationForm({
                                       customization,
                                     }: CustomizationFormProps) {
  const [updateCustomization, { isLoading }] = useUpdateOrgCustomizationMutation();
  const { translate } = useLocales();

  const { enqueueSnackbar } = useSnackbar();
  console.log(customization)

  const defaultValues = {
    description: customization?.description,
    welcome_message: customization?.welcome_message,
    custom_group_name: customization?.custom_group_name,
    theme: {
      primaryColor: customization?.primaryColor,
      secondaryColor: customization?.secondaryColor,
      alternativeColor: customization?.alternativeColor,
    }
  };

  console.log(customization);
  const methods = useForm<FormValuesProps>({
    // resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const { handleSubmit, formState, reset, control } = methods;
  const isFormEdited = formState.isDirty;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await updateCustomization({
        description: data.description,
        welcome_message: data.welcome_message,
        custom_group_name: data.custom_group_name,
        theme: {
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor,
          alternativeColor: data.alternativeColor,
        }
      });
      enqueueSnackbar("Update success!");
      reset({}, { keepValues: true });
    } catch (error) {
      console.error(error);
    }
  };

    return (
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
              control={control}
              name="primaryColor"
              rules={{
                validate: matchIsColorValid
              }}
              render={({ field, fieldState }) => (
                <MuiColorInput
                  {...field}
                  value={field.value || customization.theme.primaryColor}
                  helperText={fieldState.invalid ? "Color is invalid" : ""}
                  error={fieldState.invalid}
                  isAlphaHidden
                  format="hex"
                />
              )}
            />
          </Box>
          <Box>
            <Typography variant="h6" sx={{mt: 2, mb: 1}}>{`${translate("organizations.general_page.tabs.content.customization.secondary_color")}`}</Typography>
            <Controller
              control={control}
              rules={{
                validate: matchIsColorValid
              }}
              render={({ field, fieldState }) => (
                <MuiColorInput
                  {...field}
                  value={field.value || customization.theme.secondaryColor}
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
            <Typography variant="h6" sx={{mt: 2, mb: 1}}>{`${translate("organizations.general_page.tabs.content.customization.alternative_color")}`}</Typography>
            <Controller
              control={control}
              rules={{
                validate: matchIsColorValid
              }}
              render={({ field, fieldState }) => (
                <MuiColorInput
                  {...field}
                  value={field.value || customization.theme.alternativeColor}
                  helperText={fieldState.invalid ? "Color is invalid" : ""}
                  error={fieldState.invalid}
                  isAlphaHidden
                  format="hex"
                />
              )}
              name="alternativeColor"
            />
          </Box>

          {/*<Box>*/}
          {/*  <Typography variant="h6" sx={{mt:2, mb: 1}}>{`${translate("organizations.general_page.tabs.content.customization.secondary_color")}`}</Typography>*/}
          {/*  <Controller*/}
          {/*    name="secondaryBrandColor"*/}
          {/*    control={control}*/}
          {/*    rules={{ validate: matchIsValidColor }}*/}
          {/*    render={({ field, fieldState }) => (*/}
          {/*      <MuiColorInput*/}
          {/*        {...field}*/}
          {/*        value={color}*/}
          {/*        format="hex"*/}
          {/*        isAlphaHidden*/}
          {/*        helperText={fieldState.invalid ? `${translate("organizations.general_page.tabs.content.customization.invalid_color_msg")}` : ""}*/}
          {/*        error={fieldState.invalid}*/}
          {/*        onChange={handleChange}*/}
          {/*        style={{width: '100%'}}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</Box>*/}
          {/*<Box>*/}
          {/*  <Typography variant="h6" sx={{mt:2, mb: 1}}>{`${translate("organizations.general_page.tabs.content.customization.alternative_color")}`}</Typography>*/}
          {/*  <Controller*/}
          {/*    name="alternativeBrandColor"*/}
          {/*    control={control}*/}
          {/*    rules={{ validate: matchIsValidColor }}*/}
          {/*    render={({ field, fieldState }) => (*/}
          {/*      <MuiColorInput*/}
          {/*        {...field}*/}
          {/*        value={color}*/}
          {/*        format="hex"*/}
          {/*        isAlphaHidden*/}
          {/*        helperText={fieldState.invalid ? `${translate("organizations.general_page.tabs.content.customization.invalid_color_msg")}` : ""}*/}
          {/*        error={fieldState.invalid}*/}
          {/*        onChange={handleChange}*/}
          {/*        style={{width: '100%'}}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</Box>*/}
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
          name="custom_group_name"
          label={`${translate("organizations.general_page.tabs.content.customization.groups_input_label")}`}
          sx={{mb: 2}}
          helperText={`${translate("organizations.general_page.tabs.content.customization.groups_note")}`}
        />

        <Typography variant="h6" sx={{mt:4, mb: 2}}>{`${translate("organizations.general_page.tabs.content.customization.first_slide_text")}`}</Typography>
        <RHFTextField
          name="welcome_message"
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
            loading={isLoading}
            disabled={!isFormEdited}
            sx={{ ml: 'auto', mt: 4 }}
          >
            {`${translate("actions_save_changes")}`}
          </LoadingButton>
        </Stack>
      </FormProvider>

  );
}
