import { StyleSheet, View } from "react-native";
import CubeScene from "./src/Cube";

export default function App() {
  return (
    <View style={styles.container}>
      <CubeScene />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
