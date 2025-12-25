import * as THREE from "three";

export function createRenderer(container) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
    alpha: true, // 🔥 ALLOW TRANSPARENCY
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Clean, bright filmic look
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;

  renderer.setClearColor(0x000000, 0); // 🔥 TRANSPARENT CLEAR

  container.appendChild(renderer.domElement);
  renderer.domElement.style.zIndex = "1";

  return renderer;
}
