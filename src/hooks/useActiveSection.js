import { cameraPath } from "../three/camera/cameraPath";

export function getActiveSection(progress) {
  const index = Math.round(progress * (cameraPath.length - 1));
  return cameraPath[index]?.section;
}
