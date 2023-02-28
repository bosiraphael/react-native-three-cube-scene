import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Cube() {
  const meshRef = useRef<any>();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="#f3f3f3" />
    </mesh>
  );
}

export default function CubeScene() {
  return (
    <Canvas>
      <color attach="background" args={["#000000"]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube />
    </Canvas>
  );
}
