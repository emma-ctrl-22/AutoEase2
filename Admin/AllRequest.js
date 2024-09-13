import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons

export default function AllRequest() {
  // Fake JSON data
  const [requests, setRequests] = useState([
    { id: '1', customerName: 'John Doe', serviceName: 'Car Wash' },
    { id: '2', customerName: 'Jane Smith', serviceName: 'Car Rental' },
    { id: '3', customerName: 'Michael Johnson', serviceName: 'Oil Change' },
    // Add more fake requests as needed
  ]);

  const handleAccept = (id) => {
    Alert.alert('Request Accepted', `You have accepted request ${id}`);
    // Implement accept functionality here
    // For now, we can remove the request from the list
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };

  const handleReject = (id) => {
    Alert.alert('Request Rejected', `You have rejected request ${id}`);
    // Implement reject functionality here
    // For now, we can remove the request from the list
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.requestInfo}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => handleAccept(item.id)}
          style={styles.button}
        >
          <Ionicons name="checkmark-circle" size={28} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleReject(item.id)}
          style={styles.button}
        >
          <Ionicons name="close-circle" size={28} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No requests available.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.1, // For iOS shadow
    shadowRadius: 4, // For iOS shadow
  },
  requestInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceName: {
    fontSize: 16,
    color: '#555',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});
