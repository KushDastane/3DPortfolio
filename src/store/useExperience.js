import { create } from "zustand";

export const useExperience = create((set) => ({
  activeSection: null, // "about" | "skills" | ...
  mode: "room", // "room" | "entering" | "inside"

  enterSection: (section) => set({ activeSection: section, mode: "entering" }),

  setInside: () => set({ mode: "inside" }),

  exitSection: () => set({ activeSection: null, mode: "room" }),
}));
