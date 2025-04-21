import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const CashierUI = () => {
  const [direction, setDirection] = useState("droite");
  const [isOpen, setIsOpen] = useState(true);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleDirectionChange = (dir: "gauche" | "droite") => {
    setDirection(dir);
  };

  const toggleCashier = () => setIsOpen((prev) => !prev);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Menu de Commande</Text>

      <Animated.View style={[styles.iconAnimated, { transform: [{ rotate }] }]}>
        <FontAwesome name="cutlery" size={40} color="#fff" />
      </Animated.View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>🍔 Menu : Burger + Frites + Jus</Text>
        <Text style={styles.infoText}>
          🔄 Sens Actuel : {direction === "droite" ? "➡️ Droite" : "⬅️ Gauche"}
        </Text>
        <Text style={styles.infoText}>
          📦 Caisse : {isOpen ? "🟢 Ouverte" : "🔴 Fermée"}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#3498db" }]}
          onPress={() => handleDirectionChange("gauche")}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.buttonText}>Gauche</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#1abc9c" }]}
          onPress={() => handleDirectionChange("droite")}
        >
          <MaterialIcons name="arrow-forward" size={24} color="#fff" />
          <Text style={styles.buttonText}>Droite</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2ecc71" }]}
          onPress={() => setIsOpen(true)}
        >
          <MaterialIcons name="lock-open" size={24} color="#fff" />
          <Text style={styles.buttonText}>Ouvrir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e74c3c" }]}
          onPress={() => setIsOpen(false)}
        >
          <MaterialIcons name="lock" size={24} color="#fff" />
          <Text style={styles.buttonText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ecf0f1",
    marginBottom: 20,
  },
  iconAnimated: {
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#34495e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    width: "100%",
  },
  infoText: {
    color: "#ecf0f1",
    fontSize: 16,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CashierUI;
