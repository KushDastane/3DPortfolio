import * as THREE from "three";

export function interpolateCameraFromPoints(camera, points, progress) {
  if (!camera || !points || points.length < 2) return;

  // 🔒 Clamp progress
  const p = THREE.MathUtils.clamp(progress, 0, 1);

  const totalSegments = points.length - 1;

  // 🔒 Prevent early skipping of index 0
  const scaled = p * totalSegments;
  const index = Math.min(Math.floor(scaled), totalSegments - 1);

  const t = scaled - index;

  const from = points[index];
  const to = points[index + 1];

  const pos = new THREE.Vector3().lerpVectors(from.position, to.position, t);

  const look = new THREE.Vector3().lerpVectors(from.lookAt, to.lookAt, t);

  // ✅ Smooth movement
  camera.position.lerp(pos, 0.12);

  // 🔒 CRITICAL: remove roll forever
  camera.up.set(0, 1, 0);
  camera.lookAt(look);
}
