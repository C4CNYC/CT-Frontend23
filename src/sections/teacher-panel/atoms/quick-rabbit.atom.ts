import { atomWithStorage } from "jotai/utils";

export type SupportedLang = "html" | "javascript";

export interface IQuickRabbit {
  id: string;
  email: string;
}

export const quickRabbitAtom = atomWithStorage<Record<string, IQuickRabbit>>(
  "RABBIT_ATOM",
  {}
);
