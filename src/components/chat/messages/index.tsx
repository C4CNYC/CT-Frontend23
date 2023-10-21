import {
  Avatar,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";

import { convertTimestamp } from "@sections/chat/helpers";
import { IChatMessage } from "@sections/chat/hooks/useFirebaseChat.hook";
import { BaseResponseInterface } from "@utils";
import { IFriend } from "src/redux/interfaces/friends.interface";

interface IMessages {
  senderId: string;
  messages: IChatMessage[];
  getUserData: (id: string) => (IFriend & BaseResponseInterface) | undefined;
  onSend: (
    innerHtml: string,
    textContent: string,
    innerText: string,
    nodes: NodeList
  ) => void;
}
export const Messages = ({
  senderId,
  getUserData,
  onSend,
  messages,
}: IMessages): React.ReactElement => {
  return (
    <>
      <MessageList>
        {messages.map((message, i) => {
          return (
            <>
              <Message
                key={i}
                model={{
                  message: message.text,
                  sentTime: "HUS",
                  sender: "Emily",
                  direction:
                    senderId !== message.sender_id ? "incoming" : "outgoing",
                  position: "single",
                }}
                avatarSpacer={
                  messages[i - 1]?.sender_id === message.sender_id &&
                  senderId !== message.sender_id
                }
              >
                {senderId !== message.sender_id &&
                messages[i - 1]?.sender_id !== message.sender_id ? (
                  <Avatar
                    src={
                      message.sender_id === "SUPPORT"
                        ? "https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-512.png"
                        : getUserData(message.sender_id)?.avatar ??
                          "https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png"
                    }
                    name={getUserData(message.sender_id)?.first_name}
                  />
                ) : null}
                <Message.Footer
                  sentTime={convertTimestamp(message.timestamp)}
                  style={{
                    fontSize: "11px",
                    lineHeight: 1,
                  }}
                />
              </Message>
            </>
          );
        })}
      </MessageList>
      <MessageInput
        onSend={onSend}
        style={{
          background: "#e9e9e9",
          padding: "10px",
        }}
        placeholder="Type message here"
      />
    </>
  );
};
