import { CAMERA_PATH } from "../camera/cameraPath";
import { useExperience } from "../../store/useExperience";

export function activateScreen(screenKey, camera) {
  const { enterSection } = useExperience.getState();
  const preset = CAMERA_PATH[screenKey];

  if (!preset) return;

  enterSection(screenKey);
  camera.userData.target = preset.in;
}

export function setScreenState(screen, isActive) {
  // Set visual state of the screen based on whether it's active
  if (screen && screen.material) {
    if (isActive) {
      // Active screen: bright blue glow
      screen.material.emissive.setHex(0x0088ff);
      screen.material.emissiveIntensity = 0.8;
    } else if (screen.userData.isPoweredOn) {
      // Powered on but not active: dim white glow
      screen.material.emissive.setHex(0x444444);
      screen.material.emissiveIntensity = 0.3;
    } else {
      // Not powered on: no glow
      screen.material.emissive.setHex(0x000000);
      screen.material.emissiveIntensity = 0;
    }
  }
}
