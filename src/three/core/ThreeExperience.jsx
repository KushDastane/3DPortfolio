import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { addCurvedTitle } from "../objects/CurvedTitle";
import { useExperience } from "../../store/useExperience";
import { createScene } from "../scene/createScene";
import { createCamera } from "../scene/createCamera";
import { createRenderer } from "../scene/createRenderer";
import { createLights } from "../scene/createLights";
import { loadRoom } from "../models/loadRoom";
import { createParticles } from "../objects/Particles";
import { audioManager } from "../../utils/AudioManager";

// Postprocessing
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

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
  const sceneRef = useRef(null);
  const composerRef = useRef(null);
  const particlesRef = useRef(null);

  const cameraPointsRef = useRef([]);
  const screensRef = useRef([]);

  const currentIndexRef = useRef(0);
  const targetIndexRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  const showSection = useExperience((s) => s.showSection);
  const hideSection = useExperience((s) => s.hideSection);
  const setNavReady = useExperience((s) => s.setNavReady);
  const setCanGoPrev = useExperience((s) => s.setCanGoPrev);
  const setIsTransitioning = useExperience((s) => s.setIsTransitioning);
  const isTransitioning = useExperience((s) => s.isTransitioning);
  const canGoPrev = useExperience((s) => s.canGoPrev);
  const setFullyLoaded = useExperience((s) => s.setFullyLoaded);
  const fullyLoaded = useExperience((s) => s.fullyLoaded);

  /* ================= GLOBAL LOCK ================= */

  useEffect(() => {
    if (ready) document.body.classList.add("three-active");
    return () => document.body.classList.remove("three-active");
  }, [ready]);

  /* ================= BACKGROUND IMAGE LOADING ================= */

  useEffect(() => {
    const img = new Image();
    img.src = "/images/bg1.webp";
    img.onload = () => setBgLoaded(true);
  }, []);

  /* ================= FULLY LOADED ================= */

  useEffect(() => {
    if (ready && bgLoaded) {
      setFullyLoaded(true);
    }
  }, [ready, bgLoaded, setFullyLoaded]);

  /* ================= ADD CURVED TITLE ================= */

  useEffect(() => {
    if (fullyLoaded && sceneRef.current && window.innerWidth < 768) {
      addCurvedTitle(sceneRef.current);
    }
  }, [fullyLoaded]);

  /* ================= NAV ================= */

  function goTo(index) {
    if (isTransitioning) return;
    hideSection();
    targetIndexRef.current = index;
    setCanGoPrev(index > 0);
    setIsTransitioning(true);
    audioManager.playWhoosh();
  }

  function goNext() {
    if (!isTransitioning)
      goTo((targetIndexRef.current + 1) % cameraPointsRef.current.length);
  }

  function goPrev() {
    if (!isTransitioning)
      goTo(
        (targetIndexRef.current - 1 + cameraPointsRef.current.length) %
        cameraPointsRef.current.length
      );
  }

  /* ================= KEYBOARD ================= */

  useEffect(() => {
    if (!ready) return;

    function onKey(e) {
      if (isTransitioning) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft" && canGoPrev) goPrev();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready, isTransitioning, canGoPrev]);

  /* ================= THREE ================= */

  useEffect(() => {
    const container = containerRef.current;

    const scene = createScene();
    sceneRef.current = scene;
    const camera = createCamera(container.clientWidth, container.clientHeight);
    const renderer = createRenderer(container);

    // Particles
    const particles = createParticles();
    particlesRef.current = particles;
    scene.add(particles.points);

    // Composer & Bloom
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.5, // strength
      0.4, // radius
      0.85 // threshold
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;

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

    function animate(time) {
      requestAnimationFrame(animate);

      if (particlesRef.current) {
        particlesRef.current.animate(time);
      }

      if (!ready) {
        composer.render();
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
          if (screen) showSection(screen.userData.section);

          setIsTransitioning(false);
        }
      }

      composer.render();
    }

    animate(0);

    return () => {
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [ready, showSection]);

  /* ================= UI ================= */

  return (
    <>

      {/* THREE */}
      <div className="fixed inset-0 z-10">
        <div ref={containerRef} className="w-full h-screen bg-black" />
      </div>
    </>
  );
}
