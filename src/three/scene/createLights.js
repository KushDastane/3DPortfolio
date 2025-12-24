import * as THREE from "three";

export function createLights(scene) {
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 0.6);
  directional.position.set(5, 10, 5);
  scene.add(directional);
}
