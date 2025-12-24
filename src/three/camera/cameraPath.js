import * as THREE from "three";

export const CAMERA_PATH = {
  about: {
    out: new THREE.Vector3(0, 1.4, 3.2),
    in: new THREE.Vector3(0, 1.4, 1.15),
  },
  skills: {
    out: new THREE.Vector3(2.2, 1.4, 3.0),
    in: new THREE.Vector3(2.2, 1.4, 1.1),
  },
  projects: {
    out: new THREE.Vector3(-2.1, 1.4, 3.1),
    in: new THREE.Vector3(-2.1, 1.4, 1.1),
  },
};

export const cameraPath = [
  { section: "about" },
  { section: "skills" },
  { section: "projects" },
];
