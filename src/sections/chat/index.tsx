import { useContext } from 'react'

// import { Firestore } from "firebase/firestore";

import { Chat } from '@/components/chat'
// import { useAuthContext } from "src/auth/useAuthContext";
import { useGetFriendsStudentContentQuery } from '@/redux/services/manager/friends-manager'
import { CodePanelContext } from '@/sections/code-panel/context/CodePanel.context'

export const CodePanelChat = (): React.ReactElement => {
  // const { sendMessage, getMessages } = useFirebaseChat();
  // const { user } = useAuthContext();
  const { publicPage } = useContext(CodePanelContext)
  const { data, isLoading } = useGetFriendsStudentContentQuery({ take: 50 }, { skip: publicPage })

  return (
    <Chat
      onSend={({ textContent, reciverId, ...rest }) => {
        // sendMessage(
        //   textContent,
        //   reciverId,
        //   user?.student_profile.id,
        //   rest.callback
        // );
      }}
      getMessages={(reciverId: string, cb: (messages: any[], db: any) => void) => {
        // getMessages(user?.student_profile.id, reciverId, cb);
      }}
      users={data?.data ?? []}
      isUserListLoading={isLoading}
    />
  )
}
