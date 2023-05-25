import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";

interface IUseStream {
  data: any;
  remove: () => void;
  onChangeEditor: (data: Record<string, string>) => void;
  onChangeCanvas: (data: Record<string, string>) => void;
}

interface IStreamBody {
  editor: string;
  canvas: string;
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

const db = getDatabase(app);

export const useStream = (uuid: string): IUseStream => {
  const [data, setData] = useState<IStreamBody>({
    editor: "",
    canvas: "",
  });

  const updateStreamState = (body: IStreamBody): void => {
    if (!uuid) return;
    const db = getDatabase(app);
    set(ref(db, `streams/${uuid}`), body);
  };

  useEffect(() => {
    if (!uuid) return;

    const starCountRef = ref(db, "streams/" + uuid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      setData(data);
    });
  }, [uuid]);

  return {
    data,
    onChangeEditor: (body) => {
      updateStreamState({ ...data, editor: JSON.stringify(body) || "" });
    },
    onChangeCanvas: (body) => {
      updateStreamState({ ...data, canvas: JSON.stringify(body) || "" });
    },
    remove: () => {
      remove(ref(db, `streams/${uuid}`));
    },
  };
};
