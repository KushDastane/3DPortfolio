import * as THREE from "three";
import { CAMERA_PATH } from "./cameraPath";

const START_POS = new THREE.Vector3(0, 1.6, 6);
const LOOK_AT = new THREE.Vector3(0, 1.4, 0);

export function interpolateCamera(camera, path, progress) {
  if (!camera || !path || path.length === 0) return;

  // Clamp progress
  const p = Math.min(Math.max(progress, 0), 1);

  const total = path.length;
  const scaled = p * total;

  const index = Math.floor(scaled);
  const t = scaled - index;

  const fromKey = path[Math.max(index - 1, 0)]?.section;
  const toKey = path[Math.min(index, total - 1)]?.section;

  const from =
    fromKey && CAMERA_PATH[fromKey] ? CAMERA_PATH[fromKey].out : START_POS;

  const to = toKey && CAMERA_PATH[toKey] ? CAMERA_PATH[toKey].out : START_POS;

  const target = new THREE.Vector3().lerpVectors(from, to, t);

  camera.position.lerp(target, 0.1);
  camera.lookAt(LOOK_AT);
}
