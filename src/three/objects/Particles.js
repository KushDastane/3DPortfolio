import * as THREE from "three";

export function createParticles() {
  const count = 1500;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // Random positions in a room-like box
    positions[i * 3 + 0] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = Math.random() * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

    sizes[i] = Math.random() * 0.05 + 0.01;

    // Subtle blue/teal/white colors
    const r = 0.1 + Math.random() * 0.1;
    const g = 0.6 + Math.random() * 0.4;
    const b = 0.7 + Math.random() * 0.3;

    colors[i * 3 + 0] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);

  // Animation function
  const animate = (time) => {
    const positions = geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      // Gentle drift
      positions[i * 3 + 1] += Math.sin(time * 0.001 + i) * 0.002;
      positions[i * 3 + 0] += Math.cos(time * 0.0005 + i) * 0.001;
    }
    geometry.attributes.position.needsUpdate = true;
  };

  return { points, animate };
}
