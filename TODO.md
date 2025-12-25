- [ ] Import all screen components in PortfolioUI.jsx (Experience, Achievements, Testimonials, Contact)
- [ ] Modify PortfolioUI.jsx to render all screens with individual opacity transitions based on activeSection
- [ ] Update useExperience.js exitScreen to reset activeSection to null
- [ ] Ensure buttons remain functional by verifying z-index and event handling
- [ ] Test transitions between screens to confirm fade out/in behavior

## Achievements Section Hidden

- [x] Remove "achievements" from cameraPath array in src/three/camera/cameraPath.js
- [x] Remove "Screen_Achievements" from screenMap in src/three/screens/screenMap.js
- [x] Remove Achievements import and from screens object in src/components/PortfolioUI.jsx

## Future Tasks

- [ ] Re-enable Achievements section when achievements are available
  - Add back to cameraPath
  - Add back to screenMap
  - Add back to PortfolioUI screens object
