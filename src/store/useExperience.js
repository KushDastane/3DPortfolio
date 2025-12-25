import { create } from "zustand";

export const useExperience = create((set) => ({
  activeSection: null,

  showSection: (section) => set({ activeSection: section }),
  hideSection: () => set({ activeSection: null }),
}));
