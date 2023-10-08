import { initializeApp } from "firebase/app";
import { Timestamp } from "firebase/firestore";
import {
  Firestore,
  addDoc,
  collection,
  getFirestore,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";

export interface IChatMessage {
  id: string;
  text: string;
  sender_id: string;
  uid: string;
  timestamp?: Timestamp;
}

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

const db = getFirestore(app);

interface FirebaseChatApi {
  sendMessage: (
    message: string,
    reciverId: string,
    senderId: string,
    callback?: (db: Firestore) => void
  ) => Promise<void>;
  getMessages: (
    senderId: string,
    reciverId: string,
    callback: (messages: IChatMessage[], db: Firestore) => void,
    limit?: number
  ) => void;
}

export const useFirebaseChat = (): FirebaseChatApi => {
  const classId = useSelector((state: RootState) => state.codePanel?.class?.id);

  return {
    sendMessage: async (
      message: string,
      reciverId: string,
      senderId: string,
      callback?: (db: Firestore) => void
    ) => {
      try {
        await addDoc(
          collection(
            db,
            "chat-rooms",
            classId === reciverId ? reciverId : getRoomId(senderId, reciverId),
            "messages"
          ),
          {
            sender_id: senderId,
            text: message,
            timestamp: serverTimestamp(),
          }
        );
        if (callback) {
          callback(db);
        }
      } catch (error: any) {}
    },
    getMessages: async (senderId, reciverId, callback, limit) => {
      try {
        return onSnapshot(
          query(
            collection(
              db,
              "chat-rooms",
              classId === reciverId
                ? reciverId
                : getRoomId(senderId, reciverId),
              "messages"
            ),
            limitToLast(limit ?? 50),
            orderBy("timestamp", "asc")
          ),
          (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as IChatMessage[];
            callback(messages, db);
          }
        );
      } catch (error: any) {
        console.log(error);
      }
    },
  };
};

export function getRoomId(senderId: string, reciverId: string): string {
  return [senderId, reciverId].sort().join("_");
}
