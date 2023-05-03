import differenceInMinutes from "date-fns/differenceInMinutes";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

interface IUseOnlineConnection {
  lastActivityAt: string;
}

const db = getDatabase(app);

export const useOnlineConnection = (
  userId: string
): {
  isOnline: boolean;
  lastTimeActivity: null | number;
} => {
  const [data, setData] = useState<IUseOnlineConnection | null>(null);

  useEffect(() => {
    const starCountRef = ref(db, "active/" + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  return {
    isOnline: Boolean(data),
    lastTimeActivity: data
      ? differenceInMinutes(new Date(), new Date(data.lastActivityAt))
      : null,
  };
};
