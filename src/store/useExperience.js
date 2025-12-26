import { create } from "zustand";

export const useExperience = create((set) => ({
  activeSection: null,
  previousSection: null,
  isResyncing: false,
  navReady: false,
  goNext: null,
  goPrev: null,
  canGoPrev: false,
  isTransitioning: false,
  fullyLoaded: false,
  loadingProgress: 0,

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
  setCanGoPrev: (can) => set({ canGoPrev: can }),
  setIsTransitioning: (transitioning) =>
    set({ isTransitioning: transitioning }),
  setFullyLoaded: (loaded) => set({ fullyLoaded: loaded }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
}));
