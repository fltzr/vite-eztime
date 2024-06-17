import { ReactNode } from 'react';
import { create } from 'zustand';

type AppHeaderState = {
  middleContent?: ReactNode;
  rightContent?: ReactNode;
};

type AppHeaderActions = {
  setMiddleContent: (content: ReactNode) => void;
  setRightContent: (content: ReactNode) => void;
  clearHeader: () => void;
};

export const useAppHeaderStore = create<AppHeaderState & AppHeaderActions>(
  (set) => ({
    middleContent: undefined,
    rightContent: undefined,
    setMiddleContent: (content) => set({ middleContent: content }),
    setRightContent: (content) => set({ rightContent: content }),
    clearHeader: () =>
      set({ middleContent: undefined, rightContent: undefined }),
  })
);
