import { 
  useState,
  useEffect, 
} from "react";
import _ from "lodash";
import { useAtom } from "jotai";
import {
  Avatar,
  MainContainer,
  ExpansionPanel,
  ConversationList,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { useSelector } from "react-redux";
import { Firestore } from "firebase/firestore";

import {
  styled,
  useTheme,
  keyframes,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import { Iconify } from "@components";

import { Messages } from "./messages";
import { RootState } from "src/redux/store";
import { chatAtom } from "./atoms/chat.atom";
import { BaseResponseInterface } from "@utils"
import { User, UsersItem } from "./users-item";
import { useAuthContext } from "src/auth/useAuthContext";
import { IFriend } from "src/redux/interfaces/friends.interface";
import { IChatMessage } from "@sections/chat/hooks/useFirebaseChat.hook";
import { ChatgptFirebaseOnSendMessage } from "../../sections/chat/hooks/useChatgptChat.hook";
import { chatHandlerAtom } from "@sections/code-panel/top-bar/nav-bar/options/chatHendlerAtom";
import { helpMsgAtom } from "@sections/code-panel/top-bar/nav-bar/options/help-popup/modals/helpMsgAtom";

interface IChat {
  users: Array<IFriend & BaseResponseInterface>;
  isUserListLoading: boolean;
  getMessages: (
    reciverId: string,
    cb: (messages: IChatMessage[], db: Firestore) => void
  ) => void;
  onSend: (props: {
    innerHtml: string;
    textContent: string;
    innerText: string;
    reciverId: string;
    callback?: (db: Firestore) => void;
  }) => void;
}
interface ExpandProps {
  title: string;
  open: boolean;
  children: React.ReactElement;
}
const animationExpansion0pen = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;
const StylesExpansionPanel = styled(ExpansionPanel)<ExpandProps>`
  padding: 0;
  .cs-expansion-panel__header {
    .cs-expansion-panel__title {
      color: rgba(0, 0, 0, 0.87);
      font-size: 1.2em;
    }
  }
  .cs-expansion-panel__content {
    padding: 0;
    animation: 0.5s linear 0s 1 ${animationExpansion0pen} forwards;
  }
`;

export const Chat = ({
  users,
  onSend,
  getMessages,
  isUserListLoading,
}: IChat): React.ReactElement => {
  const theme = useTheme();
  const classId = useSelector(
    (state: RootState) => state.global.user?.classes?.[0]?.id
  );
  const senderId = useSelector((state: RootState) => state.global.user?.id);
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [, setChatVisible] = useAtom(chatHandlerAtom);
  const { user: loggedUser } = useAuthContext();
  const [{ user }, updateChat] = useAtom(chatAtom);
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [isTeachersOpen] = useState<boolean>(false);
  const [{ message: helpMsg, sent }, updateAtom] = useAtom(helpMsgAtom);

  useEffect(() => {
    if (!user) return;
    setMessages([]);
    getMessages(user.id, (messages, db) => {
      setMessages(messages);
    });
  }, [user]);

  type OnSendCallback = (
    reciverId: string,
    messageContent: string
  ) => (db: Firestore) => void;
  const onSendCallback: OnSendCallback =
    (reciverId, messageContent) => (db) => {
      if (reciverId === "SUPPORT") {
        ChatgptFirebaseOnSendMessage(
          reciverId,
          loggedUser?.id,
          [
            ...messages,
            {
              id: "_",
              text: messageContent,
              sender_id: loggedUser?.id,
              uid: "_",
            },
          ],
          db
        );
      }
    };

  useEffect(() => {
    if (sent) {
      onSend({
        innerHtml: helpMsg,
        innerText: helpMsg,
        reciverId: "SUPPORT",
        textContent: helpMsg,
      });
      updateAtom({ message: "", sent: false });
    }
  }, [sent]);

  return (
    <MainContainer
      style={{
        borderRadius: "10px",
        flexDirection: "column",
      }}
    >
      <ConversationHeader>
        {user && !isDesktop ? (
          <ConversationHeader.Back
            onClick={() => {
              updateChat((prev) => ({ ...prev, user: null }));
            }}
          />
        ) : null}

        {user ? (
          <Avatar
            src={
              user.avatar ??
              "https://tilomitra.com/wp-content/uploads/2014/08/avatar-cartoon.png"
            }
          />
        ) : null}
        <ConversationHeader.Content
          userName={
            user
              ? `${_.capitalize(user?.first_name)} ${_.capitalize(
                  user?.last_name
                )}`
              : "Chat"
          }
        />
        <ConversationHeader.Actions>
          {user && isDesktop ? (
            <IconButton
              onClick={() => {
                updateChat((prev) => ({ ...prev, user: null }));
              }}
            >
              <Iconify color="#6ea9d7" icon="ph:users-fill" />
            </IconButton>
          ) : null}
          {!isDesktop ? (
            <IconButton
              onClick={() => {
                setChatVisible(false);
              }}
            >
              <Iconify
                width="30px"
                height="30px"
                color="#6ea9d7"
                icon="ic:round-close"
              />
            </IconButton>
          ) : null}
        </ConversationHeader.Actions>
      </ConversationHeader>
      {user ? (
        <Messages
          getUserData={(userId: string) => users.find((u) => u.id === userId)}
          senderId={senderId as string}
          messages={messages}
          onSend={(innerHtml, textContent, innerText) => {
            onSend({
              innerHtml,
              textContent,
              innerText,
              reciverId: user.id,
              callback: onSendCallback(user.id, textContent),
            });
          }}
        />
      ) : (
        <>
          <StylesExpansionPanel title="Teachers" open={isTeachersOpen}>
            <ConversationList
              style={{
                width: "100%",
                height: "100%",
                boxShadow: "none",
                borderRight: "none",
                flexBasis: "500px",
              }}
              loading={isUserListLoading}
            >
              <UsersItem
                onSelecUser={(user: User) => {
                  updateChat((prev) => ({ ...prev, user }));
                }}
                getMessages={getMessages}
                // should be moved
                user={{
                  id: "SUPPORT",
                  createdAt: "",
                  updatedAt: "",
                  email: "support@codetribe.com",
                  first_name: "AI",
                  last_name: "Tutor",
                  phone: "",
                  country: "",
                  state: "",
                  city: "",
                  post_code: "",
                  about: "",
                  verified: false,
                  active: false,
                  avatar:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/120px-ChatGPT_logo.svg.png",
                }}
              />
              <UsersItem
                onSelecUser={(user: User) => {
                  updateChat((prev) => ({ ...prev, user }));
                }}
                getMessages={getMessages}
                // should be moved
                user={{
                  id: "SUPPORT",
                  createdAt: "",
                  updatedAt: "",
                  email: "support@codetribe.com",
                  first_name: "Support",
                  last_name: "",
                  phone: "",
                  country: "",
                  state: "",
                  city: "",
                  post_code: "",
                  about: "",
                  verified: false,
                  active: false,
                  avatar:
                    "https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-512.png",
                }}
              />
            </ConversationList>
          </StylesExpansionPanel>

          <ConversationList
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "none",
              borderRight: "none",
              flexBasis: "500px",
            }}
            loading={isUserListLoading}
          >
            <UsersItem
              onSelecUser={(user: User) => {
                updateChat((prev) => ({ ...prev, user }));
              }}
              getMessages={getMessages}
              user={{
                first_name: "Group",
                last_name: "Chat",
                avatar:
                  "https://cdn3.iconfinder.com/data/icons/communication-media-malibu-vol-1/128/group-chat-1024.png",
                id: classId as string,
              }}
            />
            {users.map((user) => (
              <UsersItem
                key={user.id}
                onSelecUser={(user: User) => {
                  updateChat((prev) => ({ ...prev, user }));
                }}
                getMessages={getMessages}
                user={user}
              />
            ))}
          </ConversationList>
        </>
      )}
    </MainContainer>
  );
};
