import { atomWithStorage } from "jotai/utils";

import { User } from "../users-item";

export type SupportedLang = "html" | "javascript";

export interface IChatContent {
  user: User | null;
}

export const chatAtom = atomWithStorage<IChatContent>("CHAT_ATOM", {
  user: null,
});
