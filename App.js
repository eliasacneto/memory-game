import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "./Card";
import RefreshIcon from "./assets/refresh.png";

/* ICONS */
import Wizard from "./assets/logos/logo-wizard.png";
import Cajuina from "./assets/logos/logo-cajuina.png";
import HC from "./assets/logos/logo-hc.png";
import SG from "./assets/logos/logo-sg.png";
import Jua from "./assets/logos/logo-jua.png";
import MP from "./assets/logos/logo-mp.png";
import TI from "./assets/logos/logo-ti.png";
import Moveis from "./assets/logos/logo-moveis.png";
import Massoterapia from "./assets/logos/logo-massoterapia.png";

const cards = [
  Cajuina,
  Jua,
  TI,
  MP,
  Moveis,
  Massoterapia,
];

export default function App() {
  const [board, setBoard] = React.useState([]);
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [matchedCards, setMatchedCards] = React.useState([]);
  const [score, setScore] = React.useState(0);

  const restart = () => {
    setBoard(shuffle([...cards, ...cards]));
    setSelectedCards([]);
    setMatchedCards([]);
    setScore(0);
  };

  const handleTapCard = React.useCallback((index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
    setScore(score => score + 1);
  }, [selectedCards]);

  React.useEffect(() => {
    if (selectedCards.length < 2) return;

    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards, board, matchedCards]);

  React.useEffect(() => { restart(); }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require('./assets/logo-realm.png')} resizeMode="contain" />

      {matchedCards.length === board.length && <Text style={styles.title}>
        Parabéns! 🎉
      </Text>}

      <Text style={styles.subtitle}>Movimentos: {score}</Text>

      <View style={styles.board}>
        {board.map((card, index) => (
          <Card
            key={index}
            isTurnedOver={selectedCards.includes(index)}
            isMatched={matchedCards.includes(index)}
            onPress={() => handleTapCard(index)}
            card={card}
            disabled={selectedCards.length >= 2 || selectedCards.includes(index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.restartButtonContainer} onPress={() => restart()}>
        <Image source={RefreshIcon} style={styles.restartButtonImage} resizeMode="contain" />
      </TouchableOpacity>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 100,
    marginTop: 10
  },
  board: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "snow",
    marginTop: 5,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "snow",
    marginVertical: 15,
  },
  restartButtonContainer: {
    position: "absolute",
    top: 90,
    right: 30,
    width: 30,
    height: 30,
  },
  restartButtonImage: {
    width: '100%',
    height: '100%'
  }
});

/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
