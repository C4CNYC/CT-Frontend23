import nextLink from "next/link";

import { HiArrowRight } from "react-icons/hi";

import { Link, Typography } from "@mui/material";

import { PATH_AUTH } from "@routes/paths";

interface Props {
  isRegister?: boolean;
  isTeacher?: boolean;
}

export function SingLink({ isRegister }: Props): React.ReactElement {
  return (
    <Link
      component={nextLink}
      href={isRegister ? PATH_AUTH.onBoardingTeacher : PATH_AUTH.signIn}
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
          <Typography variant="body2">This is my first time</Typography> |{" "}
          <Typography variant="subtitle2">REGISTER</Typography>
        </>
      ) : (
        <>
          <Typography variant="body2">I’ve been here before</Typography> |{" "}
          <Typography variant="subtitle2">LOGIN</Typography>
        </>
      )}
    </Link>
  );
}

export function RegisterStudenTeacher({
  isTeacher,
}: Props): React.ReactElement {
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
      Register as {isTeacher ? "Student" : "Teacher"} <HiArrowRight size={20} />
    </Link>
  );
}
