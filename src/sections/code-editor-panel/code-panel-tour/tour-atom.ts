import { atom } from "jotai";

export const startTour = atom<Record<string, boolean>>({ start: false });
