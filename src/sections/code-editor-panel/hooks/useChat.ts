// node modules
import { useDispatch } from "react-redux";
import type { Firestore } from "firebase/firestore";

// local files
import { type IChatMessage, useFirebaseChat } from "@sections/chat/hooks/useFirebaseChat.hook";
import { useAuthContext } from "src/auth/useAuthContext";
import { useGetFriendsStudentContentQuery } from "src/redux/services/manager/friends-manager";
import { setChatVisible } from "src/redux/slices/chat-handler";

import { type IChat } from "../chat";

interface UseChatProps {
  pablicPage?: boolean
}

const DEFAULT_PROPS = {
  pablicPage: false
}

export const useChat = ({ pablicPage = false }: UseChatProps = DEFAULT_PROPS): IChat => {
  const dispatch = useDispatch()
  const { sendMessage, getMessages: _getMessages } = useFirebaseChat();
  const { user } = useAuthContext();
  const { data, isLoading } = useGetFriendsStudentContentQuery(
    { take: 50 },
    { skip: pablicPage }
  );

  const onSend: IChat['onSend'] = ({ textContent, reciverId, ...rest }) => {
    sendMessage(textContent, reciverId, user?.id, rest.callback);
  }

  const getMessages = (
    reciverId: string,
    cb: (messages: IChatMessage[], db: Firestore) => void
  ) => {
    _getMessages(user?.id, reciverId, cb);
  }

  const onCloseChat = () => {
    dispatch(setChatVisible(false))
  }

  return {
    onSend,
    getMessages,
    users: data?.data ?? [],
    isUserListLoading: isLoading,
    onCloseChat
  }
}