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
            if (node.material) node.material.side = THREE.FrontSide;
          }
        });

        room.position.set(0, -0.8, 0);
        scene.add(room);

        resolve({ room, screens });
      },
      undefined,
      (err) => reject(err)
    );
  });
}
