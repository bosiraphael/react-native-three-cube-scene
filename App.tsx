import { StyleSheet, View } from "react-native";
import CubeScene from "./src/Cube";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CubeScene />
    </GestureHandlerRootView>
  );
}
