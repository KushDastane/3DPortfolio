import { create } from "zustand";

export const useExperience = create((set) => ({
  activeSection: null,
  previousSection: null,
  transitioning: false,

  startTransition: (next) =>
    set((state) => ({
      previousSection: state.activeSection,
      activeSection: next,
      transitioning: true,
    })),

  endTransition: () =>
    set({
      previousSection: null,
      transitioning: false,
    }),

  exitScreen: () =>
    set((state) => ({
      previousSection: state.activeSection,
      activeSection: null,
      transitioning: true,
    })),
}));
