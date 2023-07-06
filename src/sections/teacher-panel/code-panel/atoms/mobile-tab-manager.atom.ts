import { atomWithStorage } from "jotai/utils";

interface IMobileTabManager {
  activeTab: number;
}

export const mobileTabManager = atomWithStorage<IMobileTabManager>(
  "MOBILE_TAB_MANAGER",
  {
    activeTab: 0,
  }
);
