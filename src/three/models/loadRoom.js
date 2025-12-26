import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useExperience } from "../../store/useExperience";

export function loadRoom(scene) {
  return new Promise((resolve, reject) => {
    const MIN_VISIBLE = 300;
    const loader = new GLTFLoader();

    const experience = useExperience.getState();

    let progressValue = 0;
    let startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;

      if (elapsed < 300) {
        progressValue += 15;
      } else if (elapsed < 800) {
        progressValue += 6;
      } else {
        progressValue += 2;
      }

      progressValue = Math.min(progressValue, 90);
      useExperience.getState().setLoadingProgress(Math.floor(progressValue));
    }, 80);

    loader.load(
      "/models/room/room2.glb",

      (gltf) => {
        clearInterval(interval);

        const elapsed = performance.now() - startTime;
        const remaining = Math.max(MIN_VISIBLE - elapsed, 0);

        setTimeout(() => {
          experience.setLoadingProgress(100);

          const room = gltf.scene;
          const screens = [];

          room.traverse((node) => {
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
              }
            }

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

          if (window.innerWidth < 768) {
            room.scale.setScalar(0.35);
          } else {
            room.scale.setScalar(0.9);
          }

          scene.add(room);
          resolve({ room, screens });
        }, remaining);
      },

      () => {},

      (err) => {
        clearInterval(interval);
        useExperience.getState().setLoadingProgress(100);
        reject(err);
      }
    );
  });
}
