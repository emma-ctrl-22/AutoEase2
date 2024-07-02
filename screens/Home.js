// Home.js
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import carsData from "../assets/carsData.json";

export default function Home({ navigation }) {
  const [selectedType, setSelectedType] = useState("All");
  const [filteredCars, setFilteredCars] = useState(carsData.cars);

  const handleTypePress = (type) => {
    setSelectedType(type);
    if (type === "All") {
      setFilteredCars(carsData.cars);
    } else {
      setFilteredCars(carsData.cars.filter(car => car.type === type));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.InputGroup}>
        <TextInput placeholder="Search car here" style={styles.input} />
        <FontAwesome name="search" size={24} color="black" />
      </View>

      <FlatList
        horizontal
        data={carsData.types}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.typeItem,
              selectedType === item.type && styles.selectedTypeItem,
            ]}
            onPress={() => handleTypePress(item.type)}
          >
            <Text
              style={[
                styles.typeText,
                selectedType === item.type && styles.selectedTypeText,
              ]}
            >
              {item.type}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.typeList}
        showsHorizontalScrollIndicator={false}
      />

      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('VehicleDetail', { car: item })}>
            <View style={styles.carItem}>
              <Image source={require(`../assets/car2.png`)} style={styles.carImage} />
              <View style={styles.carInfo}>
                <Text style={styles.carName}>{item.name}</Text>
                <Text style={styles.carTransmission}>{item.transmission}</Text>
                <Text style={styles.carPrice}>{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        style={styles.carList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  InputGroup: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: "100%",
    fontSize: 16,
  },
  typeList: {
    width: "100%",
    height: 25,
    marginBottom: 20,
  },
  typeItem: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedTypeItem: {
    backgroundColor: "#000",
    height: 20,
  },
  typeText: {
    fontSize: 16,
    color: "#000",
  },
  selectedTypeText: {
    color: "#fff",
  },
  carList: {
    width: "100%",
  },
  carItem: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    alignSelf: "center",
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  carInfo: {
    marginLeft: 15,
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  carTransmission: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  carPrice: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
    fontWeight: "bold",
  },
});
