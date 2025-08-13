"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Reusable distorted / floating sphere.
 * Props:
 *  - mouse: ref {x,y} to subtly orient sphere
 *  - settings: {
 *      color, distort, speed, roughness, metalness,
 *      floatSpeed, rotationIntensity, floatIntensity,
 *      radius (default 1.8)
 *    }
 */
export default function DistortedSphere({ mouse, settings }) {
  const mesh = useRef();
  const materialRef = useRef();
  const targetColor = useMemo(() => new THREE.Color(settings.color), [settings.color]);

  const radius = settings.radius || 1.8;

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.004; // base slow spin

    if (mouse?.current) {
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.current.y * 0.4, 0.08);
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.current.x * 0.4, 0.08);
    }

    if (materialRef.current) {
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, settings.distort, 0.06);
      materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, settings.speed, 0.06);
      materialRef.current.color.lerp(targetColor, 0.06);
      materialRef.current.roughness = THREE.MathUtils.lerp(materialRef.current.roughness, settings.roughness, 0.06);
      materialRef.current.metalness = THREE.MathUtils.lerp(materialRef.current.metalness, settings.metalness, 0.06);
    }
  });

  return (
    <Float
      speed={settings.floatSpeed}
      rotationIntensity={settings.rotationIntensity}
      floatIntensity={settings.floatIntensity}>
      <mesh ref={mesh}>
        <sphereGeometry args={[radius, 128, 128]} />
        <MeshDistortMaterial
          ref={materialRef}
          color={settings.color}
          distort={settings.distort}
          speed={settings.speed}
          roughness={settings.roughness}
          metalness={settings.metalness}
        />
      </mesh>
    </Float>
  );
}
