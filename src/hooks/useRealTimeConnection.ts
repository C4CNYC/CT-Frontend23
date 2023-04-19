import {
  codeAtom,
  ICodeContent,
} from "@sections/teacher-panel/code-panel/atoms/code.atom";
import {
  globalCodePanelAtom,
  IGlobalCodePanelAtom,
} from "@sections/teacher-panel/code-panel/atoms/global-code-panel.atom";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { useAtom } from "jotai";
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

type RealTimeConnectionBody = ICodeContent & IGlobalCodePanelAtom;

const udpateWorkSpaceState = (
  userId: string,
  body: RealTimeConnectionBody
): void => {
  set(ref(db, "streams/" + userId), body);
};

export const useRealTimeConnection = (userId: string): void => {
  const [global, setGlobal] = useAtom(globalCodePanelAtom);
  const [code, setCode] = useAtom(codeAtom);

  const getWorkSpaceState = (userId: string): void => {
    const starCountRef = ref(db, "streams/" + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      setCode((prev) => ({
        code: data.code ?? prev.code,
        language: data.language ?? prev.language,
      }));

      setGlobal((prev) => ({
        ...prev,
        lessonId: data.lessonId,
        slideIndex: data.slideIndex,
      }));
    });
  };

  useEffect(() => {
    if (!userId) return;
    getWorkSpaceState(userId);
  }, [userId]);

  useEffect(() => {
    // console.log("work");
    // udpateWorkSpaceState(userId, { ...global, ...code });
  }, [global, code]);
};
