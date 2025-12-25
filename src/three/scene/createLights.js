import * as THREE from "three";

export function createLights(scene) {
  // Soft neutral ambient (lifts everything)
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  // Main overhead light
  const key = new THREE.DirectionalLight(0xffffff, 0.6);
  key.position.set(6, 10, 6);
  scene.add(key);

  // Gentle fill from front
  const fill = new THREE.DirectionalLight(0xffffff, 0.35);
  fill.position.set(-6, 4, 4);
  scene.add(fill);

  // Very soft back separation
  const rim = new THREE.DirectionalLight(0xffffff, 0.2);
  rim.position.set(0, 3, -8);
  scene.add(rim);
}
