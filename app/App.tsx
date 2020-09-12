import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";

const sendRequest = () => {
  fetch("tijs.mooo.com:3000/eten/addEten");
};

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        onPress={sendRequest}
        title="ETEN!"
        buttonStyle={{ height: 100, width: 400 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
