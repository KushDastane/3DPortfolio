import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export function loadRoom(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      "/models/room/room2.glb",
      (gltf) => {
        const room = gltf.scene;

        room.traverse((child) => {
            console.log(child.name);

          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Ensure correct color handling
            if (child.material) {
              child.material.side = THREE.FrontSide;
              child.material.needsUpdate = true;
            }
          }
        });

        // These WILL be tuned by you
        room.scale.set(1, 1, 1);
        room.position.set(0, 0, 0);
        room.rotation.set(0, 0, 0);

        scene.add(room);
        resolve(room);
      },
      undefined,
      (error) => {
        console.error("❌ Failed to load room", error);
        reject(error);
      }
    );
  });
}
