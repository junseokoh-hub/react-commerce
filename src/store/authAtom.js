import { atom } from "recoil";

export const authUserAtom = atom({
  key: "authUserAtom",
  default: { user: null, isAuthReady: false },
  dangerouslyAllowMutability: true,
});
