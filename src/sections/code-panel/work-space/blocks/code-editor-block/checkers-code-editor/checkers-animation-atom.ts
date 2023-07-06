import { atom } from "jotai";

interface IChechersAnimationAtom {
  visible: boolean;
  openText: boolean;
  activateCompeated: boolean;
}

export const checkersAnimationAtom = atom<IChechersAnimationAtom>({
  visible: false,
  openText: false,
  activateCompeated: false,
});
