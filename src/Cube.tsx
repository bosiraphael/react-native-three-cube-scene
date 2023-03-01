import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  withSpring,
  useSharedValue,
  useAnimatedSensor,
  SensorType,
} from "react-native-reanimated";
import { Pressable, View, StyleSheet, Text } from "react-native";

function Cube({
  x,
  y,
  animatedSensor,
}: {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
  animatedSensor: ReturnType<typeof useAnimatedSensor>;
}) {
  const meshRef = useRef<any>();
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;

      meshRef.current.position.x = x.value * 0.01;
      meshRef.current.position.y = -y.value * 0.01;

      if (animatedSensor) {
        const { x, y, z } = animatedSensor.sensor.value;
        meshRef.current.rotation.x += x * 0.01;
        meshRef.current.rotation.y += y * 0.01;
        meshRef.current.rotation.z += z * 0.01;
      }
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
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const [gyroscope, setGyroscope] = useState(false);
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100,
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {},
    onActive: (event, ctx) => {
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
    },
    onEnd: (event, ctx) => {
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });
  return (
    <View style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View
          style={{
            flex: 1,
          }}
        >
          <Canvas>
            <color attach="background" args={["#000000"]} />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Cube
              x={x}
              y={y}
              animatedSensor={gyroscope ? animatedSensor : null}
            />
          </Canvas>
        </Animated.View>
      </PanGestureHandler>

      <Pressable
        style={[styles.button, gyroscope && styles.buttonActive]}
        onPress={() => {
          setGyroscope(!gyroscope);
        }}
      >
        <Text style={styles.buttonText}>
          {gyroscope ? "Disable Gyroscope" : "Enable Gyroscope"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonActive: {
    backgroundColor: "#b30000",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
