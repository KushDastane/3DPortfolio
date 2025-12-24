import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export function loadRoom(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      "/models/room/room2.glb",
      (gltf) => {
        const room = gltf.scene;
        const screens = [];

        room.traverse((node) => {
          console.log("NODE:", node.name);

          if (node.name.startsWith("Screen_")) {
            let foundMesh = null;

            node.traverse((child) => {
              if (!foundMesh && child.isMesh && child.geometry) {
                foundMesh = child;
              }
            });

            if (foundMesh) {
              foundMesh.userData.isScreen = true;
              screens.push(foundMesh);

              console.log("✅ SCREEN SURFACE REGISTERED:", foundMesh.name);
            } else {
              console.warn("⚠️ No mesh found inside", node.name);
            }
          }

          // regular mesh setup (for all meshes)
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;

            if (node.material) {
              node.material.side = THREE.FrontSide;
              node.material.needsUpdate = true;
            }
          }
        });

        room.scale.set(1, 1, 1);
        room.position.set(0, -0.8, 0);
        room.rotation.set(0, 0, 0);

        scene.add(room);
        resolve({ room, screens });
      },
      undefined,
      (error) => {
        console.error("❌ Failed to load room", error);
        reject(error);
      }
    );
  });
}
