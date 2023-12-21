import { useRouter } from "next/router";
import { useEffect } from "react";

import { countries } from "@assets/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  useSnackbar,
} from "@components";
import { SchoolType } from "src/redux/services/enums/school-type.enum";
import {
  useGetMySchoolsQuery,
  useUpdateSchoolProfileMutation,
} from "src/redux/services/manager/schools-manager";
import { useTranslate } from "src/utils/translateHelper";

import { styledRegisterInput } from "../styles";

interface SchoolFormProps {
  schoolName: string;
  type: SchoolType;
  city: string;
  zip: string;
  country: string;
}

export default function AddSchool(): React.ReactElement {
  const { reload } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading } = useGetMySchoolsQuery({});
  const [updateSchool, { isLoading: isUpdating }] =
    useUpdateSchoolProfileMutation();
  const translate = useTranslate();

  const defaultCountry =
    countries.find((ct) => ct.code === "US") ?? countries[0];

  const CreateSchoolSchema = Yup.object().shape({
    schoolName: Yup.string().required(translate("required_name")),
    type: Yup.string().required(translate("choose_school_type")),
    city: Yup.string().required(translate("choose_your_city")),
    zip: Yup.string(),
    country: Yup.string().required(translate("choose_school_country")),
  });

  useEffect(() => {
    if (!isLoading && data) {
      methods.reset({
        schoolName: data.data[0].name ?? "",
        type: data.data[0].type ?? SchoolType.Middle_School,
        city: data.data[0].city ?? "",
        zip: data.data[0].zip ?? "",
        country: data.data[0].country ?? defaultCountry.label,
      });
    }
  }, [isLoading]);

  const methods = useForm<SchoolFormProps>({
    resolver: yupResolver(CreateSchoolSchema),
    mode: "all",
    defaultValues: {
      schoolName: "",
    },
  });

  const onSubmit = async (schoolData: SchoolFormProps) => {
    try {
      await updateSchool({
        schoolId: data?.data[0].id as string,
        name: schoolData.schoolName,
        type: schoolData.type,
        zip: schoolData.zip,
        country: schoolData.country,
        city: schoolData.city,
      }).unwrap();
      localStorage.setItem("ON-BOARDING", "on-boarding");
      reload();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <Stack minHeight={500}>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack direction="row" sx={{ ml: { xs: 3, sm: 3, md: 0 } }}>
          <Typography
            variant="h3"
            sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}
          >
            {translate("schools_add_aschool")}
            <Typography sx={{ display: "inline-flex" }} variant="h2">
              🏫
            </Typography>
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ pb: 3, ml: { xs: 3, sm: 3, md: 0 } }}>
          {translate("register_school_name_see")}
        </Typography>
        <Stack gap={3}>
          <RHFTextField
            name="schoolName"
            label={translate("add_school_name")}
            sx={(theme) => ({ ...styledRegisterInput(theme) })}
          />
          <RHFSelect
            native
            name="type"
            label={translate("register_school_type")}
            sx={(theme) => ({ ...styledRegisterInput(theme) })}
          >
            {Object.keys(SchoolType).map((c) => (
              <option key={c} value={SchoolType[c as keyof typeof SchoolType]}>
                {translate(SchoolType[c as keyof typeof SchoolType])}
              </option>
            ))}
          </RHFSelect>
          <Stack direction="row" sx={{ gap: 2 }}>
            <RHFTextField
              name="city"
              label={translate("city")}
              sx={(theme) => ({ ...styledRegisterInput(theme) })}
            />
            <RHFTextField
              name="zip"
              label={translate("zip_code")}
              type="number"
              sx={(theme) => ({ ...styledRegisterInput(theme) })}
            />
          </Stack>
          <RHFSelect
            native
            name="country"
            label={translate("country")}
            sx={(theme) => ({ ...styledRegisterInput(theme) })}
          >
            <option key={defaultCountry.code} value={defaultCountry.label}>
              {defaultCountry.label}
            </option>
            <option disabled>─────────────────────────</option>
            {countries
              .filter((el) => el.code !== "US")
              .map((country) => (
                <option key={country.code} value={country.label}>
                  {country.label}
                </option>
              ))}
          </RHFSelect>
        </Stack>
        <LoadingButton
          type="submit"
          sx={{
            background: "#43D4DD33",
            color: "#43D4DD",
            fontSize: "1.5rem",
            mt: 3,
            width: "100%",
            "&:hover": {
              background: "#fff",
            },
          }}
          loading={isUpdating}
        >
          {translate("register_all_done")}
        </LoadingButton>
      </FormProvider>
    </Stack>
  );
}
