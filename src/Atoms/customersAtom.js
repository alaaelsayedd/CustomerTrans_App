import { atom } from "recoil";

export const customerAtom = atom({
    key: 'customeratom', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });