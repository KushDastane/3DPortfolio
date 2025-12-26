import * as THREE from "three";

export function createCamera(width, height) {
  const isDesktop = width >= 1024;

  const camera = new THREE.PerspectiveCamera(
    isDesktop ? 38 : 50, // FOV
    width / height,
    0.1,
    100
  );

  if (isDesktop) {
    // PC → closer, cinematic
    camera.position.set(0, 1.55, 4.6);
  } else {
    // Mobile → more breathing room
    camera.position.set(0, 1.6, 6.8);
  }

  camera.lookAt(0, 1.4, 0);

  return camera;
}
