import { useEffect, useRef } from "react";
import * as THREE from "three";

import { createScene } from "../scene/createScene";
import { createCamera } from "../scene/createCamera";
import { createRenderer } from "../scene/createRenderer";
import { createLights } from "../scene/createLights";
import { loadRoom } from "../models/loadRoom";

import { cameraPath } from "../camera/cameraPath";
import { interpolateCamera } from "../camera/cameraController";

import { getActiveSection } from "../../hooks/useActiveSection";
import { registerScreens } from "../screens/registerScreens";
import { screenMap } from "../screens/screenMap";
import { setScreenState, activateScreen } from "../screens/screenController";

export default function ThreeExperience() {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  const screensRef = useRef([]);
  const activeSectionRef = useRef(null);

  // SINGLE progress source
  const progressRef = useRef(0);
  const lastTouchY = useRef(null);

  /* ---------------- INPUT ---------------- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onWheel(e) {
      progressRef.current += e.deltaY * 0.0004;
      progressRef.current = Math.min(Math.max(progressRef.current, 0), 1);
    }

    function onTouchStart(e) {
      lastTouchY.current = e.touches[0].clientY;
    }

    function onTouchMove(e) {
      if (lastTouchY.current === null) return;

      const currentY = e.touches[0].clientY;
      const delta = lastTouchY.current - currentY;

      progressRef.current += delta * 0.002;
      progressRef.current = Math.min(Math.max(progressRef.current, 0), 1);

      lastTouchY.current = currentY;
    }

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  /* ---------------- THREE SETUP ---------------- */
  useEffect(() => {
    const container = containerRef.current;

    const scene = createScene();
    sceneRef.current = scene;

    const camera = createCamera(container.clientWidth, container.clientHeight);
    cameraRef.current = camera;

    const renderer = createRenderer(container);
    rendererRef.current = renderer;

    createLights(scene);

    loadRoom(scene).then((room) => {
      screensRef.current = registerScreens(room, screenMap);
    });

    function animate() {
      requestAnimationFrame(animate);

      interpolateCamera(cameraRef.current, cameraPath, progressRef.current);

      const activeSection = getActiveSection(progressRef.current);

      if (activeSectionRef.current !== activeSection) {
        activeSectionRef.current = activeSection;
        activateScreen(activeSection, cameraRef.current);
      }

      screensRef.current.forEach((screen) => {
        setScreenState(screen, screen.userData.section === activeSection);
      });

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-hidden touch-none"
    />
  );
}
