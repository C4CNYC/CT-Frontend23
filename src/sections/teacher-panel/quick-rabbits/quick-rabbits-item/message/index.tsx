import {
  Avatar,
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  IChatMessage,
  useFirebaseChat,
} from "@sections/teacher-panel/atoms/useFirebaseChat.hook";
import { useEffect, useState } from "react";

interface IMessages {
  reciverId: string;
}

export const Messages = ({ reciverId }: IMessages): React.ReactElement => {
  const senderId = "SUPPORT";
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const { getMessages, sendMessage } = useFirebaseChat();

  useEffect(() => {
    console.log("started test");
    getMessages(senderId, reciverId, (data) => {
      setMessages(data);
    });
  }, []);

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "438px",
          width: "102%",
          zIndex: 999,
          right: "2px",
        }}
      >
        <MainContainer
          style={{
            border: "1px solid #364954",
            borderEndEndRadius: "15px",
            borderEndStartRadius: "15px",
          }}
        >
          <ChatContainer>
            <MessageList style={{ backgroundColor: "#364954" }}>
              {messages.map((message, i) => (
                <Message
                  key={i}
                  model={{
                    message: message.text,
                    sentTime: "15 mins ago",
                    sender: "Emily",
                    direction:
                      reciverId === message.sender_id ? "incoming" : "outgoing",
                    position: "first",
                  }}
                  avatarSpacer={
                    messages[i - 1]?.sender_id === message.sender_id &&
                    reciverId === message.sender_id
                  }
                >
                  {reciverId === message.sender_id &&
                  messages[i - 1]?.sender_id !== message.sender_id ? (
                    <Avatar
                      src="https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png"
                      name="Zoe"
                    />
                  ) : null}
                </Message>
              ))}
            </MessageList>
            <MessageInput
              onSend={(innerHtml, textContent) => {
                sendMessage(textContent, reciverId, senderId);
              }}
              placeholder="Type message here"
              style={{
                padding: "15px 8px 22px 8px",
                borderTop: "none",
              }}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
};
