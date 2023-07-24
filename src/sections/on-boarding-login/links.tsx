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
      href={isRegister ? PATH_AUTH.onBoardingTeacher : PATH_AUTH.singIn}
      underline="none"
      sx={{
        display: "flex",
        position: "absolute",
        bottom: "-25px",
        left: "-10px",
        gap: 1,
        ml: 2,
        color: "inherit",
        alignItems: "center",
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
        top: "-100px",
        color: "#02D3D7",
        ml: 2,
        mt: 2,
        display: "flex",
        gap: 1,
        alignItems: "center",
      }}
    >
      Register as {isTeacher ? "Student" : "Teacher"} <HiArrowRight size={20} />
    </Link>
  );
}
