import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

export function addCurvedTitle(scene) {
  const loader = new FontLoader();

  loader.load("/fonts/Inter_Bold.json", (font) => {
    /* ================= GROUP ================= */

    const group = new THREE.Group();

    /* ================= BASE CONFIG ================= */

    const baseConfig = {
      font,
      size: 0.65,
      height: 0.06,
      curveSegments: 24,
      bevelEnabled: false,
    };

    /* ================= CURVE FUNCTION ================= */

    function curveGeometry(geo, radius = 9, strength = 0.9) {
      const pos = geo.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = Math.sin(x / radius) * strength;
        pos.setZ(i, z);
      }

      pos.needsUpdate = true;
      geo.computeVertexNormals();
    }

    /* ================= KUSH ================= */

    const kushGeo = new TextGeometry("KUSH", baseConfig);
    kushGeo.center();
    curveGeometry(kushGeo, 9, 0.9);

    /* ================= DASTANE ================= */

    const dastaneGeo = new TextGeometry("DASTANE", baseConfig);
    dastaneGeo.center();
    curveGeometry(dastaneGeo, 9, 0.9);

    /* ================= MATERIAL ================= */

    const material = new THREE.MeshStandardMaterial({
      color: 0xe3e7ea,
      transparent: true,
      opacity: 0.45,
      roughness: 0.85,
      metalness: 0.0,
      emissive: new THREE.Color(0x000000),
      emissiveIntensity: 0,
      side: THREE.DoubleSide,
    });

    /* ================= MESHES ================= */

    const kushMesh = new THREE.Mesh(kushGeo, material);
    const dastaneMesh = new THREE.Mesh(dastaneGeo, material);

    kushMesh.position.set(0, 0.45, 0);
    dastaneMesh.position.set(0, -0.35, 0);

    group.add(kushMesh);
    group.add(dastaneMesh);

    /* ================= FINAL PLACEMENT ================= */

    group.position.set(0, 2.85, -2.3);
    group.rotation.x = -0.08;
    group.frustumCulled = false;

    scene.add(group);
  });
}
