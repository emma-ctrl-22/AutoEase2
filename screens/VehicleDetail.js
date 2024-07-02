// VehicleDetail.js
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

export default function VehicleDetail({ route }) {
  const { car } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail</Text>
      <Image source={require(`../assets/car1.png`)} style={styles.carImage} />
      <Text style={styles.carName}>{car.name}</Text>
      <Text style={styles.carTransmission}>{car.transmission}</Text>
      <Text style={styles.carAbout}>About</Text>
      <Text style={styles.carDescription}>
        The 1.5 engine is a 1.5L 4-cylinder turbo charged engine that comes standard on the Honda Civic EX and Touring trims.
        This engine includes 16.5 psi in boost pressure and has a 10.3:1 compression ratio.
      </Text>
      <View style={styles.specContainer}>
        <View style={styles.specItem}>
          <FontAwesome name="car" size={24} color="black" />
          <Text style={styles.specText}>5 Seat</Text>
        </View>
        <View style={styles.specItem}>
          <FontAwesome name="tachometer" size={24} color="black" />
          <Text style={styles.specText}>1500 cc</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  carImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  carName: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  carTransmission: {
    fontSize: 18,
    color: "#777",
  },
  carAbout: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  carDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  specContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  specItem: {
    alignItems: "center",
  },
  specText: {
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
