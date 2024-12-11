import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Mock up data (not in the stack just individually)
const sampleLibrary = [
  { id: '1', title: 'Math', question: 'What is 1 + 1?', answer: '2' },
  { id: '2', title: 'Science', question: 'What is the chemical formula for water?', answer: 'H2O' },
  { id: '3', title: 'Computer Science', question: 'What is HTML stand for?', answer: 'Hypertext Markup Language' },
  { id: '4', title: 'History', question: 'When did WWII begin?', answer: '1939' },
 
];

export default function Library() {
  // Track selected card 
  const [currentCardIndex, setCurrentCardIndex] = useState(null); 
   // Toggle show answer 
  const [showAnswer, setShowAnswer] = useState(false);

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
    if (currentCardIndex < sampleLibrary.length - 1) {
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
    const currentCard = sampleLibrary[currentCardIndex];

    return (
      <View style={styles.container}>
        <View style={styles.cardQuestion}>
          <Text style={styles.title}>{currentCard.title}</Text>
          <Text style={styles.question}>{currentCard.question}</Text>
    
          {showAnswer && <Text style={styles.answer}>Answer: {currentCard.answer}</Text>}
    
          {/* Show answer button */}
          <TouchableOpacity style={styles.button} onPress={() => setShowAnswer(!showAnswer)}>
            <Text style={styles.buttonText}>{showAnswer ? 'Hide Answer' : 'Show Answer'}</Text>
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
              disabled={currentCardIndex === sampleLibrary.length - 1}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
    
        {/* Library button */}
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={goBackToLibrary}>
          <Text style={styles.buttonText}>Back to Library</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //  Show the library list
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Library</Text>
    <FlatList
      data={sampleLibrary}
      keyExtractor={(item) => item.id}
      numColumns={2} 
      columnWrapperStyle={styles.row} 
      renderItem={({ item, index }) => (
        <TouchableOpacity style={styles.card} onPress={() => openCard(index)}>
          <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center', 
    alignContent: 'flex-start' 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    justifyContent: "space-around", 
    marginBottom: 15,
  },
  cardQuestion: {
    padding: 15,
    backgroundColor: '#e2e0ba',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 3,
  },
  card:{
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
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
  },
  answer: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#add8e6',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#ffd301',
    elevation: 3, 
  },
});
