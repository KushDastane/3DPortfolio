import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { useExperience } from "../../store/useExperience";

import { createScene } from "../scene/createScene";
import { createCamera } from "../scene/createCamera";
import { createRenderer } from "../scene/createRenderer";
import { createLights } from "../scene/createLights";
import { loadRoom } from "../models/loadRoom";

/* ================= CAMERA PATH ================= */

const desiredOrder = [
  "about",
  "skills",
  "projects",
  "experience",
  "testimonials",
  "contact",
];

function buildCameraPoints(screens) {
  const sorted = [...screens].sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.userData.section);
    const indexB = desiredOrder.indexOf(b.userData.section);
    return indexA - indexB;
  });

  const points = [];
  const DISTANCE = 3;

  // OVERVIEW CAMERA
  points.push({
    position: new THREE.Vector3(0, 2.2, 8),
    lookAt: new THREE.Vector3(0, 1.4, 0),
  });

  // SCREEN CAMERAS
  sorted.forEach((screen) => {
    // Screen world position
    const pos = new THREE.Vector3();
    screen.getWorldPosition(pos);

    // Screen world rotation
    const quat = new THREE.Quaternion();
    screen.getWorldQuaternion(quat);

    // Screen forward direction (normal)
    const forward = new THREE.Vector3(0, 0, 1)
      .applyQuaternion(quat)
      .normalize();

    // Camera position directly in front of screen
    const camPos = pos.clone().add(forward.clone().multiplyScalar(DISTANCE));

    points.push({
      position: camPos,
      lookAt: pos.clone(),
    });
  });

  // EXIT CAMERA
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
  return (
    targetPoint && camera.position.distanceTo(targetPoint.position) < 0.001
  );
}

function isAlmostArrived(camera, targetPoint) {
  return targetPoint && camera.position.distanceTo(targetPoint.position) < 1.0;
}

/* ================= SCREEN POWER ================= */

function powerOn(screen) {
  if (!screen) return;
  screen.material.emissive.setHex(0x00ff88);
  screen.material.emissiveIntensity = 0.9;
  screen.userData.isPoweredOn = true;
}

function powerOff(screen) {
  if (!screen) return;
  screen.material.emissive.setHex(0x000000);
  screen.material.emissiveIntensity = 0;
  screen.userData.isPoweredOn = false;
}

/* ================= MAIN ================= */

export default function ThreeExperience() {
  const containerRef = useRef(null);

  const screensRef = useRef([]);
  const activeScreenRef = useRef(null);

  const cameraPointsRef = useRef([]);
  const indexToSectionRef = useRef({});

  const targetIndexRef = useRef(0);
  const progressRef = useRef(0);
  const arrivedIndexRef = useRef(0);
  const resyncTriggeredRef = useRef(false);

  const showSection = useExperience((s) => s.showSection);
  const hideSection = useExperience((s) => s.hideSection);
  const startResync = useExperience((s) => s.startResync);
  const endResync = useExperience((s) => s.endResync);

  const [ready, setReady] = useState(false);

  /* ---------- INPUT ---------- */
  function moveTo(index) {
    hideSection();

    if (activeScreenRef.current) {
      powerOff(activeScreenRef.current);
      activeScreenRef.current = null;
    }

    resyncTriggeredRef.current = false;
    targetIndexRef.current = index;
  }

  useEffect(() => {
    function onKey(e) {
      if (!ready) return;

      if (e.key === "ArrowRight") {
        moveTo(
          Math.min(
            cameraPointsRef.current.length - 1,
            targetIndexRef.current + 1
          )
        );
      }

      if (e.key === "ArrowLeft") {
        moveTo(Math.max(0, targetIndexRef.current - 1));
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
    const renderer = createRenderer(container);

    createLights(scene);

    loadRoom(scene).then(({ screens }) => {
      const filteredScreens = screens.filter((screen) =>
        desiredOrder.includes(screen.userData.section)
      );

      const sortedScreens = [...filteredScreens].sort((a, b) => {
        const indexA = desiredOrder.indexOf(a.userData.section);
        const indexB = desiredOrder.indexOf(b.userData.section);
        return indexA - indexB;
      });

      screensRef.current = sortedScreens;
      cameraPointsRef.current = buildCameraPoints(sortedScreens);

      const map = {};
      sortedScreens.forEach((screen, i) => {
        map[i + 1] = screen.userData.section;
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

      if (arrivedIndexRef.current !== targetIndexRef.current) {
        const targetPoint = points[targetIndexRef.current];

        if (
          Math.abs(targetIndexRef.current - progressRef.current) < 0.5 &&
          !resyncTriggeredRef.current &&
          arrivedIndexRef.current !== 0
        ) {
          console.log("Starting resync");
          startResync();
          resyncTriggeredRef.current = true;
        }

        if (hasArrived(camera, targetPoint)) {
          arrivedIndexRef.current = targetIndexRef.current;

          const screenMesh = screensRef.current[targetIndexRef.current - 1];

          if (screenMesh) {
            powerOn(screenMesh);
            activeScreenRef.current = screenMesh;
          }

          endResync();
          const section = indexToSectionRef.current[targetIndexRef.current];
          if (section) showSection(section);
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, [ready, showSection]);

  /* ---------- UI ---------- */
  return (
    <>
      <div ref={containerRef} className="w-full h-screen overflow-hidden" />

      {ready && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-6 z-[100]">
          <button
            onClick={() => moveTo(Math.max(0, targetIndexRef.current - 1))}
            className="px-4 py-2 bg-black/70 text-white rounded"
          >
            ◀ Prev
          </button>

          <button
            onClick={() =>
              moveTo(
                Math.min(
                  cameraPointsRef.current.length - 1,
                  targetIndexRef.current + 1
                )
              )
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
