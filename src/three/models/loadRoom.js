import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useExperience } from "../../store/useExperience";

export function loadRoom(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    let fakeProgress = 0;
    const interval = setInterval(() => {
      fakeProgress = Math.min(fakeProgress + 2, 90);
      useExperience.getState().setLoadingProgress(fakeProgress);
    }, 100);

    loader.load(
      "/models/room/room2.glb",
      (gltf) => {
        clearInterval(interval);
        // Set progress to 100% when loaded
        useExperience.getState().setLoadingProgress(100);
        const room = gltf.scene;
        const screens = [];

        room.traverse((node) => {
          if (node.name.startsWith("Screen_")) {
            let foundMesh = null;

            node.traverse((child) => {
              if (!foundMesh && child.isMesh) {
                foundMesh = child;
              }
            });

            if (foundMesh) {
              foundMesh.material = foundMesh.material.clone();

              foundMesh.material.emissive = new THREE.Color(0x000000);
              foundMesh.material.emissiveIntensity = 0;

              foundMesh.userData.isScreen = true;
              foundMesh.userData.isPoweredOn = false;

              if (node.name === "Screen_About")
                foundMesh.userData.section = "about";
              else if (node.name === "Screen_Skills")
                foundMesh.userData.section = "skills";
              else if (node.name === "Screen_Projects")
                foundMesh.userData.section = "projects";
              else if (node.name === "Screen_Experience")
                foundMesh.userData.section = "experience";
              else if (node.name === "Screen_Achievements")
                foundMesh.userData.section = "achievements";
              else if (node.name === "Screen_Testimonials")
                foundMesh.userData.section = "testimonials";
              else if (node.name === "Screen_Contact")
                foundMesh.userData.section = "contact";

              screens.push(foundMesh);

              console.log("✅ SCREEN REGISTERED:", foundMesh.userData.section);
            }
          }

          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;

            if (node.material) {
              // Prevent purple / horror tint
              node.material.side = THREE.FrontSide;

              // Normalize color response
              if (node.material.color) {
                node.material.color.convertSRGBToLinear();
              }

              // Make materials calm & matte (not shiny/scary)
              node.material.roughness = 0.9;
              node.material.metalness = 0.05;
            }
          }
        });

        room.position.set(0, -0.8, 0);

        // Scale down on mobile devices
        if (window.innerWidth < 768) {
          room.scale.set(0.35, 0.35, 0.35);
        }

        scene.add(room);

        resolve({ room, screens });
      },
      (progress) => {
        // Update progress during loading
        if (!progress.total || progress.total === 0) {
          useExperience.getState().setLoadingProgress(0);
        } else {
          const percent = Math.min(
            (progress.loaded / progress.total) * 100,
            99
          );
          useExperience.getState().setLoadingProgress(percent);
        }
      },
      (err) => reject(err)
    );
  });
}
