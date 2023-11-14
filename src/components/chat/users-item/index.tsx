import { useEffect, useState } from "react";

import { Avatar, Conversation } from "@chatscope/chat-ui-kit-react";
import _ from "lodash";

import { IChatMessage } from "@sections/chat/hooks/useFirebaseChat.hook";
import { BaseResponseInterface } from "@utils";
import { IFriend } from "src/redux/interfaces/friends.interface";

export type User =
  | (IFriend & BaseResponseInterface)
  | (Pick<IFriend, "first_name" | "last_name" | "avatar"> &
      Pick<BaseResponseInterface, "id">);

interface IUserList {
  onSelecUser: (user: User) => void;
  user: User;
  getMessages: (
    reciverId: string,
    cb: (messages: IChatMessage[]) => void,
    limit?: number
  ) => void;
}

export const UsersItem = ({
  getMessages,
  onSelecUser,
  user,
}: //   students,
IUserList): React.ReactElement => {
  const [lastMessage, setLastMessage] = useState<IChatMessage | null>(null);
  useEffect(() => {
    if (!user) return;
    getMessages(
      user.id,
      (messages) => {
        setLastMessage(messages[messages.length - 1] ?? null);
      },
      1
    );
  });

  return (
    <Conversation
      key={user.id}
      name={`${_.capitalize(user.first_name)} ${_.capitalize(user.last_name)}`}
      {...(lastMessage
        ? {
            lastSenderName:
              lastMessage.sender_id === user.id
                ? `${_.capitalize(user.first_name)} ${_.capitalize(
                    user.last_name
                  )}`
                : "Me",
          }
        : {})}
      info={lastMessage?.text}
      onClick={() => {
        onSelecUser(user);
      }}
    >
      <Avatar
        src={
          user.avatar ||
          "https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png"
        }
        name={`${_.capitalize(user.first_name)} ${_.capitalize(
          user.last_name
        )}`}
      />
    </Conversation>
  );
};
