import { useState } from "react";

import { Box, Dialog } from "@mui/material";

import { BaseResponseInterface } from "@utils";
import { IClass } from "src/redux/interfaces/class.interface";

import JoinTribeContent from "./JoinTribeContent";
import JoinTribeHeader from "./JoinTribeHeader";
import JoinTribeLogin from "./join-tribe-login";
import JoinTribeRegister from "./join-tribe-register.tsx";

interface IJoinTribeModal {
  classInfo: IClass & BaseResponseInterface;
  isSignIn?: boolean;
}

export default function JoinTribeModal({
  classInfo,
  isSignIn,
}: IJoinTribeModal): React.ReactElement {
  const [isLogin, setIsLogin] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };

  const handleChangeAuthorization = (): void => {
    setIsLogin(!isLogin);
  };

  return (
    <Dialog
      open={modalOpen}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "18px",
        },
      }}
    >
      <JoinTribeHeader classInfo={classInfo} />
      <Box py={3} px={2}>
        {isSignIn ? (
          <JoinTribeContent
            classId={classInfo.id}
            handleCloseModal={handleCloseModal}
          />
        ) : isLogin ? (
          <JoinTribeLogin
            classId={classInfo.id}
            handleChangeAuthorization={handleChangeAuthorization}
          />
        ) : (
          <JoinTribeRegister
            handleChangeAuthorization={handleChangeAuthorization}
          />
        )}
      </Box>
    </Dialog>
  );
}
