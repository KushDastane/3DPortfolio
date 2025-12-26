import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

export function addCurvedTitle(scene) {
  const loader = new FontLoader();

  loader.load("/fonts/Inter_Bold.json", (font) => {
    /* ================= GROUP ================= */

    const group = new THREE.Group();

    /* ================= GEOMETRY SETTINGS ================= */

    const baseConfig = {
      font,
      size: 0.65,
      height: 0.06,
      curveSegments: 24,
      bevelEnabled: false,
    };

    /* ================= TEXT: KUSH ================= */

    const kushGeo = new TextGeometry("KUSH", baseConfig);
    kushGeo.center();

    /* ================= TEXT: DASTANE ================= */

    const dastaneGeo = new TextGeometry("DASTANE", baseConfig);
    dastaneGeo.center();

    /* ================= CURVE FUNCTION ================= */

    function curveGeometry(geo, strength = 1) {
      const radius = 9;
      const pos = geo.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = Math.sin(x / radius) * strength;
        pos.setZ(i, z);
      }

      pos.needsUpdate = true;
      geo.computeVertexNormals();
    }

    curveGeometry(kushGeo, 0.9);
    curveGeometry(dastaneGeo, 0.9);

    /* ================= MATERIAL ================= */

   const material = new THREE.MeshStandardMaterial({
     color: 0xe3e7ea, // light grey, clearly darker than bg
     transparent: true,
     opacity: 0.45, // stronger presence without blocking light

     roughness: 0.85, // smooth but not shiny
     metalness: 0.0, // stays neutral on light BG

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

    /* ================= GROUP PLACEMENT ================= */

    group.position.set(0, 2.85, -2.3); // back wall
    group.rotation.x = -0.08; // slight wall tilt
    group.renderOrder = -1;
    group.frustumCulled = false;

    scene.add(group);
  });
}
