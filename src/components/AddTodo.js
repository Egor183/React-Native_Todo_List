import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Alert, Keyboard, Dimensions } from "react-native";
import { THEME } from "../theme";
import { Entypo } from "@expo/vector-icons";

export const AddTodo = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get("window").width - THEME.PADDING * 2);

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width;
      setDeviceWidth(width);
    };
    Dimensions.addEventListener("change", update);

    return () => {
      Dimensions.removeEventListener("change", update);
    };
  });

  const onSubmit = () => {
    if (value.trim()) {
      addTodo(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Please, write to do");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          ...styles.input,
          width: deviceWidth > 400 ? "80%" : "70%",
        }}
        onChangeText={(text) => setValue(text)}
        value={value}
        placeholder="start write..."
        autoCorrect={false}
      />
      <Entypo.Button onPress={onSubmit} name="add-to-list">
        Add
      </Entypo.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  input: {
    padding: 5,
    borderBottomWidth: 2,
    borderColor: THEME.MAIN_COLOR,
  },
});
