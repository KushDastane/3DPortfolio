import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { useExperience } from "../../store/useExperience";
import { createScene } from "../scene/createScene";
import { createCamera } from "../scene/createCamera";
import { createRenderer } from "../scene/createRenderer";
import { createLights } from "../scene/createLights";
import { loadRoom } from "../models/loadRoom";

/* ================= CONFIG ================= */

const desiredOrder = [
  "about",
  "skills",
  "projects",
  "experience",
  "testimonials",
  "contact",
];

/* ================= CAMERA PATH ================= */

function buildCameraPoints(screens) {
  const DIST = 3;
  const points = [];

  // Overview
  points.push({
    position: new THREE.Vector3(0, 2.2, 8),
    lookAt: new THREE.Vector3(0, 1.4, 0),
  });

  screens.forEach((screen) => {
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();

    screen.getWorldPosition(pos);
    screen.getWorldQuaternion(quat);

    const forward = new THREE.Vector3(0, 0, 1)
      .applyQuaternion(quat)
      .normalize();

    points.push({
      position: pos.clone().add(forward.multiplyScalar(DIST)),
      lookAt: pos.clone(),
    });
  });

  return points;
}

/* ================= MAIN ================= */

export default function ThreeExperience() {
  const containerRef = useRef(null);

  const cameraPointsRef = useRef([]);
  const screensRef = useRef([]);

  const currentIndexRef = useRef(0);
  const targetIndexRef = useRef(0);

  const [ready, setReady] = useState(false);

  const showSection = useExperience((s) => s.showSection);
  const hideSection = useExperience((s) => s.hideSection);
  const setNavReady = useExperience((s) => s.setNavReady);

  /* ================= GLOBAL LOCK ================= */

  useEffect(() => {
    if (ready) {
      document.body.classList.add("three-active");
    }

    return () => {
      document.body.classList.remove("three-active");
    };
  }, [ready]);

  /* ================= NAV ================= */

  function goTo(index) {
    hideSection();
    targetIndexRef.current = index;
  }

  function goNext() {
    goTo((targetIndexRef.current + 1) % cameraPointsRef.current.length);
  }

  function goPrev() {
    goTo(
      (targetIndexRef.current - 1 + cameraPointsRef.current.length) %
        cameraPointsRef.current.length
    );
  }

  /* ================= KEYBOARD ================= */

  useEffect(() => {
    if (!ready) return;

    function onKey(e) {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready]);

  /* ================= THREE ================= */

  useEffect(() => {
    const container = containerRef.current;

    const scene = createScene();
    const camera = createCamera(container.clientWidth, container.clientHeight);
    const renderer = createRenderer(container);

    createLights(scene);

    loadRoom(scene).then(({ screens }) => {
      const usable = screens
        .filter((s) => desiredOrder.includes(s.userData.section))
        .sort(
          (a, b) =>
            desiredOrder.indexOf(a.userData.section) -
            desiredOrder.indexOf(b.userData.section)
        );

      screensRef.current = usable;
      cameraPointsRef.current = buildCameraPoints(usable);
      setReady(true);
      setNavReady(true, goNext, goPrev);
    });

    function animate() {
      requestAnimationFrame(animate);

      if (!ready) {
        renderer.render(scene, camera);
        return;
      }

      const target = cameraPointsRef.current[targetIndexRef.current];
      if (!target) return;

      camera.position.lerp(target.position, 0.08);
      camera.lookAt(target.lookAt);

      if (camera.position.distanceTo(target.position) < 0.02) {
        if (currentIndexRef.current !== targetIndexRef.current) {
          currentIndexRef.current = targetIndexRef.current;

          const screen = screensRef.current[currentIndexRef.current - 1];

          if (screen) {
            showSection(screen.userData.section);
          }
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => container.removeChild(renderer.domElement);
  }, [ready, showSection]);

  /* ================= UI ================= */

  return (
    <>
      {/* THREE */}
      <div className="fixed inset-0 z-0">
        <div ref={containerRef} className="w-full h-screen" />
      </div>
    </>
  );
}
