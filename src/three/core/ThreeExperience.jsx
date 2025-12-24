import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { useExperience } from "../../store/useExperience";

import { createScene } from "../scene/createScene";
import { createCamera } from "../scene/createCamera";
import { createRenderer } from "../scene/createRenderer";
import { createLights } from "../scene/createLights";
import { loadRoom } from "../models/loadRoom";

/* ================= CAMERA PATH ================= */

function buildCameraPoints(screens) {
  const sorted = [...screens].sort((a, b) => {
    const pa = new THREE.Vector3();
    const pb = new THREE.Vector3();
    a.getWorldPosition(pa);
    b.getWorldPosition(pb);
    return pa.x - pb.x;
  });

  const points = [];
  const DISTANCE = 1.6;

  points.push({
    position: new THREE.Vector3(0, 2.2, 8),
    lookAt: new THREE.Vector3(0, 1.4, 0),
  });

  sorted.forEach((screen) => {
    const pos = new THREE.Vector3();
    screen.getWorldPosition(pos);

    const forward = new THREE.Vector3(0, 0, 1)
      .applyQuaternion(screen.getWorldQuaternion(new THREE.Quaternion()))
      .normalize();

    points.push({
      position: pos.clone().add(forward.multiplyScalar(DISTANCE)),
      lookAt: pos.clone(),
    });
  });

  points.push({
    position: new THREE.Vector3(0, 2.2, 8),
    lookAt: new THREE.Vector3(0, 1.4, 0),
  });

  return points;
}

function interpolateCamera(camera, from, to, t) {
  camera.position.lerp(
    new THREE.Vector3().lerpVectors(from.position, to.position, t),
    0.12
  );
  camera.lookAt(new THREE.Vector3().lerpVectors(from.lookAt, to.lookAt, t));
}

function hasArrived(camera, targetPoint) {
  return targetPoint && camera.position.distanceTo(targetPoint.position) < 0.05;
}

/* ================= MAIN ================= */

export default function ThreeExperience() {
  const containerRef = useRef(null);
  const arrivedIndexRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  const cameraPointsRef = useRef([]);
  const indexToSectionRef = useRef({});

  const targetIndexRef = useRef(0);
  const progressRef = useRef(0);

  const startTransition = useExperience((s) => s.startTransition);
  const endTransition = useExperience((s) => s.endTransition);
  const exitScreen = useExperience((s) => s.exitScreen);

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

  /* ---------- THREE SETUP ---------- */
  useEffect(() => {
    const container = containerRef.current;

    const scene = createScene();
    const camera = createCamera(container.clientWidth, container.clientHeight);
    const renderer = createRenderer(container);

    createLights(scene);

    loadRoom(scene).then(({ screens }) => {
      cameraPointsRef.current = buildCameraPoints(screens);

      const map = {};
      screens.forEach((screen, i) => {
        if (screen.userData.section) {
          map[i + 1] = screen.userData.section;
        }
      });

      indexToSectionRef.current = map;
      setReady(true);
    });

    function animate() {
      requestAnimationFrame(animate);

      if (!ready) {
        renderer.render(scene, camera);
        return;
      }

      const diff = targetIndexRef.current - progressRef.current;
      progressRef.current += diff * (Math.abs(diff) > 1 ? 0.3 : 0.08);

      if (Math.abs(diff) < 0.001) {
        progressRef.current = targetIndexRef.current;
      }

      const i = Math.floor(progressRef.current);
      const t = progressRef.current - i;

      const points = cameraPointsRef.current;
      interpolateCamera(
        camera,
        points[i],
        points[Math.min(i + 1, points.length - 1)],
        t
      );

      if (
        arrivedIndexRef.current !== targetIndexRef.current &&
        hasArrived(camera, points[targetIndexRef.current])
      ) {
        arrivedIndexRef.current = targetIndexRef.current;

        const section = indexToSectionRef.current[targetIndexRef.current];
        section ? startTransition(section) : exitScreen();

        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = setTimeout(endTransition, 700);
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      clearTimeout(transitionTimeoutRef.current);
      container.removeChild(renderer.domElement);
    };
  }, [ready, startTransition, endTransition, exitScreen]);

  /* ---------- UI BUTTONS ---------- */
  return (
    <>
      <div ref={containerRef} className="w-full h-screen overflow-hidden" />

      {ready && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-6 z-[100] pointer-events-auto">
          <button
            onClick={() =>
              (targetIndexRef.current = Math.max(0, targetIndexRef.current - 1))
            }
            className="px-4 py-2 bg-black/70 text-white rounded"
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
            className="px-4 py-2 bg-black/70 text-white rounded"
          >
            Next ▶
          </button>
        </div>
      )}
    </>
  );
}
