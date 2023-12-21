import nextLink from "next/link";

import { HiArrowRight } from "react-icons/hi";

import { Link, Typography } from "@mui/material";

import { PATH_AUTH } from "@routes/paths";
import { useTranslate } from "src/utils/translateHelper";

interface Props {
  isRegister?: boolean;
  isTeacher?: boolean;
}

export function SingLink({ isRegister }: Props): React.ReactElement {
  const translate = useTranslate();

  return (
    <Link
      component={nextLink}
      href={isRegister ? PATH_AUTH.onBoardingStudent : PATH_AUTH.signIn}
      underline="none"
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        gap: 1,
        color: "inherit",
        alignItems: "center",
        mt: "auto",
      }}
    >
      {isRegister ? (
        <>
          <Typography variant="body2">
            {translate("login_my_first_time")}
          </Typography>{" "}
          |{" "}
          <Typography variant="subtitle2">
            {translate("login_register")}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="body2">
            {translate("login_been_here")}
          </Typography>{" "}
          | <Typography variant="subtitle2">{translate("login")}</Typography>
        </>
      )}
    </Link>
  );
}

export function RegisterStudenTeacher({
  isTeacher,
}: Props): React.ReactElement {
  const translate = useTranslate();

  return (
    <Link
      component={nextLink}
      href={
        isTeacher ? PATH_AUTH.onBoardingStudent : PATH_AUTH.onBoardingTeacher
      }
      underline="none"
      typography="subtitle1"
      sx={{
        position: "absolute",
        right: "0px",
        top: "-80px",
        color: "#02D3D7",
        display: "flex",
        gap: 1,
        alignItems: "center",
      }}
    >
      {translate("login_register_as")}{" "}
      {isTeacher ? translate("student") : translate("teacher")}
      <HiArrowRight size={20} />
    </Link>
  );
}
