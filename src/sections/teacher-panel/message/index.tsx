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
          height: "338px",
          width: "102%",
          zIndex: 999,
          right: "2px"
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
              style={{ paddingBottom: "12px", paddingTop: "8px", borderTop: "none" }}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
};
