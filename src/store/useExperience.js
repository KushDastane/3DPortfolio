import { create } from "zustand";

export const useExperience = create((set) => ({
  activeSection: null,
  previousSection: null,
  isResyncing: false,

  showSection: (section) =>
    set((state) => ({
      previousSection: state.activeSection,
      activeSection: section,
    })),
  hideSection: () => set({ activeSection: null }),
  startResync: () => set({ isResyncing: true }),
  endResync: () => set({ isResyncing: false }),
}));
