import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useOpenWorkspaceModal = () => {
  return useAtom(modalState);
};
