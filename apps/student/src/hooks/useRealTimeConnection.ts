import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

const udpateWorkSpaceState = (
  userId: string,
  body: { lessonId: string; slideIndex: number; code: string }
): void => {
  if (!userId) return;
  set(ref(db, "/class-streams/" + userId), body);
};

export const useRealTimeConnection = (userId: string, code: string): void => {
  const { query } = useRouter();
  const [global] = useAtom(globalCodePanelAtom);
  useEffect(() => {
    udpateWorkSpaceState(userId, {
      lessonId: query.lesson_id as string,
      slideIndex: global.slideIndex,
      code,
    });
  }, [global, query.lesson_id, code]);
};
