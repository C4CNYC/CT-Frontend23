import FormProvider from "@components/hook-form/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBackIos } from "react-icons/md";
import * as Yup from "yup";
import StepContainer from "../StepContainer";
import { stepperAtom } from "../stepper-atom";
import { LanguageItem } from "./LanguageItem";

interface FormValuesProps {
  language: string;
}

export default function LanguageStep(): React.ReactElement {
  const [, setStep] = useAtom(stepperAtom);

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

  const onSubmit = () => {};
  return (
    <StepContainer>
      <IconButton
        onClick={() => {
          setStep(0);
        }}
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "50px",
          height: "50px",
        }}
      >
        <MdOutlineArrowBackIos size="30px" color="#68767F" />
      </IconButton>
      <Stack sx={{ pl: 2, pt: 1 }}>
        <Typography variant="h3">Select a Language</Typography>
        <Typography variant="body1" sx={{ display: "inline-flex", pb: 1 }}>
          Chose the project you will be using
        </Typography>
      </Stack>
      <Stack
        sx={{
          background: "#F0EEEE80",
          p: "10px 10px 30px 30px",
          borderRadius: "15px",
          gap: 2,
        }}
      >
        <Typography variant="h5">Popular:</Typography>
        {LANGUAGE_INFO.map((el, i) => (
          <LanguageItem
            title={el.title}
            subtitle={el.subtitle}
            img={el.img}
            key={el.title}
          />
        ))}
      </Stack>
      <Stack sx={{ width: "100%", pb: "100px" }}>
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
            <LoadingButton
              type="submit"
              variant="contained"
              loading={false}
              onClick={() => {
                setStep(3);
              }}
              sx={{
                color: "#EAEAEB",
                fontSize: "1.5rem",
              }}
            >
              GO <ArrowForwardIosIcon />
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Stack>
    </StepContainer>
  );
}

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
