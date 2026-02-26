"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";

function Cube({ ratio }: { ratio: number }) {
  const ref = useRef<Mesh>(null);
  const color = useMemo(() => {
    if (ratio >= 0.75) return "#61c31a";
    if (ratio >= 0.45) return "#f4a641";
    return "#ff6d74";
  }, [ratio]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.8;
    ref.current.rotation.x += delta * 0.35;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.25, 1.25, 1.25]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.35} />
    </mesh>
  );
}

export function ProgressCube({ ratio }: { ratio: number }) {
  return (
    <div className="h-16 w-16 overflow-hidden rounded-xl border border-[var(--border)] card">
      <Canvas camera={{ position: [2, 2, 2], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 4, 3]} intensity={1.1} />
        <Cube ratio={ratio} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}
