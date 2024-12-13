import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState, seEffect, useContext } from "react";
import { addFlashcard } from "./api";

export default function Add() {
  const [newQuestion, setNewQuestion] = useState({
    category: "",
    question: "",
    answer: "",
  });

  const create = () => {
    try {
      addFlashcard(newQuestion);
      setNewQuestion({ category: "", question: "", answer: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Add New Flashcard</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Category"
          value={newQuestion.category}
          onChangeText={(text) =>
            setNewQuestion({ ...newQuestion, category: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Question"
          value={newQuestion.question}
          onChangeText={(text) =>
            setNewQuestion({ ...newQuestion, question: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Answer"
          value={newQuestion.answer}
          onChangeText={(text) =>
            setNewQuestion({ ...newQuestion, answer: text })
          }
        />
        <Button style={styles.submitcolor} title="Save" onPress={create} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  box: {
    width: "60%",
    padding: 20,
    backgroundColor: "#E2E0BA",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  submitcolor: {
    backgroundColor: "#ADD8E5",
  },
});
