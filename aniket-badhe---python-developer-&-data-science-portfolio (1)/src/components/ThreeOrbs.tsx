import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeOrbsProps {
  className?: string;
  opacity?: number;
}

export const ThreeOrbs: React.FC<ThreeOrbsProps> = ({ 
  className = "absolute inset-0 w-full h-full -z-10 pointer-events-none",
  opacity = 0.6
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const geometries = [
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.TorusGeometry(0.9, 0.22, 16, 100),
      new THREE.OctahedronGeometry(1.1, 0)
    ];

    const colors = [0x00ff9d, 0x00d2ff, 0xffffff];

    const meshes: THREE.Mesh[] = [];

    for (let i = 0; i < 8; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshPhongMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        transparent: true,
        opacity: opacity,
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 11,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6
      );

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      group.add(mesh);
      meshes.push(mesh);
    }

    const light = new THREE.PointLight(0x00ff9d, 1.2, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    const cyanLight = new THREE.PointLight(0x00d2ff, 1.0, 100);
    cyanLight.position.set(-5, -5, 2);
    scene.add(cyanLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 7.5;

    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      group.rotation.y += 0.003;
      group.rotation.x += 0.002;

      meshes.forEach((mesh, index) => {
        mesh.rotation.y += 0.008;
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.004;
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [opacity]);

  return <div ref={containerRef} className={className} />;
};
