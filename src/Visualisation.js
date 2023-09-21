import React, { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function Visualisation({ triangulation }) {
  const mount = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  const { scene, camera, renderer } = useMemo(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const orbit = new OrbitControls(camera, renderer.domElement);

    camera.position.z = 25;
    orbit.update();

    triangulation.forEach((triangle) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(triangle[0].x, triangle[0].y, triangle[0].z),
        new THREE.Vector3(triangle[1].x, triangle[1].y, triangle[1].z),
        new THREE.Vector3(triangle[2].x, triangle[2].y, triangle[2].z),
      ]);
      const material = new THREE.PointsMaterial({
        color: 0xffc0cb,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });

      const cone = new THREE.Mesh(geometry, material);
      scene.add(cone);
      console.log("CONE", cone, scene, material);
    });

    sceneRef.current = scene;
    cameraRef.current = camera;

    return { scene, camera, renderer };
  }, [triangulation]);

  useEffect(() => {
    if (!mount.current.hasChildNodes()) {
      mount.current.appendChild(renderer.domElement);
    } else {
      // console.log("MOUNT", mount.current.children);
      mount.current.removeChild(mount.current.children[0]);
      mount.current.appendChild(renderer.domElement);
    }
  }, [scene, camera, renderer]);

  const animate = (time) => {
    requestAnimationFrame(animate);

    // Добавьте анимацию, например, вращение объектов
    sceneRef.current.rotation.x = time / 1000;
    sceneRef.current.rotation.y = time / 1000;

    renderer.render(sceneRef.current, cameraRef.current);
  };

  animate();

  return <div className="cone" ref={mount}></div>;
}

export default Visualisation;
