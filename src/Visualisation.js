import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function Visualisation({radius, height, segments}) {

  const mount = useRef(null);

  const { scene, camera, renderer, geometry, material, cone } = useMemo(() => {

    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const orbit = new OrbitControls(camera, renderer.domElement);

    camera.position.z = 15;
    orbit.update();

    const geometry = new THREE.ConeGeometry(radius, height, segments);
    const material = new THREE.MeshStandardMaterial({ color: 0xffc0Cb });
    const cone = new THREE.Mesh(geometry, material);
    
    scene.add(cone);

    const ambientLight = new THREE.AmbientLight(0xFFC0CB, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
    directionalLight.position.set(3, 3, 3);
    scene.add(directionalLight);

    return { scene, camera, renderer, geometry, material, cone };
  }, [radius, height, segments]);

  useEffect(() => {
    // Добавляем рендерер в контейнер
    if (!mount.current.hasChildNodes()) {
      mount.current.appendChild(renderer.domElement);
    }

    const animate = (time) => {
      requestAnimationFrame(animate);

      cone.rotation.x = time / 1000;
      cone.rotation.y = time / 1000;

      renderer.render(scene, camera);
    };

    animate();

  }, [scene, camera, renderer, geometry, material, cone]);

  useEffect(() => {
    // Обновляем геометрию конуса
    geometry.dispose();
    const newGeometry = new THREE.ConeGeometry(radius, height, segments);
    cone.geometry = newGeometry;
  }, [height, radius, segments]);

  return <div className='cone' ref={mount}></div>;
}

export default Visualisation;
