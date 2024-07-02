import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import bookingsData from '../assets/bookingsData.json';

export default function Bookings() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Bookings</Text>
      <FlatList
        data={bookingsData.bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Text style={styles.item}>{item.item}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',

  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
    marginLeft: 20,
  },
  bookingItem: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignSelf: 'center',
  },
  item: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  time: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  amount: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
});
