import * as THREE from "three";

const START_POS = new THREE.Vector3(0, 1.6, 6);
const LOOK_AT = new THREE.Vector3(0, 1.4, 0);

export function interpolateCameraFromPoints(camera, points, progress) {
  if (!camera || !points || points.length < 2) return;

  const p = Math.min(Math.max(progress, 0), 1);
  const total = points.length - 1;

  const scaled = p * total;
  const index = Math.floor(scaled);
  const t = scaled - index;

  const from = points[index];
  const to = points[index + 1];

  const pos = new THREE.Vector3().lerpVectors(from.position, to.position, t);

  const look = new THREE.Vector3().lerpVectors(from.lookAt, to.lookAt, t);

  camera.position.lerp(pos, 0.12);
  camera.lookAt(look);
}
