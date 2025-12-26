import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useExperience } from "../../store/useExperience";

export function loadRoom(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    const experience = useExperience.getState();

    /* ================= FAKE PROGRESS (SMOOTH) ================= */

    let progressValue = 0;
    let startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;

      // Fast internet → jump quickly
      if (elapsed < 300) {
        progressValue += 15;
      }
      // Medium phase
      else if (elapsed < 800) {
        progressValue += 6;
      }
      // Slow polish near end
      else {
        progressValue += 2;
      }

      progressValue = Math.min(progressValue, 90);
      useExperience.getState().setLoadingProgress(Math.floor(progressValue));
    }, 80);


    loader.load(
      "/models/room/room2.glb",

      /* ================= ON LOAD ================= */
      (gltf) => {
        clearInterval(interval);

        // Smooth finish
        experience.setLoadingProgress(100);

        const room = gltf.scene;
        const screens = [];

        room.traverse((node) => {
          /* ---------- SCREENS ---------- */
          if (node.name.startsWith("Screen_")) {
            let foundMesh = null;

            node.traverse((child) => {
              if (!foundMesh && child.isMesh) foundMesh = child;
            });

            if (foundMesh) {
              foundMesh.material = foundMesh.material.clone();
              foundMesh.material.emissive = new THREE.Color(0x000000);
              foundMesh.material.emissiveIntensity = 0;

              foundMesh.userData.isScreen = true;
              foundMesh.userData.isPoweredOn = false;

              const sectionMap = {
                Screen_About: "about",
                Screen_Skills: "skills",
                Screen_Projects: "projects",
                Screen_Experience: "experience",
                Screen_Achievements: "achievements",
                Screen_Testimonials: "testimonials",
                Screen_Contact: "contact",
              };

              foundMesh.userData.section = sectionMap[node.name];
              screens.push(foundMesh);

              console.log("✅ SCREEN REGISTERED:", foundMesh.userData.section);
            }
          }

          /* ---------- MATERIAL FIX ---------- */
          if (node.isMesh && node.material) {
            node.castShadow = true;
            node.receiveShadow = true;

            node.material.side = THREE.FrontSide;

            if (node.material.color) {
              node.material.color.convertSRGBToLinear();
            }

            node.material.roughness = 0.9;
            node.material.metalness = 0.05;
          }
        });

        room.position.set(0, -0.8, 0);

        // Mobile scale
        if (window.innerWidth < 768) {
          room.scale.setScalar(0.35);
        }

        scene.add(room);

        resolve({ room, screens });
      },

      /* ================= ON PROGRESS ================= */
      () => {
        // DO NOTHING HERE ❌
        // Mobile browsers often give total = 0
        // Let fake progress handle UI
      },

      /* ================= ON ERROR ================= */
      (err) => {
        clearInterval(interval);
        useExperience.getState().setLoadingProgress(100);
        reject(err);
      }
    );
  });
}
