// import { Firestore } from "firebase/firestore";

// import { Chat } from '@/components/chat'
import { Chat } from '@/components/chat/chat'

export const CodePanelChat = (): React.ReactElement => {
  // const { sendMessage, getMessages } = useFirebaseChat();

  return (
    <Chat
    // onSend={({ textContent, reciverId, ...rest }) => {
    //   sendMessage(
    //     textContent,
    //     reciverId,
    //     user?.student_profile.id,
    //     rest.callback
    //   );
    // }}
    // getMessages={(reciverId: string, cb: (messages: any[], db: any) => void) => {
    //   getMessages(user?.student_profile.id, reciverId, cb);
    // }}
    />
  )
}
