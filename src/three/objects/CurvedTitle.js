import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

/**
 * Adds a curved, stable, non-flickering 3D title
 * Mobile + desktop safe
 */
export function addCurvedTitle(scene) {
  const loader = new FontLoader();

  loader.load("/fonts/BBH.json", (font) => {
    const group = new THREE.Group();

    /* ================= TEXT CONFIG ================= */

    const config = {
      font,
      size: 0.5,
      height: 0.12,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.015,
      bevelSegments: 5,
    };

    /* ================= STABLE CURVE ================= */

    function curveText(geo, radius = 14, strength = 0.45) {
      const pos = geo.attributes.position;
      geo.computeBoundingBox();

      const centerX = (geo.boundingBox.max.x + geo.boundingBox.min.x) / 2;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i) - centerX;
        pos.setZ(i, Math.sin(x / radius) * strength);
      }

      pos.needsUpdate = true;
      geo.computeVertexNormals();
    }

    /* ================= GEOMETRIES ================= */

    const kushGeo = new TextGeometry("KUSH", config);
    kushGeo.center();
    curveText(kushGeo);

    const dastaneGeo = new TextGeometry("DASTANE", config);
    dastaneGeo.center();
    curveText(dastaneGeo);

    /* ================= MATERIALS ================= */

    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0x2dd4bf, // Teal color
      roughness: 0.3,
      metalness: 0.6,
      emissive: 0x14b8a6, // Teal emissive glow
      emissiveIntensity: 0.4,
      dithering: true,
    });

    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.BackSide,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    /* ================= MESH BUILDER ================= */

    function addText(geo, y) {
      const main = new THREE.Mesh(geo, textMaterial);
      const outline = new THREE.Mesh(geo.clone(), outlineMaterial);

      // minimal scale to avoid depth precision loss
      outline.scale.setScalar(1.02);

      main.position.y = y;
      outline.position.y = y;

      // deterministic draw order
      outline.renderOrder = 1;
      main.renderOrder = 2;

      group.add(outline, main);
    }

    addText(kushGeo, 0.95);
    addText(dastaneGeo, -0.01);

    /* ================= PLACEMENT ================= */

    group.position.set(0, 2.4, -1.4);
    group.rotation.x = -0.06;
    group.scale.setScalar(0.85); // Further reduced to prevent clipping
    group.frustumCulled = false;

    // Mobile correction
    if (window.innerWidth < 768) {
      group.scale.setScalar(0.65); // Adjusted for mobile
      group.position.y -= 0.1;
    }

    scene.add(group);
  });
}
