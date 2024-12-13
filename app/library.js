import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getFlashcards } from "./api";

export default function Library() {
  // Track selected card
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  // Toggle show answer
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionSet, setQuestionSet] = useState([]);

  const fetchQuestionSet = async () => {
    try {
      const result = await getFlashcards();
      setQuestionSet(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestionSet();
  }, []);

  // Go to a specific card
  const openCard = (index) => {
    setCurrentCardIndex(index);
    setShowAnswer(false);
  };

  // Back to the library list
  const goBackToLibrary = () => {
    setCurrentCardIndex(null);
  };

  // Go throught each cards
  const goToNextCard = () => {
    if (currentCardIndex < questionSet.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  // Go to the card before
  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  if (currentCardIndex !== null) {
    // Show card information
    const currentCard = questionSet[currentCardIndex];

      return (
        <View style={styles.container}>
          <View style={styles.cardQuestion}>
            <TouchableOpacity style={styles.refresh} onPress={fetchQuestionSet}>
              <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{currentCard.category}</Text>
            <Text style={styles.question}>{currentCard.question}</Text>

            {showAnswer && (
              <Text style={styles.answer}>Answer: {currentCard.answer}</Text>
            )}

            {/* Show answer button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowAnswer(!showAnswer)}
            >
              <Text style={styles.buttonText}>
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </Text>
            </TouchableOpacity>

            <View style={styles.navButtons}>
              {/* Back button */}
              <TouchableOpacity
                style={[styles.button, styles.navButton]}
                onPress={goToPreviousCard}
                disabled={currentCardIndex === 0}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>

              {/* Next Button */}
              <TouchableOpacity
                style={[styles.button, styles.navButton]}
                onPress={goToNextCard}
                disabled={currentCardIndex === questionSet.length - 1}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Library button */}
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={goBackToLibrary}
          >
            <Text style={styles.buttonText}>Back to Library</Text>
          </TouchableOpacity>
        </View>
      );
  }

  //  Show the library list
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refresh} onPress={fetchQuestionSet}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Library</Text>
      <FlatList
        data={questionSet}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => openCard(index)}
          >
            <Text style={styles.cardText}>{item.category}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>Library</Text>
  //     <FlatList
  //       data={questionSet}
  //       keyExtractor={(item) => item.id}
  //       numColumns={2}
  //       columnWrapperStyle={styles.row}
  //       renderItem={({ item, index }) => (
  //         <TouchableOpacity style={styles.card} onPress={() => openCard(index)}>
  //           <Text style={styles.cardText}>{item.category}</Text>
  //         </TouchableOpacity>
  //       )}
  //     />
  //   </View>
  // );;
}


const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignContent: "flex-start",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    justifyContent: "space-around",
    marginBottom: 15,
  },
  cardQuestion: {
    padding: 15,
    backgroundColor: "#e2e0ba",
    borderRadius: 5,
    marginBottom: 10,
    elevation: 3,
  },
  card: {
    backgroundColor: "#e2e0ba",
    borderRadius: 10,
    padding: 20,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 18,
    textAlign: "center",
  },
  question: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: "center",
  },
  answer: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#add8e6",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  refresh: {
    backgroundColor: "#add8e6",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: "center",
    width: 100,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  backButton: {
    marginTop: 30,
    backgroundColor: "#ffd301",
    elevation: 3,
  },
});
