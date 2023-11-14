import { useContext } from "react";

import { Firestore } from "firebase/firestore";

import { Chat } from "@components";
import { CodePanelContext } from "@sections/code-panel/context/CodePanel.context";
import { useAuthContext } from "src/auth/useAuthContext";
import { useGetFriendsStudentContentQuery } from "src/redux/services/manager/friends-manager";

import { IChatMessage, useFirebaseChat } from "./hooks/useFirebaseChat.hook";

export const CodePanelChat = (): React.ReactElement => {
  const { sendMessage, getMessages } = useFirebaseChat();
  const { user } = useAuthContext();
  const { publicPage } = useContext(CodePanelContext);
  const { data, isLoading } = useGetFriendsStudentContentQuery(
    { take: 50 },
    { skip: publicPage }
  );

  return (
    <Chat
      onSend={({ textContent, reciverId, ...rest }) => {
        sendMessage(textContent, reciverId, user?.id, rest.callback);
      }}
      getMessages={(
        reciverId: string,
        cb: (messages: IChatMessage[], db: Firestore) => void
      ) => {
        getMessages(user?.id, reciverId, cb);
      }}
      users={data?.data ?? []}
      isUserListLoading={isLoading}
    />
  );
};
