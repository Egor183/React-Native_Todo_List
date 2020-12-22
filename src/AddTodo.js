import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";

export const AddTodo = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const onSubmit = () => {
    if (value.trim()) {
      addTodo(value);
      setValue("");
    } else {
      Alert.alert("Please, write to do");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(text)}
        value={value}
        placeholder="start write..."
        autoCorrect={false}
      />
      <Button title="Add" onPress={onSubmit} />
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
    width: "80%",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: "#5665BE",
  },
});
