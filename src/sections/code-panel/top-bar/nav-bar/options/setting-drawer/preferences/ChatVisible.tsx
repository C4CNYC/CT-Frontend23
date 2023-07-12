import { Stack, Switch, Typography } from "@mui/material";

import { Iconify } from "@components";

import BasePreference from "./BasePreference";

interface IChatVisible {
  chatVisible: boolean;
  onUpdateChatVisible: (newValue: boolean) => void;
}

const ChatVisible = ({
  chatVisible,
  onUpdateChatVisible,
}: IChatVisible): React.ReactElement => {
  return (
    <BasePreference
      title="chat visible"
      abandonmentIcon={<Iconify width="27px" icon="mdi:chat-outline" />}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="subtitle1">Enable:</Typography>
        <Switch
          checked={chatVisible}
          onChange={(e, newvalue) => {
            onUpdateChatVisible(newvalue);
          }}
        />
      </Stack>
    </BasePreference>
  );
};

export default ChatVisible;
