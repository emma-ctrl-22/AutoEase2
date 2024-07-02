import React from 'react';
import { StyleSheet, Text, View, FlatList,Image } from 'react-native';

export default function ServiceDetails({ route }) {
  const { provider } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <Image source={require(`../assets/car1.png`)} style={styles.carImage} />
      <Text style={styles.name}>{provider.name}</Text>
      <Text style={styles.about}>{provider.about}</Text>
      <Text style={styles.location}>{provider.location}</Text>
      
      <Text style={styles.title}>Services</Text>
      {provider.cars && (
        <FlatList
          data={provider.cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.detailItem}>
              <Text style={styles.detailText}>{item.name}</Text>
            </View>
          )}
          style={styles.detailList}
        />
      )}
      
      {provider.prices && (
        <FlatList
          data={provider.prices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.detailItem}>
              <Text style={styles.detailText}>{item.type} - {item.price}</Text>
            </View>
          )}
          style={styles.detailList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  about: {
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 20,
  },
  detailList: {
    width: '100%',
  },
  detailItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailText: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    alignSelf: "center",
  },
  carImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
  }
});
