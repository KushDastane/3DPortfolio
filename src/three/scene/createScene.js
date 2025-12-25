import * as THREE from "three";

export function createScene() {
  const scene = new THREE.Scene();

  // No forced darkness
  scene.background = null; // 🔥 IMPORTANT

  // Very soft fog just for depth (not darkness)
  scene.fog = new THREE.Fog(0x111111, 18, 40);

  return scene;
}
