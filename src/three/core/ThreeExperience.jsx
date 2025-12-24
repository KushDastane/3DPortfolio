import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { createScene } from "../scene/createScene";
import { createCamera } from "../scene/createCamera";
import { createRenderer } from "../scene/createRenderer";
import { createLights } from "../scene/createLights";
import { loadRoom } from "../models/loadRoom";

/* ================= CAMERA PATH ================= */

function buildCameraPoints(screens) {
  const sorted = [...screens].sort((a, b) => a.position.x - b.position.x);

  const points = [];
  const CAMERA_Z = 4.8;
  const CAMERA_Y = 1.4;

  // 🌍 START – overview
  points.push({
    position: new THREE.Vector3(0, 2.2, 8),
    lookAt: new THREE.Vector3(0, 1.4, 0),
    label: "overview",
  });

  // 🖥 Screens – left → right
  sorted.forEach((screen, i) => {
    const pos = new THREE.Vector3();
    screen.getWorldPosition(pos);

    points.push({
      position: new THREE.Vector3(pos.x, CAMERA_Y, CAMERA_Z),
      lookAt: pos.clone(),
      label: `screen-${i}`,
    });
  });

  // 🌍 END – outro
  points.push({
    position: new THREE.Vector3(0, 2.2, 8),
    lookAt: new THREE.Vector3(0, 1.4, 0),
    label: "outro",
  });

  return points;
}

function interpolateCamera(camera, from, to, t) {
  const pos = new THREE.Vector3().lerpVectors(from.position, to.position, t);
  const look = new THREE.Vector3().lerpVectors(from.lookAt, to.lookAt, t);

  camera.position.lerp(pos, 0.12);
  camera.lookAt(look);
}

/* ================= MAIN ================= */

export default function ThreeExperience() {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);

  const cameraPointsRef = useRef([]);
  const targetIndexRef = useRef(0);
  const currentIndexRef = useRef(0);
  const progressRef = useRef(0);

  const [ready, setReady] = useState(false);

  /* ---------- KEYBOARD CONTROLS ---------- */
  useEffect(() => {
    function onKey(e) {
      if (!ready) return;

      if (e.key === "ArrowRight") {
        targetIndexRef.current = Math.min(
          cameraPointsRef.current.length - 1,
          targetIndexRef.current + 1
        );
      }

      if (e.key === "ArrowLeft") {
        targetIndexRef.current = Math.max(0, targetIndexRef.current - 1);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready]);

  /* ---------- THREE ---------- */
  useEffect(() => {
    const container = containerRef.current;

    const scene = createScene();
    const camera = createCamera(container.clientWidth, container.clientHeight);
    cameraRef.current = camera;

    const renderer = createRenderer(container);
    createLights(scene);

    loadRoom(scene).then(({ screens }) => {
      cameraPointsRef.current = buildCameraPoints(screens);
      setReady(true);
    });

    function animate() {
      requestAnimationFrame(animate);

      if (!ready) {
        renderer.render(scene, camera);
        return;
      }

      // Smooth index transition
      progressRef.current +=
        (targetIndexRef.current - progressRef.current) * 0.08;

      const i = Math.floor(progressRef.current);
      const t = progressRef.current - i;

      const points = cameraPointsRef.current;
      const from = points[i];
      const to = points[Math.min(i + 1, points.length - 1)];

      interpolateCamera(camera, from, to, t);
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, [ready]);

  return (
    <>
      <div ref={containerRef} className="w-full h-screen overflow-hidden" />

      {/* UI CONTROLS */}
      {ready && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-50">
          <button
            onClick={() =>
              (targetIndexRef.current = Math.max(0, targetIndexRef.current - 1))
            }
          >
            ◀ Prev
          </button>

          <button
            onClick={() =>
              (targetIndexRef.current = Math.min(
                cameraPointsRef.current.length - 1,
                targetIndexRef.current + 1
              ))
            }
          >
            Next ▶
          </button>
        </div>
      )}
    </>
  );
}
