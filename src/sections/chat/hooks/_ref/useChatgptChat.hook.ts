import {
  Firestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { aiAssistantId, chatgptTutor } from "@utils";

import { getRoomId } from "@sections/chat/hooks/getRoomId"

export const ChatgptFirebaseOnSendMessage = async (
  reciverId: string, // chatgtp is the reciever
  senderId: string,
  messages: any[],
  db: Firestore
): Promise<void> => {
  try {
    const gemeratedResponse = await chatgptTutor.generateResponse(
      messages.slice(-3),
      aiAssistantId
    );
    await addDoc(
      collection(db, "chat-rooms", getRoomId(senderId, reciverId), "messages"),
      {
        sender_id: reciverId,
        text: gemeratedResponse,
        timestamp: serverTimestamp(),
      }
    );
  } catch (error: any) {}
};
