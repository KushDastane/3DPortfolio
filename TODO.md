# TODO: Implement Prev Button Disable/Enable Logic

## Completed Tasks

- [x] Add `canGoPrev` state to useExperience store
- [x] Add `setCanGoPrev` function to store
- [x] Modify `goTo` function in ThreeExperience.jsx to update `canGoPrev` based on index > 0
- [x] Update App.jsx to destructure `canGoPrev` from store
- [x] Modify prev button to be disabled when `!canGoPrev` and apply disabled styling (opacity-50, cursor-not-allowed, remove hover effect)

## Summary

The prev button is now initially disabled (at index 0) and becomes enabled once the user navigates to the next section. The disabled state is visually indicated through reduced opacity and a not-allowed cursor.
