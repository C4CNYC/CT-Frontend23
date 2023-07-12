import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

import { ICodeContent } from "@sections/teacher-panel/code-panel/atoms/code.atom";
import { IGlobalCodePanelAtom } from "@sections/teacher-panel/code-panel/atoms/global-code-panel.atom";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

const db = getDatabase(app);

type RealTimeConnectionBody = ICodeContent & IGlobalCodePanelAtom;

export const useRealTimeConnection = (
  userId: string
): { data?: RealTimeConnectionBody } => {
  const [data, setData] = useState<RealTimeConnectionBody>();

  const getWorkSpaceState = (userId: string): void => {
    const starCountRef = ref(db, "/class-streams/" + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      setData(data);
    });
  };

  useEffect(() => {
    if (!userId) return;
    getWorkSpaceState(userId);
  }, [userId]);

  return { data };
};
