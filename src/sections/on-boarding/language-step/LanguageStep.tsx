import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { StepWizardChildProps } from "react-step-wizard";
import * as Yup from "yup";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Autocomplete,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { FormProvider } from "@components";
import { voidFunction } from "@utils";

import StepContainer from "../StepContainer";
import { LanguageItem } from "./LanguageItem";

interface FormValuesProps {
  language: string;
}

function LanguageStep({
  previousStep,
  goToStep,
}: Partial<StepWizardChildProps>): React.ReactElement {
  const CreateLanguage = Yup.object().shape({
    language: Yup.string(),
  });

  const defaultValues = {
    language: "",
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateLanguage),
    defaultValues,
  });

  const onSubmit = (): void => {
    voidFunction();
  };
  return (
    <StepContainer>
      <Stack>
        <IconButton
          onClick={previousStep}
          sx={{
            position: "absolute",
            top: "5px",
            left: "5px",
            width: "50px",
            height: "50px",
          }}
        >
          <MdOutlineArrowBackIos size="30px" color="#68767F" />
        </IconButton>
        <Stack sx={{ pl: { xs: 4, sm: 3 }, py: { xs: 3, sm: 2 } }}>
          <Typography variant="h3">Select a Language</Typography>
          <Typography variant="body1" sx={{ display: "inline-flex", pb: 1 }}>
            Chose the project you will be using
          </Typography>
        </Stack>
        <Stack
          sx={{
            background: "#F0EEEE80",
            borderRadius: "15px",
            gap: 2,
            mb: 3,
            p: {
              xs: "5px 5px 10px",
              sm: "20px 20px 30px",
            },
          }}
        >
          <Typography variant="h5" sx={{ pl: { xs: 2, sm: 0 } }}>
            Popular:
          </Typography>
          {LANGUAGE_INFO.map((el, i) => (
            <LanguageItem
              title={el.title}
              subtitle={el.subtitle}
              img={el.img}
              key={el.title}
              goToStep={goToStep}
            />
          ))}
        </Stack>
        <Stack sx={{ width: "100%", pb: "50px" }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Stack
              sx={{
                width: "100%",
                flexDirection: "row",
                gap: 2,
                maxHeight: "56px",
              }}
            >
              <Autocomplete
                fullWidth
                options={LANGUAGE_INFO}
                getOptionLabel={(option) => option.title}
                popupIcon={<ExpandMoreIcon />}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select other languages"
                    margin="none"
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                onClick={() => {
                  goToStep?.(5);
                }}
                sx={{
                  color: "#EAEAEB",
                  fontSize: "1.5rem",
                }}
              >
                GO <ArrowForwardIosIcon />
              </Button>
            </Stack>
          </FormProvider>
        </Stack>
      </Stack>
    </StepContainer>
  );
}
export default LanguageStep;
const LANGUAGE_INFO = [
  {
    title: "Kaboom.js",
    subtitle:
      "A fun way to create games. Created to transition learners from block- to text-based.",
    img: "/assets/on-boarding/kaboom.svg",
  },
  {
    title: "HTML/CSS",
    subtitle:
      "Learn the basics of the web together. Spin up fun web-based projects.",
    img: "/assets/on-boarding/html.svg",
  },
  {
    title: "Python",
    subtitle:
      "Being the most beginner-friendly and readable means you’ll always have a fan club",
    img: "/assets/on-boarding/python.svg",
  },
];
