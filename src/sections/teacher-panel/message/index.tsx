import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

export const Messages = (): React.ReactElement => {
  return (
    <>
      <div
        style={{
          position: "relative",
          height: "329px",
          width: "392px",
          right: "9px",
          zIndex: 999,
          bottom: 0,
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
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "just now",
                  direction: "incoming",
                  sender: "Joe",
                  position: "single",
                }}
              />
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              style={{ padding: "12px", borderTop: "none" }}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
};
