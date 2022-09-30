import { atom } from "recoil";

export const screenAtom = atom({
  key: "screenAtom",
  default: window.innerWidth <= 480,
});
