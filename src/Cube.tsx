import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Cube() {
  const meshRef = useRef<any>();
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
    >
      <boxGeometry />
      <meshStandardMaterial color={active ? "hotpink" : "orange"} />
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
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
    </Canvas>
  );
}
