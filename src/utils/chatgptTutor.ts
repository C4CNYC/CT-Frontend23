import { ChatgptTutor } from "chatgpttutor";

const aiAssistantId = "SUPPORT";

const chatgptTutor = new ChatgptTutor();
chatgptTutor.initializeChatgptTutor(
  process.env.NEXT_PUBLIC_OPENAI_API_KEY as string,
  "NONE"
);

export { aiAssistantId, chatgptTutor };
