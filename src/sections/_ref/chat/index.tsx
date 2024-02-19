// import { Firestore } from "firebase/firestore";

import { Chat } from '../../../components/_ref/chat/chat'

const CodePanelChat = (): React.ReactElement => {
  // const { sendMessage, getMessages } = useFirebaseChat();
  // const { user } = useAuthContext();
  return (
    <Chat
    // onSend={({ textContent, reciverId, ...rest }) => {
    //   sendMessage(textContent, reciverId, user?.student_profile.id, rest.callback)
    // }}
    // getMessages={(reciverId: string, cb: (messages: any[], db: any) => void) => {
    //   getMessages(user?.student_profile.id, reciverId, cb)
    // }}
    // users={data?.data ?? []}
    // isUserListLoading={isLoading}
    />
  )
}

export default CodePanelChat
