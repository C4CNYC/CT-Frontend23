import { Box, Dialog } from "@mui/material";

import { BaseResponseInterface } from "@utils";
import { IClass } from "src/redux/interfaces/class.interface";

import JoinTribeContent from "./JoinTribeContent";
import JoinTribeHeader from "./JoinTribeHeader";
import JoinTribeLogin from "./join-tribe-login";

interface IJoinTribeModal {
  classInfo?: IClass & BaseResponseInterface;
  isSingIn?: boolean;
}

export default function JoinTribeModal({
  classInfo,
  isSingIn,
}: IJoinTribeModal): React.ReactElement {
  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <JoinTribeHeader classInfo={classInfo} />
      <Box py={3} px={2}>
        {isSingIn ? <JoinTribeContent /> : <JoinTribeLogin />}
      </Box>
    </Dialog>
  );
}
