import { Text, StyleSheet, Pressable, Image } from "react-native";

export default function Card({ onPress, isTurnedOver, card, disabled = false, isMatched = false }) {
  return (
    <Pressable
      style={isMatched ? styles.cardUp : styles.cardDown}
      onPress={onPress}
      disabled={disabled || isMatched}
    >
      {isTurnedOver || isMatched ? (
        <Image style={styles.card} source={card} resizeMode="contain" />
      ) : (
        <Text style={styles.text}>?</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardUp: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 10,
    borderColor: "#ff7c17",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e293b",
  },
  cardDown: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 10,
    borderColor: "#334155",
    borderRadius: 25,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 46,
    color: "#334155",
  },
  card: {
    width: '100%',
    height: '100%'
  }
});
