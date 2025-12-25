import { create } from "zustand";

export const useExperience = create((set) => ({
  activeSection: null,
  previousSection: null,
  isResyncing: false,
  navReady: false,
  goNext: null,
  goPrev: null,

  showSection: (section) =>
    set((state) => ({
      previousSection: state.activeSection,
      activeSection: section,
    })),
  hideSection: () => set({ activeSection: null }),
  startResync: () => set({ isResyncing: true }),
  endResync: () => set({ isResyncing: false }),
  setNavReady: (ready, nextFn, prevFn) =>
    set({ navReady: ready, goNext: nextFn, goPrev: prevFn }),
}));
