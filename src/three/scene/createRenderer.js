import * as THREE from "three";

export function createRenderer(container) {
  console.log("Creating renderer for container:", container);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  console.log(
    "Renderer size set to:",
    container.clientWidth,
    container.clientHeight
  );

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  console.log("Appending renderer domElement to container");
  container.appendChild(renderer.domElement);
  console.log(
    "Renderer domElement appended, children count:",
    container.children.length
  );
  return renderer;
}
