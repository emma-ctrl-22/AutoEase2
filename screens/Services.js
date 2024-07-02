import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity,TextInput ,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import servicesData from '../assets/servicesData.json';

export default function Services() {
  const [selectedService, setSelectedService] = useState('Car Rental');
  const navigation = useNavigation();
  
  const handleServicePress = (type) => {
    setSelectedService(type);
  };

  const handleProviderPress = (provider) => {
    navigation.navigate('ServiceDetail', { provider });
  };

  const filteredProviders = servicesData.providers.filter(provider => provider.type === selectedService);

  return (
    <View style={styles.container}>
      <View style={styles.InputGroup}>
        <TextInput placeholder="Search car here" style={styles.input} />
        <FontAwesome name="search" size={24} color="black" />
      </View>
      <FlatList
        horizontal
        data={servicesData.services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.serviceItem,
              selectedService === item.type && styles.selectedServiceItem,
            ]}
            onPress={() => handleServicePress(item.type)}
          >
            <Text
              style={[
                styles.serviceText,
                selectedService === item.type && styles.selectedServiceText,
              ]}
            >
              {item.type}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.serviceList}
        showsHorizontalScrollIndicator={false}
      />
      
      <FlatList
        data={filteredProviders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProviderPress(item)} style={styles.carItem}>
            <Image source={require(`../assets/car2.png`)} style={styles.carImage} />
            <View style={styles.providerItem}>
              <Text style={styles.providerName}>{item.name}</Text>
              <Text style={styles.providerType}>{item.type}</Text>
              <Text style={styles.providerType}>{item.location}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.providerList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
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
  serviceList: {
    width: "100%",
    height: 25,
    marginBottom: 20,
  },
  serviceItem: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedServiceItem: {
    backgroundColor: '#000',
    height: 20,
  },
  serviceText: {
    fontSize: 16,
    color: '#000',
  },
  selectedServiceText: {
    color: '#fff',
  },
  providerList: {
    width: '100%',
  },
  providerItem: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'column',
    marginBottom: 15,
    padding: 10,
    marginLeft: 10,
   
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  providerType: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  carItem: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    alignSelf: 'center',
  },
});
