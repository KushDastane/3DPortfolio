# TODO: Implement Prev Button Disable/Enable Logic and Prevent Rapid Clicking

## Completed Tasks

- [x] Add `canGoPrev` state to useExperience store
- [x] Add `setCanGoPrev` function to store
- [x] Modify `goTo` function in ThreeExperience.jsx to update `canGoPrev` based on index > 0
- [x] Update App.jsx to destructure `canGoPrev` from store
- [x] Modify prev button to be disabled when `!canGoPrev` and apply disabled styling (opacity-50, cursor-not-allowed, remove hover effect)
- [x] Add `isTransitioning` state to prevent rapid clicking during camera transitions
- [x] Disable buttons during transitions to prevent UI overlay issues
- [x] Set `isTransitioning` to true when starting navigation, false when transition completes
- [x] Disable left arrow key initially and enable it when user navigates to next section

## Summary

The prev button and left arrow key are now initially disabled (at index 0) and become enabled once the user navigates to the next section. Both prev and next buttons are disabled during camera transitions to prevent rapid clicking issues and ensure proper UI overlay behavior. The disabled state is visually indicated through reduced opacity and a not-allowed cursor.
