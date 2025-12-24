import * as THREE from "three";

export function createCamera(width, height) {
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);

  camera.position.set(0, 1.6, 6);
  return camera;
}
