import * as THREE from "three";

export function registerScreens(room, screenMap) {
  const screens = [];

  room.traverse((child) => {
    if (child.isMesh && screenMap[child.name]) {
      // CLONE MATERIAL ONCE
      child.material = child.material.clone();

      child.userData = {
        section: screenMap[child.name],
        active: false,
        powerOnTime: Math.random() * 2000 + 1000, // Random power-on delay 1-3s
        isPoweredOn: false,
      };

      // Start completely off (black screen)
      child.material.emissive = new THREE.Color(0x000000);
      child.material.emissiveIntensity = 0;

      screens.push(child);
    }
  });

  return screens;
}
